import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { OverlayTrigger } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'clearChangesUndoneAction' does not exist... Remove this comment to see the full error message
        this.props.clearChangesUndoneAction();
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoriesUpdates' implicitly has an 'a... Remove this comment to see the full error message
    buildCategoryUpdatesElement = categoriesUpdates => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packetUpdates' implicitly has an 'any' ... Remove this comment to see the full error message
    buildPacketUpdatesElement = packetUpdates => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { packets } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
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
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
                    packet => previousChanges && previousChanges.packet_id === packet.packet_id
                ) || {};

            const stagedPacket =
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    buildTooltip = message => <CustomTooltip type="warning" title="WARNING" message={message} />;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'label' implicitly has an 'any' type.
    buildViewButton = (label, openModal) => (
        <button type="button" className="confirm-updates__button" onClick={() => openModal()}>
            {label}
        </button>
    );

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changed' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restrictionUpdates' implicitly has an '... Remove this comment to see the full error message
    buildRestrictionUpdatesElement = restrictionUpdates => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
        const { restrictions, stagedRestrictions } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const confirmRestrictionUpdates = restrictionUpdates.map(song => {
            const currentRestriction = restrictions.find(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
                currentItem => currentItem.id === song.currentRestrictionId
            );
            const currentRestrictionName = currentRestriction ? currentRestriction.name : '-';
            let newRestriction = stagedRestrictions.find(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
                currentItem => currentItem.id === song.restriction_id
            );
            if (!newRestriction) {
                newRestriction = restrictions.find(
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
        const { restrictions, stagedRestrictions } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newRestriction' implicitly has an 'any'... Remove this comment to see the full error message
        return stagedRestrictions.map(newRestriction => {
            const currentRestriction = restrictions.find(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
        const { stagedRestrictions, stagedSongs, currentSongs } = this.props;
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'songsWithHRTemplateChanged' implicitly h... Remove this comment to see the full error message
        const songsWithHRTemplateChanged = [];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentRestriction' implicitly has an '... Remove this comment to see the full error message
        stagedRestrictions.forEach(currentRestriction => {
            const affectedStagedSongs = stagedSongs.filter(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
                currentSong =>
                    currentSong.currentRestrictionId &&
                    currentSong.restriction_id &&
                    currentSong.currentRestrictionId === currentSong.restriction_id &&
                    currentSong.currentRestrictionId === currentRestriction.id
            );
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songsWithHRTemplateChanged' implicitly h... Remove this comment to see the full error message
        return songsWithHRTemplateChanged;
    };

    buildRestrictionModal = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeRestriction' does not exist on typ... Remove this comment to see the full error message
        const { activeRestriction } = this.state;
        return (
            <CustomModal
                title="View Hour Restriction"
                onClose={this.closeRestrictionModal}
                cancelButtonLabel="Close"
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; title: string; onClose:... Remove this comment to see the full error message
                saveEnabled={false}
                saveVisible={false}
            >
                <RestrictionTable restrictionItem={activeRestriction} />
            </CustomModal>
        );
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'activeRestriction' implicitly has an 'a... Remove this comment to see the full error message
    openRestrictionModal = activeRestriction => {
        this.setState({ activeRestriction, viewRestrictionOpen: true });
    };

    closeRestrictionModal = () => {
        this.setState({ viewRestrictionOpen: false });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'buildBody' implicitly has an 'any' type... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartUpdates' implicitly has an 'any'... Remove this comment to see the full error message
    buildDaypartUpdatesElement = daypartUpdates => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { dayparts, categoriesList } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        daypartUpdates.sort((a, b) => a.sNm.localeCompare(b.sNm));
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const confirmDaypartUpdates = daypartUpdates.map((song, index) => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
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
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentCat' implicitly has an 'any' typ... Remove this comment to see the full error message
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
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentCat' implicitly has an 'any' typ... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
        const { stagedDayparts } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newDaypart' implicitly has an 'any' typ... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { dayparts, stagedDayparts } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'viewAssignmentOpen' does not exist on ty... Remove this comment to see the full error message
        const { viewAssignmentOpen, activeAssignment } = this.state;

        const daypartSChanges = activeAssignment === 'daypartsWithChanges' ? stagedDayparts : [];

        return (
            <AssignmentPanel
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                onClose={this.closeAssignmentPanel}
                className={viewAssignmentOpen ? 'assignment-panel--opened' : ''}
                dayparts={dayparts}
                stagedDayparts={daypartSChanges}
                showWarningBox={false}
                disabled
            />
        );
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'activeAssignment' implicitly has an 'an... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGroups' does not exist on type '... Remove this comment to see the full error message
        const { categoryGroups } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            category =>
                category.label !== NONE_CATEGORY &&
                category.label !== MISSING_CATEGORY &&
                category.limit &&
                category.songs.length !== category.limit
        );

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        const alertMessages = categoriesExceedingLimit.map(category => ({
            message: `You have ${category.songs.length > category.limit ? 'more' : 'less'}
                than the required number of songs in ${category.label}-${category.description}`,
            category,
        }));

        return alertMessages;
    };

    render() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedSongs' does not exist on type 'Rea... Remove this comment to see the full error message
            stagedSongs,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeConfirmUpdates' does not exist on t... Remove this comment to see the full error message
            closeConfirmUpdates,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
            stagedRestrictions,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            dayparts,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
            stagedDayparts,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changedVersions' does not exist on type ... Remove this comment to see the full error message
            changedVersions,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartUpdates' does not exist on type '... Remove this comment to see the full error message
            daypartUpdates,
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'viewRestrictionOpen' does not exist on t... Remove this comment to see the full error message
        const { viewRestrictionOpen } = this.state;

        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'categoriesUpdates' implicitly has type '... Remove this comment to see the full error message
        const categoriesUpdates = [];
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'packetUpdates' implicitly has type 'any[... Remove this comment to see the full error message
        const packetUpdates = [];
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'categoriesUndone' implicitly has type 'a... Remove this comment to see the full error message
        const categoriesUndone = [];
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'packetsUndone' implicitly has type 'any[... Remove this comment to see the full error message
        const packetsUndone = [];
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'restrictionUpdates' implicitly has type ... Remove this comment to see the full error message
        let restrictionUpdates = [];

        Object.values(changedVersions).forEach(song => {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'restrictionUpdates' implicitly has an 'a... Remove this comment to see the full error message
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
                            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ alerts: any; }' is not assignable to type ... Remove this comment to see the full error message */}
                            <AlertMultiAction alerts={this.buildWarningAlerts()} />
                            {this.buildTableElement(
                                'Category',
                                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'categoriesUpdates' implicitly has an 'an... Remove this comment to see the full error message
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
                                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'packetUpdates' implicitly has an 'any[]'... Remove this comment to see the full error message
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
                                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'restrictionUpdates' implicitly has an 'a... Remove this comment to see the full error message
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
                                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'categoriesUndone' implicitly has an 'any... Remove this comment to see the full error message
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
                                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'packetsUndone' implicitly has an 'any[]'... Remove this comment to see the full error message
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
                                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ messageText: string; alertType: string; }'... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictions' implicitly has an '... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ConfirmUpdates.propTypes = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    categoriesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    categoryGroups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    changedVersions: PropTypes.shape().isRequired,
    clearChangesUndoneAction: PropTypes.func.isRequired,
    closeConfirmUpdates: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    currentSongs: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    daypartUpdates: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    dayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    packets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    restrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stagedRestrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stagedSongs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapDispatchToProps = {
    clearChangesUndoneAction: clearChangesUndone,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUpdates);
