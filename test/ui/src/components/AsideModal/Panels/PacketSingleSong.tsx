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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.state = {
            selectedPacket: { value: undefined, label: 'Choose packet' },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
            packetSongs: [],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type 'Readonl... Remove this comment to see the full error message
            songRemoved: false,
        };
    }
    componentDidMount() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
        const { selectedSong, packets } = this.props;
        if (!isNil(selectedSong.packet_id)) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
            const currentSongPacket = packets.find(packet => packet.packet_id === selectedSong.packet_id);
            this.setState({
                selectedPacket: {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
                    value: currentSongPacket.packet_id,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                    label: this.packetName(currentSongPacket.name, currentSongPacket.short_name),
                },
                packetSongs: this.buildSongList(currentSongPacket.packet_id),
            });
        }
    }
    handleRemove = () => this.setState({ songRemoved: true });
    handleSave = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packetId' implicitly has an 'any' type.
        const { selectedSong, handleUpdateSongsPacket, boardDetails, handleClose } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedSong' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedPacket' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
        const { selectedPacket, songRemoved } = this.state;
        const { board } = boardDetails.layout;
        handleUpdateSongsPacket(board.id, [
            {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedSong' implicitly has an 'any' typ... Remove this comment to see the full error message
                ...selectedSong,
                packet_id: songRemoved ? null : selectedPacket.value,
            },
        ]);
        handleClose();
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type 'Readonl... Remove this comment to see the full error message
    packetName = (name, shortName) => `${!isEmpty(shortName) ? `${shortName} - ` : ''}${name || ''}`;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packetId' implicitly has an 'any' type.
    buildSongList = packetId => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'packet_id' implicitly has an 'any... Remove this comment to see the full error message
        const { songs, stagedSongs, selectedSong } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedSong' implicitly has an 'any' typ... Remove this comment to see the full error message
        const stagedList = stagedSongs.filter(stagedSong => stagedSong.packet_id === packetId && stagedSong.media_id !== selectedSong.media_id);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
        const currentList = songs.filter(currentSong => currentSong.packet_id === packetId &&
            currentSong.media_id !== selectedSong.media_id &&
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedSong' implicitly has an 'any' typ... Remove this comment to see the full error message
            !stagedList.find(stagedSong => stagedSong.media_id === currentSong.media_id));
        return stagedList.concat(currentList);
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    selectPacket = packet => this.setState({
        selectedPacket: packet,
        packetSongs: this.buildSongList(packet.value),
        songRemoved: false,
    });
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { packets, selectedSong, handleClose, bottomBarOpen } = this.props;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedPacket' does not exist on type '... Remove this comment to see the full error message
        const { selectedPacket, packetSongs, songRemoved } = this.state;
        const saveButtonDisabled = selectedPacket.value === undefined ||
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            (selectedPacket.value === selectedSong.packet_id && !songRemoved);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'packet_id' implicitly has an 'any... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songVersions' implicitly has an '... Remove this comment to see the full error message
        const packetSelections = packets.map(({ packet_id, name, short_name }) => ({
            value: packet_id,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            label: this.packetName(name, short_name),
        }));
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        return (<div className="template-song">
                <div className="template-song__header">
                    <p className="template-song__label">Packet name:</p>
                    <Select name="react-select-container" className="react-select-container packet-select" clearable={false} value={selectedPacket} options={packetSelections} onChange={packet => this.selectPacket(packet)}/>
                </div>
                <p className="template-song__label">Current song(s) in packet:</p>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                {packetSongs.length ? (packetSongs.map(song => (<div key={`${song.media_id}`} className="packet-song-card">
                            {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                            <SongDetails song={song} musicTracker/>
                        </div>))) : (<p className="no-packet-songs">No songs to display</p>)}
                <p className="template-song__label thin-border">Song to be packeted:</p>
                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                {!songRemoved && (<SongDetails song={selectedSong} musicTracker enableRemoveButton={selectedPacket.value === selectedSong.packet_id} handleRemoveClick={this.handleRemove}/>)}
                <AsideModalControls handleCancel={handleClose} handleSave={this.handleSave} saveLabel="Save" cancelLabel="Close" disabled={saveButtonDisabled} bottomBarOpen={bottomBarOpen} showTooltip={saveButtonDisabled} tooltipMessage="Please make a change in order to save."/>
            </div>);
    }
}
(PacketSingleSong as any).propTypes = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    boardDetails: PropTypes.shape().isRequired,
    bottomBarOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateSongsPacket: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    packets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    selectedSong: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stagedSongs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songVersions' implicitly has an '... Remove this comment to see the full error message
const mapStateToProps = ({ songVersions, packets, boardDetails }) => ({
    boardDetails,
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    songs: Object.values(songVersions.data.current).map(arr => arr[0]),
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    stagedSongs: Object.values(songVersions.data.staged).map(arr => arr[0]),
    packets: packets.data,
});
const mapDispatchToProps = {
    handleUpdateSongsPacket: updateSongsPacket,
};
export default connect(mapStateToProps, mapDispatchToProps)(PacketSingleSong);
