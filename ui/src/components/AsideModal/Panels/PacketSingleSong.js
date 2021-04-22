import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import Select from 'react-select';

import { updateSongsPacket } from 'stores/packets/packetsActions';
import SongDetails from '../Components/SongDetails';
import AsideModalControls from '../Components/AsideModalControls';

class PacketSingleSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPacket: { value: undefined, label: 'Choose packet' },
            packetSongs: [],
            songRemoved: false,
        };
    }

    componentDidMount() {
        const { selectedSong, packets } = this.props;
        if (!isNil(selectedSong.packet_id)) {
            const currentSongPacket = packets.find(
                packet => packet.packet_id === selectedSong.packet_id
            );
            this.setState({
                selectedPacket: {
                    value: currentSongPacket.packet_id,
                    label: this.packetName(currentSongPacket.name, currentSongPacket.short_name),
                },
                packetSongs: this.buildSongList(currentSongPacket.packet_id),
            });
        }
    }

    handleRemove = () => this.setState({ songRemoved: true });

    handleSave = () => {
        const { selectedSong, handleUpdateSongsPacket, boardDetails, handleClose } = this.props;
        const { selectedPacket, songRemoved } = this.state;
        const { board } = boardDetails.layout;

        handleUpdateSongsPacket(board.id, [
            {
                ...selectedSong,
                packet_id: songRemoved ? null : selectedPacket.value,
            },
        ]);

        handleClose();
    };

    packetName = (name, shortName) =>
        `${!isEmpty(shortName) ? `${shortName} - ` : ''}${name || ''}`;

    buildSongList = packetId => {
        const { songs, stagedSongs, selectedSong } = this.props;
        const stagedList = stagedSongs.filter(
            stagedSong =>
                stagedSong.packet_id === packetId && stagedSong.media_id !== selectedSong.media_id
        );
        const currentList = songs.filter(
            currentSong =>
                currentSong.packet_id === packetId &&
                currentSong.media_id !== selectedSong.media_id &&
                !stagedList.find(stagedSong => stagedSong.media_id === currentSong.media_id)
        );
        return stagedList.concat(currentList);
    };

    selectPacket = packet =>
        this.setState({
            selectedPacket: packet,
            packetSongs: this.buildSongList(packet.value),
            songRemoved: false,
        });

    render() {
        const { packets, selectedSong, handleClose, bottomBarOpen } = this.props;
        const { selectedPacket, packetSongs, songRemoved } = this.state;
        const saveButtonDisabled =
            selectedPacket.value === undefined ||
            (selectedPacket.value === selectedSong.packet_id && !songRemoved);

        const packetSelections = packets.map(({ packet_id, name, short_name }) => ({
            value: packet_id,
            label: this.packetName(name, short_name),
        }));

        return (
            <div className="template-song">
                <div className="template-song__header">
                    <p className="template-song__label">Packet name:</p>
                    <Select
                        name="react-select-container"
                        className="react-select-container packet-select"
                        clearable={false}
                        value={selectedPacket}
                        options={packetSelections}
                        onChange={packet => this.selectPacket(packet)}
                    />
                </div>
                <p className="template-song__label">Current song(s) in packet:</p>
                {packetSongs.length ? (
                    packetSongs.map(song => (
                        <div key={`${song.media_id}`} className="packet-song-card">
                            <SongDetails song={song} musicTracker />
                        </div>
                    ))
                ) : (
                    <p className="no-packet-songs">No songs to display</p>
                )}
                <p className="template-song__label thin-border">Song to be packeted:</p>
                {!songRemoved && (
                    <SongDetails
                        song={selectedSong}
                        musicTracker
                        enableRemoveButton={selectedPacket.value === selectedSong.packet_id}
                        handleRemoveClick={this.handleRemove}
                    />
                )}
                <AsideModalControls
                    handleCancel={handleClose}
                    handleSave={this.handleSave}
                    saveLabel="Save"
                    cancelLabel="Close"
                    disabled={saveButtonDisabled}
                    bottomBarOpen={bottomBarOpen}
                    showTooltip={saveButtonDisabled}
                    tooltipMessage="Please make a change in order to save."
                />
            </div>
        );
    }
}

PacketSingleSong.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    bottomBarOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateSongsPacket: PropTypes.func.isRequired,
    packets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    selectedSong: PropTypes.shape().isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedSongs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ songVersions, packets, boardDetails }) => ({
    boardDetails,
    songs: Object.values(songVersions.data.current).map(arr => arr[0]),
    stagedSongs: Object.values(songVersions.data.staged).map(arr => arr[0]),
    packets: packets.data,
});

const mapDispatchToProps = {
    handleUpdateSongsPacket: updateSongsPacket,
};

export default connect(mapStateToProps, mapDispatchToProps)(PacketSingleSong);
