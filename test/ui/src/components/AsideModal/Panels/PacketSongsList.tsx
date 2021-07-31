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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { packet } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        if (!isEqual(packet, prevProps.packet)) {
            this.initializePacket();
        }
    }

    initializePacket = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsPacket' does not exist ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const { packet } = this.props;
        this.setState({ packetEdited: packet });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songToSend' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    addSongPacket = song => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songAlreadyInPacket' implicitly has an ... Remove this comment to see the full error message
        const { packetEdited } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        const newSongs = [...packetEdited.songs];
        const newSongToPacket = song;

        newSongToPacket.packet_id = packetEdited.packet_id;
        newSongs.push(newSongToPacket);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsPacket' does not exist ... Remove this comment to see the full error message
        return this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
            packetEdited: { ...packetEdited, songs: newSongs },
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    removeSongPacket = song => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songToSend' implicitly has an 'any' typ... Remove this comment to see the full error message
        const { packetEdited } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songAlreadyInPacket' implicitly has an ... Remove this comment to see the full error message
        const newSongs = packetEdited.songs.filter(
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songPacket' implicitly has an 'any' typ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            songPacket => song.media_id !== songPacket.media_id
        );

        return this.setState({
            packetEdited: { ...packetEdited, songs: newSongs },
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
    handleClose = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentEditedItem' implicitly has an 'a... Remove this comment to see the full error message
        const { handleClose } = this.props;

        this.setState({ packetEdited: {} });
        handleClose();
    };

    handleSave = () => {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsPacket' does not exist ... Remove this comment to see the full error message
        const { packetEdited } = this.state;
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            handleUpdateSongsPacket,
            boardDetails,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
            packet: { songs },
        } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        const { board } = boardDetails.layout;

        const addedSongs = packetEdited.songs
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
            .filter(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songAlreadyInPacket' implicitly has an ... Remove this comment to see the full error message
                songToSend =>
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
                    // don't send songs that weren't changed
                    !songs.find(
                        songAlreadyInPacket =>
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            songToSend.media_id === songAlreadyInPacket.media_id &&
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            songToSend.packet_id === songAlreadyInPacket.packet_id
                    )
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
            )
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            .map(song => ({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                sId: song.sId,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
                media_id: song.media_id,
                packet_id: song.packet_id,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
            }));

        let removedSongs = [];
        if (songs) {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
            removedSongs = songs
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'media_id' implicitly has an 'any'... Remove this comment to see the full error message
                .filter(
                    song =>
                        !packetEdited.songs.find(
                            currentEditedItem =>
                                song.media_id === currentEditedItem.media_id &&
                                song.packet_id === currentEditedItem.packet_id
                        )
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
                )
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mediaId' implicitly has an 'any' type.
                .map(({ sId, media_id }) => ({
                    sId,
                    media_id,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
                    packet_id: null,
                }));
        }

        const changedSongs = addedSongs.concat(removedSongs);

        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
        if (changedSongs.length) {
            handleUpdateSongsPacket(board.id, changedSongs);
        }

        this.handleClose();
    };

    setSongPercentage = (value, mediaId) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { packetEdited } = this.state;

        const newSongs = packetEdited.songs.map(song => {
            if (song.media_id === mediaId) {
                return { ...song, value };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            }
            return song;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        });

        return this.setState({
            packetEdited: { ...packetEdited, songs: newSongs },
        });
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    packetName = () => {
        const { packet } = this.props;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const hasShortname = !isEmpty(packet.short_name);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        const hasName = !isEmpty(packet.name);

        let label = '';
        if (hasShortname && hasName) {
            label = `${packet.short_name} - ${packet.name}`;
        } else if (hasShortname) {
            label = packet.short_name;
        } else if (hasName) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
            label = packet.name;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
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
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'. */}
                    <p className="template-song__name" title={packetName}>
                        {packetName}
                    </p>
                    <p className="template-song__label">Last modified date:</p>
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message */}
                    <p className="template-song__name" title={lastModifiedDate}>
                        {lastModifiedDate}
                    </p>
                </div>
                <GroupSongs
                    songs={packetEdited.songs || []}
                    handleClick={this.removeSongPacket}
                    onChangePercentage={this.setSongPercentage}
                    icon="fa-minus"
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    labelToGroupSongs={{
                        noSong: 'Select a song to packet with:',
                        withSong: 'Songs to be packeted:',
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    }}
                />
                <SearchSong
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    versions={versions}
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
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
