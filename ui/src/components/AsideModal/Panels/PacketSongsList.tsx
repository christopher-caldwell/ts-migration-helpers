import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { updateSongsPacket } from 'stores/packets/packetsActions';
import SearchSong from '../Components/SearchSong';
import GroupSongs from '../Components/GroupSongs';
import AsideModalControls from '../Components/AsideModalControls';

class PacketSongsList extends React.Component {
    state = {
        packetEdited: {},
    };

    componentDidMount() {
        this.initializePacket();
    }

    componentDidUpdate(prevProps) {
        const { packet } = this.props;
        if (!isEqual(packet, prevProps.packet)) {
            this.initializePacket();
        }
    }

    initializePacket = () => {
        const { packet } = this.props;
        this.setState({ packetEdited: packet });
    };

    addSongPacket = song => {
        const { packetEdited } = this.state;

        const newSongs = [...packetEdited.songs];
        const newSongToPacket = song;

        newSongToPacket.packet_id = packetEdited.packet_id;
        newSongs.push(newSongToPacket);

        return this.setState({
            packetEdited: { ...packetEdited, songs: newSongs },
        });
    };

    removeSongPacket = song => {
        const { packetEdited } = this.state;
        const newSongs = packetEdited.songs.filter(
            songPacket => song.media_id !== songPacket.media_id
        );

        return this.setState({
            packetEdited: { ...packetEdited, songs: newSongs },
        });
    };

    handleClose = () => {
        const { handleClose } = this.props;

        this.setState({ packetEdited: {} });
        handleClose();
    };

    handleSave = () => {
        const { packetEdited } = this.state;
        const {
            handleUpdateSongsPacket,
            boardDetails,
            packet: { songs },
        } = this.props;
        const { board } = boardDetails.layout;

        const addedSongs = packetEdited.songs
            .filter(
                songToSend =>
                    // don't send songs that weren't changed
                    !songs.find(
                        songAlreadyInPacket =>
                            songToSend.media_id === songAlreadyInPacket.media_id &&
                            songToSend.packet_id === songAlreadyInPacket.packet_id
                    )
            )
            .map(song => ({
                sId: song.sId,
                media_id: song.media_id,
                packet_id: song.packet_id,
            }));

        let removedSongs = [];
        if (songs) {
            removedSongs = songs
                .filter(
                    song =>
                        !packetEdited.songs.find(
                            currentEditedItem =>
                                song.media_id === currentEditedItem.media_id &&
                                song.packet_id === currentEditedItem.packet_id
                        )
                )
                .map(({ sId, media_id }) => ({
                    sId,
                    media_id,
                    packet_id: null,
                }));
        }

        const changedSongs = addedSongs.concat(removedSongs);

        if (changedSongs.length) {
            handleUpdateSongsPacket(board.id, changedSongs);
        }

        this.handleClose();
    };

    setSongPercentage = (value, mediaId) => {
        const { packetEdited } = this.state;

        const newSongs = packetEdited.songs.map(song => {
            if (song.media_id === mediaId) {
                return { ...song, value };
            }
            return song;
        });

        return this.setState({
            packetEdited: { ...packetEdited, songs: newSongs },
        });
    };

    packetName = () => {
        const { packet } = this.props;
        const hasShortname = !isEmpty(packet.short_name);
        const hasName = !isEmpty(packet.name);

        let label = '';
        if (hasShortname && hasName) {
            label = `${packet.short_name} - ${packet.name}`;
        } else if (hasShortname) {
            label = packet.short_name;
        } else if (hasName) {
            label = packet.name;
        }

        return label;
    };

    canAddSong = (song, template) => {
        const { stationCategoriesPermissions } = this.props;
        if (
            (!song.packet_id || template.packet_id === song.packet_id) &&
            !stationCategoriesPermissions[song.gs_category || (song.category || { name: '' }).name]
        )
            return true;
    };

    render() {
        const { versions, packet } = this.props;
        const { packetEdited } = this.state;
        const saveButtonDisabled = isEqual(packet, packetEdited);

        const packetName = this.packetName();
        const lastModifiedDate = moment(packet.modified_date).format('MM/DD/YY h:mm:ss A');

        return (
            <div className="template-song">
                <div className="template-song__header">
                    <p className="template-song__label">Packet name:</p>
                    <p className="template-song__name" title={packetName}>
                        {packetName}
                    </p>
                    <p className="template-song__label">Last modified date:</p>
                    <p className="template-song__name" title={lastModifiedDate}>
                        {lastModifiedDate}
                    </p>
                </div>
                <GroupSongs
                    songs={packetEdited.songs || []}
                    handleClick={this.removeSongPacket}
                    onChangePercentage={this.setSongPercentage}
                    icon="fa-minus"
                    labelToGroupSongs={{
                        noSong: 'Select a song to packet with:',
                        withSong: 'Songs to be packeted:',
                    }}
                />
                <SearchSong
                    versions={versions}
                    handleClick={this.addSongPacket}
                    template={packetEdited}
                    canAddValidation={this.canAddSong}
                />
                <AsideModalControls
                    handleCancel={this.handleClose}
                    handleSave={this.handleSave}
                    saveLabel="Save"
                    cancelLabel="Close"
                    disabled={saveButtonDisabled}
                />
            </div>
        );
    }
}

PacketSongsList.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateSongsPacket: PropTypes.func.isRequired,
    packet: PropTypes.shape().isRequired,
    versions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ boardDetails }) => ({ boardDetails });

const mapDispatchToProps = { handleUpdateSongsPacket: updateSongsPacket };

export default connect(mapStateToProps, mapDispatchToProps)(PacketSongsList);
