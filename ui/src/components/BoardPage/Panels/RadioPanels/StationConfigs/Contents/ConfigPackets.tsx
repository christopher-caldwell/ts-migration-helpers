import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
import TextButton from 'components/Buttons/TextButton';
import CustomTooltip from 'components/CustomTooltip';
import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import { FEATURE_TITLE, FEATURES } from 'utils/constants';
import getSyncStatus from 'components/BoardPage/Panels/RadioPanels/StationConfigs/utils';

class ConfigPackets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPacketName: '',
            createPacketError: false,
            editPacketOpened: false,
            packetToEdit: null,
        };

        this.PACKET_NAME_REQUIRED = `
            The packet name is required in order for you to create a new packet.
        `;
        this.SYNCHRONIZED_CAN_EDIT = 'Only packets synchronized with GSelector can be edited.';
    }

    handlePacketName = e => {
        const {
            target: { value, maxLength },
        } = e;
        const { packets } = this.props;
        const packetNameExists = packets.some(packet => packet.name === value);
        this.setState({
            newPacketName: value.slice(0, maxLength),
            createPacketError: packetNameExists,
        });
    };

    handleCreatePacket = () => {
        const { createPacket } = this.props;
        const { newPacketName } = this.state;

        createPacket(newPacketName);

        this.setState({ newPacketName: '' });
    };

    buildCustomTooltip = (title, message, type) => (
        <CustomTooltip type={type || 'warning'} title={title} message={message} left={5} />
    );

    stagedData = packetId => {
        const { packetsChanges } = this.props;
        return packetsChanges.some(
            song =>
                song.getChanges.actualChanges.packet_id === packetId ||
                song.getChanges.previousChanges.packet_id === packetId ||
                (!song.getChanges.actualChanges.packet_id &&
                    Object.prototype.hasOwnProperty.call(song.getChanges.actualChanges, 'packet_id') &&
                    song.getChanges.previousChanges.packet_id === packetId)
        );
    };

    buildStationPacketsElement = () => {
        const { packets } = this.props;

        if (packets < 1) {
            return <p className="station-configs--no-data-found">No data found.</p>;
        }

        const stationPacketsElement = packets.map(stationPacket => {
            const packetId = stationPacket.packet_id;
            const packetShortName = stationPacket.short_name;
            const packetLongName = stationPacket.name;
            const packetSynchronized = stationPacket.synchronized;
            const syncStatusData = getSyncStatus(packetSynchronized, this.stagedData(packetId));
            const packetSongs = stationPacket.songs.map(song => song.sNm).join(', ');
            const key = `
                station-configs-packets-${packetId}-${stationPacket.short_name}
            `;
            return (
                <tr key={key}>
                    <td className="station-configs-packets__table-column--short-name">
                        <OverlayTrigger
                            overlay={this.buildCustomTooltip(
                                syncStatusData.title,
                                syncStatusData.message,
                                syncStatusData.type
                            )}
                            placement="right"
                        >
                            <span
                                className={`
                                    station-configs__status
                                    station-configs__status--${syncStatusData.status}
                                `}
                            />
                        </OverlayTrigger>
                        {packetShortName}
                    </td>
                    <td className="station-configs-packets__table-column--long-name">
                        <span title={packetLongName}>{packetLongName}</span>
                    </td>
                    <td className="station-configs-packets__table-column--songs">
                        <span title={packetSongs}>{packetSongs}</span>
                    </td>
                    <td className="station-configs-packets__table-column--actions">
                        {!packetSynchronized && (
                            <OverlayTrigger
                                overlay={this.buildCustomTooltip('WARNING', this.SYNCHRONIZED_CAN_EDIT)}
                                placement="left"
                            >
                                <p className="btn-text--disabled">Edit Packet Songs</p>
                            </OverlayTrigger>
                        )}
                        {packetSynchronized && (
                            <TextButton onClick={() => this.openEditPacket(stationPacket)} text="Edit Packet Songs" />
                        )}
                    </td>
                </tr>
            );
        });

        return (
            <div className="station-configs__table-container">
                <table className="ml-table station-configs__table">
                    <thead>
                        <tr>
                            <th className="station-configs-packets__table-column--short-name">Short Name</th>
                            <th className="station-configs-packets__table-column--long-name">Long Name</th>
                            <th className="station-configs-packets__table-column--songs">Songs</th>
                            <th className="station-configs-packets__table-column--actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{stationPacketsElement}</tbody>
                </table>
            </div>
        );
    };

    openEditPacket = packet => {
        this.setState({ editPacketOpened: true, packetToEdit: packet });
    };

    handleCloseAsideModal = () => {
        this.setState({ editPacketOpened: false, packetToEdit: null });
    };

    buildAsideModal = () => {
        const { editPacketOpened, packetToEdit } = this.state;
        const { versions, stationCategoriesPermissions } = this.props;
        return (
            <AsideModal
                title={FEATURE_TITLE.PACKET_SONG}
                asideModalOpened={editPacketOpened}
                handleClose={this.handleCloseAsideModal}
            >
                <AsideModalPanels
                    featureName={FEATURES.PACKET_SONG}
                    packet={packetToEdit}
                    handleClose={this.handleCloseAsideModal}
                    versions={versions}
                    permissions={stationCategoriesPermissions}
                />
            </AsideModal>
        );
    };

    render() {
        const { packets } = this.props;
        const { newPacketName, createPacketError, packetToEdit } = this.state;

        return (
            <div
                className={classNames('station-configs-packets', {
                    'station-configs--no-data-found': packets < 1,
                })}
            >
                <div
                    className={classNames('station-configs__add-action', {
                        'station-configs__add-action--no-data-found': packets < 1,
                    })}
                >
                    <div>
                        <input
                            className={classNames('station-configs__input ml-input', {
                                'has-error': createPacketError,
                            })}
                            type="text"
                            placeholder="New Packet"
                            onChange={this.handlePacketName}
                            value={newPacketName}
                            maxLength="255"
                        />
                        <div
                            className={classNames('station-configs__error-message', {
                                'ml-error-message': createPacketError,
                            })}
                        >
                            Packet name already exists!
                        </div>
                    </div>
                    {!newPacketName ? (
                        <OverlayTrigger
                            overlay={this.buildCustomTooltip('WARNING', this.PACKET_NAME_REQUIRED)}
                            placement="left"
                        >
                            <p className="btn btn-primary station-configs__button disabled">Create</p>
                        </OverlayTrigger>
                    ) : (
                        <button
                            className="btn btn-primary station-configs__button"
                            type="button"
                            disabled={createPacketError}
                            onClick={this.handleCreatePacket}
                        >
                            Create
                        </button>
                    )}
                </div>
                {this.buildStationPacketsElement()}
                {packetToEdit && this.buildAsideModal()}
            </div>
        );
    }
}

ConfigPackets.propTypes = {
    createPacket: PropTypes.func.isRequired,
    packets: PropTypes.arrayOf(PropTypes.object).isRequired,
    packetsChanges: PropTypes.arrayOf(PropTypes.object).isRequired,
    versions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConfigPackets;
