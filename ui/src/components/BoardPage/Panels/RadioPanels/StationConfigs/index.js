import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import connect from 'react-redux/lib/connect/connect';
import { SecureRoute } from '@okta/okta-react';
import unionBy from 'lodash/unionBy';
import { fetchStationPackets, createStationPacket } from 'stores/packets/packetsActions';
import { loadVersions } from 'stores/songs/songsActions';
import { fetchHourRestrictions } from 'stores/restrictions/restrictionsActions';
import { fetchStationDayparts, createDaypart } from 'stores/dayparts/daypartsActions';
import FeatureToggle from 'components/FeatureToggle';
import isFeatureActive from 'utils/featureToggle';
import { FEATURES, CANNOT_APPROVE_EMPTY_SLOTS } from 'utils/constants';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import BottomBar from 'components/BottomBar';
import ConfirmUpdates from 'components/ConfirmUpdates';
import StationHeader from 'components/StationHeader';
import MusicLabOverlay from 'components/MusicLabOverlay';
import MTUtils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import utils from 'components/ConfirmUpdates/utils';
import SyncStatus from 'components/SyncStatus';
import StationHostStatus from 'components/BoardPage/StationHostStatus';
import { getNameSort } from 'utils/SortFunctions';
import { closeOverlay, resetError } from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import { getBox, clearBox, getBoxClosed } from 'stores/box/boxActions';
import { updateDateIntegrity } from 'stores/dateIntegrity/dateIntegrityActions';
import { hasAllSlotsFilled } from 'components/AsideModal/utils';
import Filters from 'models/Filters';
import ConfigPackets from './Contents/ConfigPackets';
import ConfigRestrictions from './Contents/ConfigRestrictions';
import ConfigDayparts from './Contents/ConfigDayparts';
import TabItem from './Components/TabItem';
import history from '../../../../../history';

class StationConfigs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openReviewPage: false,
        };

        const {
            match: {
                params: { boardId },
            },
        } = this.props;

        this.packetPath = `/board/radio/${boardId}/station-configs/station-packets`;
        this.restrictionPath = `/board/radio/${boardId}/station-configs/hour-restrictions`;
        this.daypartPath = `/board/radio/${boardId}/station-configs/dayparts`;
        this.musictrackerPath = `/board/radio/${boardId}/musictracker`;
        this.overviewPath = `/board/radio/${boardId}/playlist-overview`;
    }

    initialize = () => {
        const {
            fetchStationPacketsAction,
            fetchHourRestrictionsAction,
            loadVersionsAction,
            boardDetails,
            getBoxAction,
            getBoxClosedAction,
            match: {
                params: { boardId },
            },
            fetchStationDaypartsAction,
        } = this.props;

        if (boardId) {
            // Reset filter date to current week
            const {
                layout: { board },
            } = boardDetails;
            const filters = new Filters();
            const initialBoard = {
                ...board,
                tabId: 'station-configs',
                panels: null,
                loading: true,
            };
            const inputs = { resetDateIntegrity: true };
            filters.loadInitial(initialBoard, inputs, savedDate => {
                updateDateIntegrity(savedDate);
                loadVersionsAction(filters, boardId);
                fetchStationPacketsAction(boardId);
                fetchHourRestrictionsAction(boardId);
                fetchStationDaypartsAction(boardId);
                getBoxAction(boardId);
                getBoxClosedAction(boardId);
            });
        }
    };

    componentDidMount() {
        this.initialize();
    }

    checkPermissionToAccess = board => {
        const {
            match: {
                params: { boardId },
            },
        } = this.props;
        if (!board || board.id !== Number(boardId)) {
            history.replace(this.musictrackerPath);
            return false;
        }
        if (!board.config.layout.find(layout => layout.id === 'musictracker')) {
            history.replace(this.overviewPath);
            return false;
        }
        return true;
    };

    createPacket = name => {
        const {
            createStationPacketAction,
            match: {
                params: { boardId },
            },
        } = this.props;

        createStationPacketAction({ packetName: name, stationId: boardId });
    };

    createDaypart = name => {
        const {
            createDaypartAction,
            match: {
                params: { boardId },
            },
        } = this.props;

        createDaypartAction({ daypartName: name, stationId: boardId });
    };

    closeConfirmChanges = () => this.setState({ openReviewPage: false });

    overlayApproveCancel = boardId => {
        const { clearBoxAction, resetErrorAction } = this.props;
        resetErrorAction();
        clearBoxAction(boardId);
    };

    overlaySucessClose = () => {
        const { closeOverlayAction } = this.props;
        this.closeConfirmChanges();
        closeOverlayAction();
    };

    overlayFailClose = error => {
        const { closeOverlayAction } = this.props;
        closeOverlayAction();
        return error ? null : this.closeConfirmChanges();
    };

    onCloseFailOverlay = error => {
        this.overlayFailClose(error);
        this.setState({ openReviewPage: false });
    };

    renderOverlay = () => {
        const {
            musicTrackerOverlay: { showConfirm, error, loading: loadingOverlay },
            match: {
                params: { boardId },
            },
        } = this.props;
        const { openReviewPage } = this.state;

        let successMessage = 'Your request has been processed successfully!';

        if (openReviewPage) {
            successMessage = 'Your request has been submitted for processing!';
        }

        return (
            <MusicLabOverlay
                approveCancel={() => this.overlayApproveCancel(boardId)}
                successClose={this.overlaySucessClose}
                failClose={() => this.onCloseFailOverlay(error)}
                showConfirm={showConfirm}
                loading={loadingOverlay}
                error={error}
                backToMessage="Back to Station Configs"
                successMessage={successMessage}
            />
        );
    };

    render() {
        const {
            boardDetails: {
                layout: { board },
            },
            featureToggle,
            packets: { data: dataPacket, retrieving: packetRetrieving },
            restrictions: {
                data: dataRestrictions,
                loading: loadingRestrictions,
                staged: stagedRestrictions,
            },
            songVersions: { data: dataSongVersions, loading: loadingSongVersions, changedVersions },
            musicTrackerOverlay: { showOverlay },
            musicTrackerData: {
                categoryDetails: { rawStationCategories, stationCategoriesPermissions },
            },
            resetErrorAction,
            box: { closed: closedBox, loading: loadingBox },
            dayparts: { data: dataDayparts, retrieving: daypartRetrieving, staged: stagedDayparts },
            hostInfo: { pollerEnabled, stationHostType },
        } = this.props;
        const { openReviewPage } = this.state;

        if (!this.checkPermissionToAccess(board)) {
            return null;
        }

        // Feature Toggle
        const isStationConfigsEnabled = isFeatureActive(featureToggle, FEATURES.STATION_CONFIGS);
        const isPacketSongEnabled = isFeatureActive(featureToggle, FEATURES.PACKET_SONG);
        const isHourRestrictionEnabled = isFeatureActive(featureToggle, FEATURES.HOUR_RESTRICTION);
        const isDaypartsEnabled = isFeatureActive(featureToggle, FEATURES.DAYPARTS);

        if (
            !rawStationCategories ||
            !isStationConfigsEnabled ||
            (!isHourRestrictionEnabled && !isPacketSongEnabled && !isDaypartsEnabled)
        ) {
            history.replace(this.musictrackerPath);
            return null;
        }

        const { pathname } = window.location;

        if (!isPacketSongEnabled && pathname === this.packetPath) {
            history.replace(this.restrictionPath);
            return null;
        }

        if (!isHourRestrictionEnabled && pathname === this.restrictionPath) {
            history.replace(this.daypartPath);
            return null;
        }

        if (!isDaypartsEnabled && pathname === this.daypartPath) {
            history.replace(this.packetPath);
            return null;
        }

        const hasEmptySlots = !hasAllSlotsFilled(dataDayparts, stagedDayparts);
        const approveDisabled = hasEmptySlots && stagedDayparts.length > 0;
        const emptySlotError = {
            approveDisabled,
            tooltipMessage: approveDisabled ? CANNOT_APPROVE_EMPTY_SLOTS : '',
            tooltipType: approveDisabled ? 'error' : 'warning',
        };

        const stagedVersions = dataSongVersions.staged || {};
        const currentVersions = dataSongVersions.current || {};
        const flattenedStaged = MTUtils.flatVersions(stagedVersions);
        const flattenedCurrent = MTUtils.flatVersions(currentVersions);

        const versionsflattened = unionBy(flattenedStaged, flattenedCurrent, 'media_id');

        // get songs to packet
        const packetWithSongs = (dataPacket || [])
            .reduce((flattened, packet) => {
                const findSongs = versionsflattened.filter(i => i.packet_id === packet.packet_id);
                return flattened.concat({
                    ...packet,
                    songs: findSongs,
                });
            }, [])
            .sort((a, b) => getNameSort('name', a, b));
        // end - get songs to packet

        // get songs to restriction
        const mergeDataStagedRestrictions = unionBy(stagedRestrictions, dataRestrictions, 'name');
        const restrictionWithSongs = (mergeDataStagedRestrictions || [])
            .reduce((flattened, restriction) => {
                const findSongs = versionsflattened.filter(
                    i => i.restriction_id === restriction.id
                );
                return flattened.concat({ ...restriction, songs: findSongs });
            }, [])
            .sort((a, b) => getNameSort('name', a, b));
        // end - get songs to restriction

        const daypartOrdered = [...dataDayparts].sort((a, b) => getNameSort('name', a, b));

        const changesToConfirm = utils.getChangesToConfirmUpdates(
            flattenedStaged,
            flattenedCurrent,
            dataPacket
        );

        const categoryGroups = utils.groupByCategory(rawStationCategories, versionsflattened);
        const retrieving =
            packetRetrieving || loadingRestrictions || daypartRetrieving || loadingBox;
        const activeTab = pathname.substring(pathname.lastIndexOf('/') + 1);

        // Get songs changed by daypart updates
        const daypartUpdates = utils.getSongsChangedByDaypartUpdates(
            stagedDayparts,
            changesToConfirm,
            currentVersions
        );

        const categoriesChanges = Object.values(changedVersions).filter(
            item => item.getChanges && item.getChanges.actualChanges.category
        );

        let categoriesNotFoundOnGselector = utils.categoriesNotFoundOnGselector(
            rawStationCategories,
            categoriesChanges,
            'category'
        );

        const alternateCategoriesChanges = Object.values(changedVersions).filter(
            item => item.getChanges && item.getChanges.actualChanges.alternate
        );

        const alternateCategoriesNotFoundOnGselector = utils.categoriesNotFoundOnGselector(
            rawStationCategories,
            alternateCategoriesChanges,
            'alternate_category'
        );

        categoriesNotFoundOnGselector = [
            ...new Set([
                // Concatenate and remove duplicates
                ...categoriesNotFoundOnGselector,
                ...alternateCategoriesNotFoundOnGselector,
            ]),
        ];

        const hasChangesUndone = Object.values(changedVersions).some(
            item => item.getChanges && Object.values(item.getChanges.undoneChanges).length > 0
        );

        const packetsChanges = Object.values(changedVersions).filter(
            item =>
                (item.getChanges && item.getChanges.actualChanges.packet_id) ||
                (item.getChanges && item.getChanges.previousChanges.packet_id)
        );

        const restrictionsChanges = Object.values(changedVersions).filter(
            item =>
                (item.getChanges && item.getChanges.actualChanges.restriction_id) ||
                (item.getChanges && item.getChanges.previousChanges.restriction_id)
        );

        const showBottomBar =
            hasChangesUndone ||
            flattenedStaged.length > 0 ||
            stagedRestrictions.length > 0 ||
            stagedDayparts.length > 0;

        const stationConfigs = (
            <div>
                {showOverlay ? this.renderOverlay() : null}
                <div
                    className={classNames('container-fluid', 'station-configs', {
                        'station-configs--bottom-action-opened': showBottomBar,
                    })}
                >
                    {!showOverlay && retrieving && (
                        <LoadingIndicator className="loading-box" text="" />
                    )}
                    <StationHeader station={board}>
                        <div className="station-info">
                            {pollerEnabled && (
                                <SyncStatus
                                    boxData={closedBox}
                                    stagedSongs={flattenedStaged}
                                    stagedRestrictions={stagedRestrictions}
                                    stagedDayparts={stagedDayparts}
                                />
                            )}
                            <StationHostStatus
                                pollerEnabled={pollerEnabled}
                                stationHostType={stationHostType}
                            />
                        </div>
                    </StationHeader>
                    <div className="tab-container">
                        <FeatureToggle featureName={FEATURES.PACKET_SONG}>
                            <TabItem
                                key="station-packets"
                                label="Packets"
                                name="station-packets"
                                linkTo={this.packetPath}
                                activeTab={activeTab}
                            />
                        </FeatureToggle>
                        <FeatureToggle featureName={FEATURES.HOUR_RESTRICTION}>
                            <TabItem
                                key="hour-restrictions"
                                label="Hour Restrictions"
                                name="hour-restrictions"
                                linkTo={this.restrictionPath}
                                activeTab={activeTab}
                            />
                        </FeatureToggle>
                        <FeatureToggle featureName={FEATURES.DAYPARTS}>
                            <TabItem
                                key="dayparts"
                                label="Dayparts"
                                name="dayparts"
                                linkTo={this.daypartPath}
                                activeTab={activeTab}
                            />
                        </FeatureToggle>
                    </div>
                    <SecureRoute
                        exact
                        path={this.packetPath}
                        render={() => (
                            <ConfigPackets
                                packets={packetWithSongs}
                                createPacket={this.createPacket}
                                versions={versionsflattened}
                                packetsChanges={packetsChanges}
                                stationCategoriesPermissions={stationCategoriesPermissions}
                            />
                        )}
                    />
                    <SecureRoute
                        exact
                        path={this.restrictionPath}
                        render={() => (
                            <ConfigRestrictions
                                boardId={board.id}
                                restrictions={restrictionWithSongs}
                                stagedRestrictions={stagedRestrictions}
                                versions={versionsflattened}
                                restrictionsChanges={restrictionsChanges}
                                stationCategoriesPermissions={stationCategoriesPermissions}
                            />
                        )}
                    />
                    <SecureRoute
                        exact
                        path={this.daypartPath}
                        render={() => (
                            <ConfigDayparts
                                boardId={board.id}
                                categories={rawStationCategories}
                                dayparts={daypartOrdered}
                                songs={versionsflattened}
                                createDaypart={this.createDaypart}
                                daypartsChanges={alternateCategoriesChanges}
                                currentSongs={flattenedCurrent}
                                stagedDayparts={stagedDayparts}
                                stationCategoriesPermissions={stationCategoriesPermissions}
                            />
                        )}
                    />
                    {openReviewPage ? (
                        <ConfirmUpdates
                            stagedSongs={changesToConfirm}
                            categoryGroups={categoryGroups}
                            closeConfirmUpdates={this.closeConfirmChanges}
                            daypartUpdates={daypartUpdates}
                        />
                    ) : null}
                </div>
                {showBottomBar && (
                    <BottomBar
                        boardId={board.id}
                        closeReviewPage={() => this.setState({ openReviewPage: false })}
                        disableApprove={loadingBox || emptySlotError.approveDisabled}
                        onSaveAndReview={() => {
                            resetErrorAction();
                            return this.setState({ openReviewPage: true });
                        }}
                        isReviewOpen={openReviewPage}
                        categoriesNotFoundOnGselector={categoriesNotFoundOnGselector}
                        tooltipMessage={emptySlotError.tooltipMessage}
                        tooltipType={emptySlotError.tooltipType}
                    />
                )}
            </div>
        );

        return loadingSongVersions ? <LoadingIndicator /> : stationConfigs;
    }
}

StationConfigs.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    box: PropTypes.shape().isRequired,
    clearBoxAction: PropTypes.func.isRequired,
    closeOverlayAction: PropTypes.func.isRequired,
    createDaypartAction: PropTypes.func.isRequired,
    createStationPacketAction: PropTypes.func.isRequired,
    dayparts: PropTypes.shape().isRequired,
    featureToggle: PropTypes.shape().isRequired,
    fetchHourRestrictionsAction: PropTypes.func.isRequired,
    fetchStationDaypartsAction: PropTypes.func.isRequired,
    fetchStationPacketsAction: PropTypes.func.isRequired,
    getBoxAction: PropTypes.func.isRequired,
    getBoxClosedAction: PropTypes.func.isRequired,
    loadVersionsAction: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
    musicTrackerData: PropTypes.shape().isRequired,
    musicTrackerOverlay: PropTypes.shape().isRequired,
    packets: PropTypes.shape().isRequired,
    resetErrorAction: PropTypes.func.isRequired,
    restrictions: PropTypes.shape().isRequired,
    songVersions: PropTypes.shape().isRequired,
};

const mapStateToProps = ({
    boardDetails,
    featureToggle,
    packets,
    restrictions,
    songVersions,
    musicTrackerOverlay,
    musicTrackerData,
    box,
    dayparts,
    hostInfo,
}) => ({
    boardDetails,
    featureToggle,
    packets,
    restrictions,
    songVersions,
    musicTrackerOverlay,
    musicTrackerData,
    box,
    dayparts,
    hostInfo,
});

const mapDispatchToProps = {
    fetchStationPacketsAction: fetchStationPackets,
    createStationPacketAction: createStationPacket,
    createDaypartAction: createDaypart,
    fetchHourRestrictionsAction: fetchHourRestrictions,
    closeOverlayAction: closeOverlay,
    loadVersionsAction: loadVersions,
    resetErrorAction: resetError,
    clearBoxAction: clearBox,
    getBoxAction: getBox,
    getBoxClosedAction: getBoxClosed,
    fetchStationDaypartsAction: fetchStationDayparts,
};

export default connect(mapStateToProps, mapDispatchToProps)(StationConfigs);
