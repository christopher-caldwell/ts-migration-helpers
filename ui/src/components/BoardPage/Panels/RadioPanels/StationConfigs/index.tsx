import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { closeOverlay, resetError } from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import { getBox, clearBox, getBoxClosed } from 'stores/box/boxActions';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
import { updateDateIntegrity } from 'stores/dateIntegrity/dateIntegrityActions';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
import { hasAllSlotsFilled } from 'components/AsideModal/utils';
import Filters from 'models/Filters';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'overviewPath' does not exist on type 'St... Remove this comment to see the full error message
import ConfigPackets from './Contents/ConfigPackets';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchStationPacketsAction' does not exis... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchHourRestrictionsAction' does not ex... Remove this comment to see the full error message
import ConfigRestrictions from './Contents/ConfigRestrictions';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
import ConfigDayparts from './Contents/ConfigDayparts';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoxClosedAction' does not exist on ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
import TabItem from './Components/TabItem';
import history from '../../../../../history';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
class StationConfigs extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictrackerPath' does not exist on type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'savedDate' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'overviewPath' does not exist on type 'St... Remove this comment to see the full error message
        super(props);

        this.state = {
            openReviewPage: false,
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchStationPacketsAction' does not exis... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictrackerPath' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoxAction' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'layout' implicitly has an 'any' type.
            match: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'overviewPath' does not exist on type 'St... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoxClosedAction' does not exist on ty... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'createStationPacketAction' does not exis... Remove this comment to see the full error message
                params: { boardId },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            },
        } = this.props;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchStationDaypartsAction' does not exi... Remove this comment to see the full error message
        this.packetPath = `/board/radio/${boardId}/station-configs/station-packets`;
        this.restrictionPath = `/board/radio/${boardId}/station-configs/hour-restrictions`;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardId' implicitly has an 'any' type.
        this.daypartPath = `/board/radio/${boardId}/station-configs/dayparts`;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetErrorAction' does not exist on type... Remove this comment to see the full error message
        this.musictrackerPath = `/board/radio/${boardId}/musictracker`;
        this.overviewPath = `/board/radio/${boardId}/playlist-overview`;
    }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'closeOverlayAction' does not exist on ty... Remove this comment to see the full error message

    initialize = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'savedDate' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchStationPacketsAction' does not exis... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerOverlay' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchHourRestrictionsAction' does not ex... Remove this comment to see the full error message
            fetchStationPacketsAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadVersionsAction' does not exist on ty... Remove this comment to see the full error message
            fetchHourRestrictionsAction,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoxAction' does not exist on type 'Re... Remove this comment to see the full error message
            loadVersionsAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictrackerPath' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'layout' implicitly has an 'any' type.
            boardDetails,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureToggle' does not exist on type 'R... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'overviewPath' does not exist on type 'St... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchStationDaypartsAction' does not exi... Remove this comment to see the full error message
            getBoxAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerOverlay' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'createStationPacketAction' does not exis... Remove this comment to see the full error message
            getBoxClosedAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetErrorAction' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'hostInfo' does not exist on type 'Readon... Remove this comment to see the full error message
                params: { boardId },
            },
            fetchStationDaypartsAction,
        } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openReviewPage' does not exist on type '... Remove this comment to see the full error message
        if (boardId) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
            // Reset filter date to current week
            const {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypartAction' does not exist on t... Remove this comment to see the full error message
                layout: { board },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            } = boardDetails;
            const filters = new Filters();
            const initialBoard = {
                ...board,
                tabId: 'station-configs',
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictrackerPath' does not exist on type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardId' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'savedDate' implicitly has an 'any' type... Remove this comment to see the full error message
                panels: null,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
                loading: true,
            };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
            const inputs = { resetDateIntegrity: true };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeOverlayAction' does not exist on ty... Remove this comment to see the full error message
            filters.loadInitial(initialBoard, inputs, savedDate => {
                updateDateIntegrity(savedDate);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
                loadVersionsAction(filters, boardId);
                fetchStationPacketsAction(boardId);
                fetchHourRestrictionsAction(boardId);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
                fetchStationDaypartsAction(boardId);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
                getBoxAction(boardId);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'flattened' implicitly has an 'any' type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerOverlay' does not exist on t... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'openReviewPage' does not exist on type '... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'layout' implicitly has an 'any' type.
            },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ toString: ... Remove this comment to see the full error message
        if (!board || board.id !== Number(boardId)) {
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            history.replace(this.musictrackerPath);
            return false;
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        if (!board.config.layout.find(layout => layout.id === 'musictracker')) {
            history.replace(this.overviewPath);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            return false;
        }
        return true;
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureToggle' does not exist on type 'R... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
    createPacket = name => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypartAction' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            createStationPacketAction,
            match: {
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                params: { boardId },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerOverlay' does not exist on t... Remove this comment to see the full error message
            },
        } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerData' does not exist on type... Remove this comment to see the full error message
        createStationPacketAction({ packetName: name, stationId: boardId });
    };

    createDaypart = name => {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetErrorAction' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardId' implicitly has an 'any' type.
        const {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'clearBoxAction' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            createDaypartAction,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'openReviewPage' does not exist on type '... Remove this comment to see the full error message
            match: {
                params: { boardId },
            },
        } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeOverlayAction' does not exist on ty... Remove this comment to see the full error message
        createDaypartAction({ daypartName: name, stationId: boardId });
    };

    closeConfirmChanges = () => this.setState({ openReviewPage: false });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
    overlayApproveCancel = boardId => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeOverlayAction' does not exist on ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictrackerPath' does not exist on type... Remove this comment to see the full error message
        const { clearBoxAction, resetErrorAction } = this.props;
        resetErrorAction();
        clearBoxAction(boardId);
    };

    overlaySucessClose = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
        const { closeOverlayAction } = this.props;
        this.closeConfirmChanges();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        closeOverlayAction();
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerOverlay' does not exist on t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
    overlayFailClose = error => {
        const { closeOverlayAction } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        closeOverlayAction();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openReviewPage' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        return error ? null : this.closeConfirmChanges();
    };

    onCloseFailOverlay = error => {
        this.overlayFailClose(error);
        this.setState({ openReviewPage: false });
    };

    renderOverlay = () => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
            musicTrackerOverlay: { showConfirm, error, loading: loadingOverlay },
            match: {
                params: { boardId },
            },
        } = this.props;
        const { openReviewPage } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'flattened' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ packets: any; createPacket: (name: any) =>... Remove this comment to see the full error message
        let successMessage = 'Your request has been processed successfully!';

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type 'never... Remove this comment to see the full error message
        if (openReviewPage) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
            successMessage = 'Your request has been submitted for processing!';
        }

        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardId: any; restrictions: never[]; stage... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureToggle' does not exist on type 'R... Remove this comment to see the full error message
        return (
            <MusicLabOverlay
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ toString: ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardId: any; categories: any; dayparts: a... Remove this comment to see the full error message
                approveCancel={() => this.overlayApproveCancel(boardId)}
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                successClose={this.overlaySucessClose}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
                failClose={() => this.onCloseFailOverlay(error)}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerOverlay' does not exist on t... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ stagedSongs: any; categoryGroups: unknown;... Remove this comment to see the full error message
                showConfirm={showConfirm}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerData' does not exist on type... Remove this comment to see the full error message
                loading={loadingOverlay}
                error={error}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetErrorAction' does not exist on type... Remove this comment to see the full error message
                backToMessage="Back to Station Configs"
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'box' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
                successMessage={successMessage}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            />
        );
    };

    render() {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            boardDetails: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'hostInfo' does not exist on type 'Readon... Remove this comment to see the full error message
                layout: { board },
            },
            featureToggle,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'openReviewPage' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            packets: { data: dataPacket, retrieving: packetRetrieving },
            restrictions: {
                data: dataRestrictions,
                loading: loadingRestrictions,
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                staged: stagedRestrictions,
            },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            songVersions: { data: dataSongVersions, loading: loadingSongVersions, changedVersions },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            musicTrackerOverlay: { showOverlay },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            musicTrackerData: {
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictions' implicitly has an '... Remove this comment to see the full error message
                categoryDetails: { rawStationCategories, stationCategoriesPermissions },
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'box' implicitly has an 'any' type... Remove this comment to see the full error message
            },
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hostInfo' implicitly has an 'any'... Remove this comment to see the full error message
            resetErrorAction,
            box: { closed: closedBox, loading: loadingBox },
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            dayparts: { data: dataDayparts, retrieving: daypartRetrieving, staged: stagedDayparts },
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'flattened' implicitly has an 'any' type... Remove this comment to see the full error message
        const hasEmptySlots = !hasAllSlotsFilled(dataDayparts, stagedDayparts);
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        const approveDisabled = hasEmptySlots && stagedDayparts.length > 0;
        const emptySlotError = {
            approveDisabled,
            tooltipMessage: approveDisabled ? CANNOT_APPROVE_EMPTY_SLOTS : '',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
            tooltipType: approveDisabled ? 'error' : 'warning',
        };

        const stagedVersions = dataSongVersions.staged || {};
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        const currentVersions = dataSongVersions.current || {};
        const flattenedStaged = MTUtils.flatVersions(stagedVersions);
        const flattenedCurrent = MTUtils.flatVersions(currentVersions);

        const versionsflattened = unionBy(flattenedStaged, flattenedCurrent, 'media_id');

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ toString: ... Remove this comment to see the full error message
        // get songs to packet
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        const packetWithSongs = (dataPacket || [])
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            .reduce((flattened, packet) => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
                const findSongs = versionsflattened.filter(i => i.packet_id === packet.packet_id);
                return flattened.concat({
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetPath' does not exist on type 'Stat... Remove this comment to see the full error message
                    ...packet,
                    songs: findSongs,
                });
            }, [])
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ packets: any; createPacket: (name: any) =>... Remove this comment to see the full error message
            .sort((a, b) => getNameSort('name', a, b));
        // end - get songs to packet

        // get songs to restriction
        const mergeDataStagedRestrictions = unionBy(stagedRestrictions, dataRestrictions, 'name');
        const restrictionWithSongs = (mergeDataStagedRestrictions || [])
            .reduce((flattened, restriction) => {
                const findSongs = versionsflattened.filter(
                    i => i.restriction_id === restriction.id
                );
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionPath' does not exist on type ... Remove this comment to see the full error message
                return flattened.concat({ ...restriction, songs: findSongs });
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardId: any; restrictions: never[]; stage... Remove this comment to see the full error message
            }, [])
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            .sort((a, b) => getNameSort('name', a, b));
        // end - get songs to restriction

        const daypartOrdered = [...dataDayparts].sort((a, b) => getNameSort('name', a, b));

        const changesToConfirm = utils.getChangesToConfirmUpdates(
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            flattenedStaged,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartPath' does not exist on type 'Sta... Remove this comment to see the full error message
            flattenedCurrent,
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardId: any; categories: any; dayparts: a... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2693) FIXME: 'any' only refers to a type, but is being used as ... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.

        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ stagedSongs: any; categoryGroups: unknown;... Remove this comment to see the full error message
        const categoriesChanges = Object.values(changedVersions).filter(
            item => item.getChanges && item.getChanges.actualChanges.category
        );

        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        let categoriesNotFoundOnGselector = utils.categoriesNotFoundOnGselector(
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            rawStationCategories,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            categoriesChanges,
            'category'
        );

        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const alternateCategoriesChanges = Object.values(changedVersions).filter(
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            item => item.getChanges && item.getChanges.actualChanges.alternate
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        );

        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const alternateCategoriesNotFoundOnGselector = utils.categoriesNotFoundOnGselector(
            rawStationCategories,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            alternateCategoriesChanges,
            'alternate_category'
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        );

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        categoriesNotFoundOnGselector = [
            ...new Set([
                // Concatenate and remove duplicates
                ...categoriesNotFoundOnGselector,
                ...alternateCategoriesNotFoundOnGselector,
            ]),
        ];

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const hasChangesUndone = Object.values(changedVersions).some(
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            item => item.getChanges && Object.values(item.getChanges.undoneChanges).length > 0
        );

        const packetsChanges = Object.values(changedVersions).filter(
            item =>
                (item.getChanges && item.getChanges.actualChanges.packet_id) ||
                (item.getChanges && item.getChanges.previousChanges.packet_id)
        );

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const restrictionsChanges = Object.values(changedVersions).filter(
            item =>
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                (item.getChanges && item.getChanges.actualChanges.restriction_id) ||
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                (item.getChanges && item.getChanges.previousChanges.restriction_id)
        );

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const showBottomBar =
            hasChangesUndone ||
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
            flattenedStaged.length > 0 ||
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'packets' implicitly has an 'any' ... Remove this comment to see the full error message
            stagedRestrictions.length > 0 ||
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'musicTrackerOverlay' implicitly h... Remove this comment to see the full error message
            stagedDayparts.length > 0;

        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'box' implicitly has an 'any' type... Remove this comment to see the full error message
        const stationConfigs = (
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hostInfo' implicitly has an 'any'... Remove this comment to see the full error message
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
                                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ packets: any; createPacket: (name: any) =>... Remove this comment to see the full error message
                                    boxData={closedBox}
                                    stagedSongs={flattenedStaged}
                                    stagedRestrictions={stagedRestrictions}
                                    stagedDayparts={stagedDayparts}
                                />
                            )}
                            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardId: any; restrictions: never[]; stage... Remove this comment to see the full error message */}
                            <StationHostStatus
                                pollerEnabled={pollerEnabled}
                                stationHostType={stationHostType}
                            />
                        </div>
                    </StationHeader>
                    <div className="tab-container">
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardId: any; categories: any; dayparts: a... Remove this comment to see the full error message */}
                        <FeatureToggle featureName={FEATURES.PACKET_SONG}>
                            <TabItem
                                key="station-packets"
                                label="Packets"
                                name="station-packets"
                                linkTo={this.packetPath}
                                activeTab={activeTab}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ stagedSongs: any; categoryGroups: unknown;... Remove this comment to see the full error message
                            />
                        </FeatureToggle>
                        <FeatureToggle featureName={FEATURES.HOUR_RESTRICTION}>
                            <TabItem
                                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                                key="hour-restrictions"
                                // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type 'never... Remove this comment to see the full error message
                                label="Hour Restrictions"
                                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                                name="hour-restrictions"
                                // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type 'never... Remove this comment to see the full error message
                                linkTo={this.restrictionPath}
                                activeTab={activeTab}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                            />
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'. */}
                        </FeatureToggle>
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'. */}
                        <FeatureToggle featureName={FEATURES.DAYPARTS}>
                            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'. */}
                            <TabItem
                                key="dayparts"
                                label="Dayparts"
                                name="dayparts"
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                linkTo={this.daypartPath}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                activeTab={activeTab}
                            />
                        </FeatureToggle>
                    </div>
                    <SecureRoute
                        exact
                        path={this.packetPath}
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        render={() => (
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            <ConfigPackets
                                packets={packetWithSongs}
                                createPacket={this.createPacket}
                                versions={versionsflattened}
                                packetsChanges={packetsChanges}
                                stationCategoriesPermissions={stationCategoriesPermissions}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            />
                        )}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    />
                    <SecureRoute
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        exact
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        path={this.restrictionPath}
                        render={() => (
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            <ConfigRestrictions
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                boardId={board.id}
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                                restrictions={restrictionWithSongs}
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songVersions' implicitly has an '... Remove this comment to see the full error message
                                stagedRestrictions={stagedRestrictions}
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hostInfo' implicitly has an 'any'... Remove this comment to see the full error message
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
