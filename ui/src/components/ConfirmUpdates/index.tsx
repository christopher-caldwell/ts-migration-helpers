import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';
import CustomTooltip from 'components/CustomTooltip';
import CustomModal from 'components/CustomModal';
import { hasAllSlotsFilled } from 'components/AsideModal/utils';
import { NONE_CATEGORY, MISSING_CATEGORY, CANNOT_APPROVE_EMPTY_SLOTS } from 'utils/constants';
import { clearChangesUndone } from 'stores/songVersions/songVersionsActions';
import RestrictionTable from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/RestrictionTable';
import AssignmentPanel from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/AssignmentPanel';
import IconX from '../Buttons/IconX';
import AlertMultiAction from '../AlertMultiAction';

class ConfirmUpdates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRestriction: null,
            viewRestrictionOpen: false,
            activeAssignment: null,
            viewAssignmentOpen: false,
        };
    }

    // clear changes undone from local state after close or back confirm page
    componentWillUnmount() {
        this.props.clearChangesUndoneAction();
    }

    buildTableElement = (type, buildBody, rowHeader) => (
        <table className="ml-table">
            <thead>
                <tr>
                    {rowHeader}
                    <th className="confirm-updates__prev-and-new-column">
                        {'Previous '}
                        {type}
                    </th>
                    <th className="confirm-updates__prev-and-new-column">
                        {'New '}
                        {type}
                    </th>
                </tr>
            </thead>
            <tbody>{buildBody()}</tbody>
        </table>
    );

    buildCategoryUpdatesElement = categoriesUpdates => {
        const confirmCategoryUpdates = categoriesUpdates.map(song => {
            const {
                media_id: mediaId,
                sNm,
                aNm,
                version_name: versionName,
                getChanges: { previousChanges, actualChanges, undoneChanges },
            } = song;

            const actualCategory = actualChanges.category || undoneChanges.category || {};
            const previousCategory = previousChanges.category || {};
            const artistAndVersion = `${aNm} ${versionName === '-' ? '' : `| ${versionName}`}`;
            const key = `category-updates-${mediaId}`;

            return (
                <tr key={key}>
                    <td className="confirm-updates__song-info-column">
                        <span className="confirm-updates__song-info-column--name">{sNm}</span>
                        <span title={artistAndVersion}>{artistAndVersion}</span>
                    </td>
                    <td className="p3-bold all-caps">{previousCategory.name || '-'}</td>
                    <td className="p3-bold all-caps">{actualCategory.name || '-'}</td>
                </tr>
            );
        });
        return confirmCategoryUpdates;
    };

    buildPacketUpdatesElement = packetUpdates => {
        const { packets } = this.props;
        const confirmPacketUpdates = packetUpdates.map(song => {
            const {
                media_id: mediaId,
                sNm,
                aNm,
                version_name: versionName,
                getChanges: { previousChanges },
            } = song;

            const previousPacket =
                packets.find(
                    packet => previousChanges && previousChanges.packet_id === packet.packet_id
                ) || {};

            const stagedPacket =
                packets.find(packet => song && song.packet_id === packet.packet_id) || {};

            const artistAndVersion = `${aNm} ${versionName === '-' ? '' : `| ${versionName}`}`;
            const key = `packet-updates-${mediaId}`;

            return (
                <tr key={key}>
                    <td className="confirm-updates__song-info-column">
                        <span className="confirm-updates__song-info-column--name">{sNm}</span>
                        <span title={artistAndVersion}>{artistAndVersion}</span>
                    </td>
                    <td className="p3-bold all-caps">{previousPacket.name || '-'}</td>
                    <td className="p3-bold all-caps">{stagedPacket.name || '-'}</td>
                </tr>
            );
        });

        return confirmPacketUpdates;
    };

    buildTooltip = message => <CustomTooltip type="warning" title="WARNING" message={message} />;

    buildViewButton = (label, openModal) => (
        <button type="button" className="confirm-updates__button" onClick={() => openModal()}>
            {label}
        </button>
    );

    buildInnerDiv = (changed, name, buttonEl, tooltipEl) => {
        let innerDiv = (
            <div
                className={classNames('confirm-updates__restriction', {
                    'confirm-updates__restriction-changed': changed,
                })}
            >
                <span>{name}</span>
                {name && name !== '-' ? buttonEl : []}
            </div>
        );
        if (tooltipEl) {
            innerDiv = (
                <OverlayTrigger overlay={tooltipEl} placement="left">
                    {innerDiv}
                </OverlayTrigger>
            );
        }
        return innerDiv;
    };

    buildRestrictionUpdatesElement = restrictionUpdates => {
        const { restrictions, stagedRestrictions } = this.props;
        const confirmRestrictionUpdates = restrictionUpdates.map(song => {
            const currentRestriction = restrictions.find(
                currentItem => currentItem.id === song.currentRestrictionId
            );
            const currentRestrictionName = currentRestriction ? currentRestriction.name : '-';
            let newRestriction = stagedRestrictions.find(
                currentItem => currentItem.id === song.restriction_id
            );
            if (!newRestriction) {
                newRestriction = restrictions.find(
                    currentItem => currentItem.id === song.restriction_id
                );
            }
            let newRestrictionName = '';
            if (!song.restrictionChanged) {
                newRestrictionName = newRestriction ? newRestriction.name : '-';
            }

            const artistAndVersion = `
                ${song.aNm} ${song.version_name === '-' ? '' : `| ${song.version_name}`}
            `;
            const key = `restriction-updates-${song.media_id}`;
            const restrictionData = song.restrictionChanged ? newRestriction : currentRestriction;
            const msgTemplateChanged = `The restricted hours for ${currentRestrictionName}
                has changed. Click on View Restriction to see the new restricted hours.`;

            return (
                <tr key={key}>
                    <td className="confirm-updates__song-info-column">
                        <span className="confirm-updates__song-info-column--name">{song.sNm}</span>
                        <span title={artistAndVersion}>{artistAndVersion}</span>
                    </td>
                    <td
                        className={classNames('confirm-updates__restriction-td', {
                            'confirm-updates__no-right-border': song.restrictionChanged,
                        })}
                    >
                        {this.buildInnerDiv(
                            song.restrictionChanged,
                            currentRestrictionName,
                            this.buildViewButton('View Restriction', () =>
                                this.openRestrictionModal(restrictionData)
                            ),
                            this.buildTooltip(msgTemplateChanged)
                        )}
                    </td>
                    <td
                        className={classNames('confirm-updates__restriction-td', {
                            'confirm-updates__no-left-border': song.restrictionChanged,
                        })}
                    >
                        {this.buildInnerDiv(
                            false,
                            newRestrictionName,
                            this.buildViewButton('View Restriction', () =>
                                this.openRestrictionModal(newRestriction)
                            ),
                            null
                        )}
                    </td>
                </tr>
            );
        });
        return confirmRestrictionUpdates;
    };

    buildHRTemplateUpdatesElement = () => {
        const { restrictions, stagedRestrictions } = this.props;
        return stagedRestrictions.map(newRestriction => {
            const currentRestriction = restrictions.find(
                currentItem => currentItem.id === newRestriction.id
            );
            return (
                <tr key={newRestriction.id}>
                    <td className="confirm-updates__song-info-column">
                        <span title={newRestriction.name}>{newRestriction.name}</span>
                    </td>
                    <td className="confirm-updates__restriction-td">
                        <div className="confirm-updates__restriction">
                            {this.buildViewButton('View Restriction', () =>
                                this.openRestrictionModal(currentRestriction)
                            )}
                        </div>
                    </td>
                    <td className="confirm-updates__restriction-td">
                        <div className="confirm-updates__restriction">
                            {this.buildViewButton('View Restriction', () =>
                                this.openRestrictionModal(newRestriction)
                            )}
                        </div>
                    </td>
                </tr>
            );
        });
    };

    getSongsWithHRTemplateChanged = () => {
        const { stagedRestrictions, stagedSongs, currentSongs } = this.props;
        const songsWithHRTemplateChanged = [];
        stagedRestrictions.forEach(currentRestriction => {
            const affectedStagedSongs = stagedSongs.filter(
                currentSong =>
                    currentSong.currentRestrictionId &&
                    currentSong.restriction_id &&
                    currentSong.currentRestrictionId === currentSong.restriction_id &&
                    currentSong.currentRestrictionId === currentRestriction.id
            );
            affectedStagedSongs.forEach(currentSong =>
                songsWithHRTemplateChanged.push({
                    ...currentSong,
                    restrictionChanged: true,
                })
            );
            const affectedCurrentSongs = filter(
                currentSongs,
                currentSong =>
                    currentSong[0].restriction_id &&
                    currentSong[0].restriction_id === currentRestriction.id
            );
            affectedCurrentSongs.forEach(currentSong =>
                songsWithHRTemplateChanged.push({
                    ...currentSong[0],
                    currentRestrictionId: currentSong[0].restriction_id,
                    restrictionChanged: true,
                })
            );
        });
        return songsWithHRTemplateChanged;
    };

    buildRestrictionModal = () => {
        const { activeRestriction } = this.state;
        return (
            <CustomModal
                title="View Hour Restriction"
                onClose={this.closeRestrictionModal}
                cancelButtonLabel="Close"
                saveEnabled={false}
                saveVisible={false}
            >
                <RestrictionTable restrictionItem={activeRestriction} />
            </CustomModal>
        );
    };

    openRestrictionModal = activeRestriction => {
        this.setState({ activeRestriction, viewRestrictionOpen: true });
    };

    closeRestrictionModal = () => {
        this.setState({ viewRestrictionOpen: false });
    };

    buildDaypartSongsTable = (buildBody, rowHeader) => (
        <table className="ml-table">
            <thead>
                <tr>
                    {rowHeader}
                    <th className="confirm-updates__prev-and-new-column">Daypart</th>
                    <th className="confirm-updates__prev-and-new-column">
                        Previous Alternate Category
                    </th>
                    <th className="confirm-updates__prev-and-new-column">New Alternate Category</th>
                </tr>
            </thead>
            <tbody>{buildBody()}</tbody>
        </table>
    );

    buildDaypartUpdatesElement = daypartUpdates => {
        const { dayparts, categoriesList } = this.props;
        daypartUpdates.sort((a, b) => a.sNm.localeCompare(b.sNm));
        const confirmDaypartUpdates = daypartUpdates.map((song, index) => {
            const currentDaypart = dayparts.find(currentItem => {
                if (song.daypartChangedId) {
                    return currentItem.id === song.daypartChangedId;
                }

                return Object.prototype.hasOwnProperty.call(song.alternate || {}, currentItem.id);
            });
            const currentDaypartName = currentDaypart ? currentDaypart.name : '-';
            const artistAndVersion = `
                ${song.aNm} ${song.version_name === '-' ? '' : `| ${song.version_name}`}
            `;
            const key = `daypart-updates-${index}`;
            const daypartData = song.daypartChanged ? 'daypartsWithChanges' : 'initialDayparts';
            const msgTemplateChanged = `The daypart hours for ${currentDaypartName} has changed.
                Click on View Assignment to see the new daypart hours.`;
            const currentCategoryLabel =
                get(song, `currentAlternate[${currentDaypart.id}].gs_category`) ||
                get(
                    categoriesList.find(
                        currentCat =>
                            currentCat.value ===
                            get(song, `currentAlternate[${currentDaypart.id}].category_id`)
                    ),
                    'label'
                );
            const stagedCategoryLabel =
                get(song, `alternate[${currentDaypart.id}].gs_category`) ||
                get(
                    categoriesList.find(
                        currentCat =>
                            currentCat.value === song.alternate[currentDaypart.id].category_id
                    ),
                    'label'
                );

            return (
                <tr key={key}>
                    <td className="confirm-updates__song-info-column">
                        <span className="confirm-updates__song-info-column--name">{song.sNm}</span>
                        <span title={artistAndVersion}>{artistAndVersion}</span>
                    </td>
                    <td className="confirm-updates__restriction-td">
                        {this.buildInnerDiv(
                            false,
                            currentDaypartName,
                            this.buildViewButton('View Assignment', () =>
                                this.openAssignmentPanel(daypartData)
                            ),
                            song.daypartChanged ? this.buildTooltip(msgTemplateChanged) : null
                        )}
                    </td>
                    <td className="p3-bold all-caps">{currentCategoryLabel || '-'}</td>
                    <td className="p3-bold all-caps">{stagedCategoryLabel || '-'}</td>
                </tr>
            );
        });
        return confirmDaypartUpdates;
    };

    buildDaypartTemplateUpdatesElement = () => {
        const { stagedDayparts } = this.props;
        return stagedDayparts.map(newDaypart => (
            <tr key={newDaypart.id}>
                <td className="confirm-updates__song-info-column">
                    <span title={newDaypart.name}>{newDaypart.name}</span>
                </td>
                <td className="confirm-updates__restriction-td">
                    <div className="confirm-updates__restriction">
                        {this.buildViewButton('View Assignment', () =>
                            this.openAssignmentPanel('initialDayparts')
                        )}
                    </div>
                </td>
                <td className="confirm-updates__restriction-td">
                    <div className="confirm-updates__restriction">
                        {this.buildViewButton('View Assignment', () =>
                            this.openAssignmentPanel('daypartsWithChanges')
                        )}
                    </div>
                </td>
            </tr>
        ));
    };

    buildAssignmentPanel = () => {
        const { dayparts, stagedDayparts } = this.props;
        const { viewAssignmentOpen, activeAssignment } = this.state;

        const daypartSChanges = activeAssignment === 'daypartsWithChanges' ? stagedDayparts : [];

        return (
            <AssignmentPanel
                onClose={this.closeAssignmentPanel}
                className={viewAssignmentOpen ? 'assignment-panel--opened' : ''}
                dayparts={dayparts}
                stagedDayparts={daypartSChanges}
                showWarningBox={false}
                disabled
            />
        );
    };

    openAssignmentPanel = activeAssignment => {
        this.setState({
            activeAssignment,
            viewAssignmentOpen: true,
        });
    };

    closeAssignmentPanel = () => {
        this.setState({
            viewAssignmentOpen: false,
        });
    };

    buildSongsGroup = () => {
        const { categoryGroups } = this.props;
        const groupedCategories = categoryGroups.map(category => {
            const {
                limit,
                label,
                description,
                group,
                groupOrderBy,
                orderBy,
                value,
                songs,
            } = category;
            const songsGroup = {
                label,
                description,
                limit,
                group,
                groupOrderBy,
                orderBy,
                value,
                songs,
            };
            return songsGroup;
        });
        return groupedCategories;
    };

    buildWarningAlerts = () => {
        const categoriesExceedingLimit = this.buildSongsGroup().filter(
            category =>
                category.label !== NONE_CATEGORY &&
                category.label !== MISSING_CATEGORY &&
                category.limit &&
                category.songs.length !== category.limit
        );

        const alertMessages = categoriesExceedingLimit.map(category => ({
            message: `You have ${category.songs.length > category.limit ? 'more' : 'less'}
                than the required number of songs in ${category.label}-${category.description}`,
            category,
        }));

        return alertMessages;
    };

    render() {
        const {
            stagedSongs,
            closeConfirmUpdates,
            stagedRestrictions,
            dayparts,
            stagedDayparts,
            changedVersions,
            daypartUpdates,
        } = this.props;
        const { viewRestrictionOpen } = this.state;

        const categoriesUpdates = [];
        const packetUpdates = [];
        const categoriesUndone = [];
        const packetsUndone = [];
        let restrictionUpdates = [];

        Object.values(changedVersions).forEach(song => {
            const versionChanged = changedVersions[song.media_id] || null;
            const getChanges = versionChanged ? versionChanged.getChanges : {};
            const actualChanges = getChanges.actualChanges || {};
            const undoneChanges = getChanges.undoneChanges || {};

            if (actualChanges.category) {
                categoriesUpdates.push(song);
            }

            // has packet changes
            // this can be set as null
            if (Object.prototype.hasOwnProperty.call(actualChanges, 'packet_id')) {
                packetUpdates.push(song);
            }

            // categories undone
            if (undoneChanges.category) {
                categoriesUndone.push(song);
            }

            // packets undone
            if (Object.prototype.hasOwnProperty.call(undoneChanges, 'packet_id')) {
                packetsUndone.push(song);
            }
        });

        // todo: migrate restriction logic
        stagedSongs.forEach(song => {
            const getChangedVersions = changedVersions[song.media_id] || {};
            const restrictionChanges = getChangedVersions.getChanges || {};
            if (
                restrictionChanges.actualChanges &&
                Object.prototype.hasOwnProperty.call(
                    restrictionChanges.actualChanges,
                    'restriction_id'
                )
            ) {
                restrictionUpdates.push(song);
            }
        });

        if (stagedRestrictions.length) {
            restrictionUpdates = restrictionUpdates.concat(this.getSongsWithHRTemplateChanged());
        }

        const songRowHeader = (
            <th className="confirm-updates__song-info-column">
                <span>Song Title</span>
                <span>Artist | Version</span>
            </th>
        );

        const restrictionRowHeader = (
            <th className="confirm-updates__song-info-column">
                <span>Restriction Name</span>
            </th>
        );

        const daypartRowHeader = (
            <th className="confirm-updates__song-info-column">
                <span>Daypart Name</span>
            </th>
        );

        return (
            <div className="confirm-updates">
                {viewRestrictionOpen && this.buildRestrictionModal()}
                {this.buildAssignmentPanel()}
                <div className="confirm-updates__container custom-scrollbars">
                    <IconX onClick={closeConfirmUpdates} className="btn-close" />
                    {categoriesUpdates.length > 0 && (
                        <div className="confirm-updates__content">
                            <h4>Confirm Category Updates</h4>
                            <AlertMultiAction alerts={this.buildWarningAlerts()} />
                            {this.buildTableElement(
                                'Category',
                                () => this.buildCategoryUpdatesElement(categoriesUpdates),
                                songRowHeader
                            )}
                        </div>
                    )}
                    {packetUpdates.length > 0 && (
                        <div className="confirm-updates__content">
                            <h4>Confirm Packet Updates</h4>
                            {this.buildTableElement(
                                'Packet',
                                () => this.buildPacketUpdatesElement(packetUpdates),
                                songRowHeader
                            )}
                        </div>
                    )}
                    {restrictionUpdates.length > 0 && (
                        <div className="confirm-updates__content">
                            <h4>Confirm Restriction Songs Updates</h4>
                            {this.buildTableElement(
                                'Restriction',
                                () => this.buildRestrictionUpdatesElement(restrictionUpdates),
                                songRowHeader
                            )}
                        </div>
                    )}
                    {stagedRestrictions.length > 0 && (
                        <div className="confirm-updates__content">
                            <h4>Confirm Restriction Hours Updates</h4>
                            {this.buildTableElement(
                                'Restriction',
                                () => this.buildHRTemplateUpdatesElement(),
                                restrictionRowHeader
                            )}
                        </div>
                    )}

                    {(packetsUndone.length > 0 || categoriesUndone.length > 0) && (
                        <div className="confirm-updates__content no-data">
                            <h4>No Changes</h4>
                            {categoriesUndone.length > 0 && (
                                <div>
                                    <p>Categories</p>
                                    {this.buildTableElement(
                                        'Category',
                                        () => this.buildCategoryUpdatesElement(categoriesUndone),
                                        songRowHeader
                                    )}
                                </div>
                            )}
                            {packetsUndone.length > 0 && (
                                <div>
                                    <p>Packet</p>
                                    {this.buildTableElement(
                                        'Packet',
                                        () => this.buildPacketUpdatesElement(packetsUndone),
                                        songRowHeader
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {daypartUpdates.length > 0 && (
                        <div className="confirm-updates__content">
                            <h4>Confirm Alternate Categories Updates</h4>
                            {this.buildDaypartSongsTable(
                                () => this.buildDaypartUpdatesElement(daypartUpdates),
                                songRowHeader
                            )}
                        </div>
                    )}
                    {stagedDayparts.length > 0 && (
                        <div className="confirm-updates__content">
                            <h4>Confirm Daypart Assignments Updates</h4>
                            {!hasAllSlotsFilled(dayparts, stagedDayparts) && (
                                <AlertMultiAction
                                    messageText={CANNOT_APPROVE_EMPTY_SLOTS}
                                    alertType="error"
                                />
                            )}
                            {this.buildTableElement(
                                'Assignment',
                                () => this.buildDaypartTemplateUpdatesElement(),
                                daypartRowHeader
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ restrictions, dayparts, songVersions, musicTrackerData, packets }) => ({
    restrictions: restrictions.data,
    stagedRestrictions: restrictions.staged,
    dayparts: dayparts.data,
    stagedDayparts: dayparts.staged,
    currentSongs: songVersions.data.current,
    categoriesList: musicTrackerData.categoryDetails.rawStationCategories,
    changedVersions: songVersions.changedVersions,
    packets: packets.data,
});

ConfirmUpdates.propTypes = {
    categoriesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    categoryGroups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    changedVersions: PropTypes.shape().isRequired,
    clearChangesUndoneAction: PropTypes.func.isRequired,
    closeConfirmUpdates: PropTypes.func.isRequired,
    currentSongs: PropTypes.shape().isRequired,
    daypartUpdates: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    dayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    packets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    restrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedRestrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedSongs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapDispatchToProps = {
    clearChangesUndoneAction: clearChangesUndone,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUpdates);
