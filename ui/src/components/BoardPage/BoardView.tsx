import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';

import flatten from 'lodash/flatten';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import moment from 'moment';

import { loadVersions } from 'stores/songs/songsActions';
import { closeMetricDetails } from 'stores/similarStations/similarStationsActions';
import { getHostInformation } from 'stores/hostInformation/hostInformationActions';
import { updateDateIntegrity, requestDateIntegrity } from 'stores/dateIntegrity/dateIntegrityActions';
import BoardHeader from 'components/BoardPage/Header';
import { fetchPanel, fetchBoard } from 'stores/boardDetails/boardDetailsActions';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
// import HeaderSongInfo from 'components/HeaderSongInfo';
import { getStationFeatures, getSystemFeatures } from 'stores/features/featuresActions';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import { getCategoriesMetadata } from 'stores/categories/categoriesActions';
import { setSongInfoSelected } from 'stores/categorySidebar/categorySidebarActions';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import { SecureRoute } from '@okta/okta-react';
import { RadioBoard } from 'components/BoardPage/Panels';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import VersionSidebar from 'components/VersionSidebar';
import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import SyncStatus from 'components/SyncStatus';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
import StationHostStatus from 'components/BoardPage/StationHostStatus';
import {
    highlightCategoryVersion,
    dehighlightCategoryVersion,
} from 'stores/categoryHighlight/categoryHighlightActions';
import history from '../../history';

const { MusicTracker, PlaylistOverview } = RadioBoard;

const layoutProps = {
    RadioBoard: {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        headerProps: board => ({
            title: board.name,
            subtitle: [
                <span key={0} className="radio-subtitle">
                    {`${board.callLetters} ${board.market}`}
                </span>,
                <span key={1} className="radio-subtitle radio-subtitle--border-left">
                    {board.format}
                </span>,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSetSongInfoSelected' does not exist on... Remove this comment to see the full error message
            ],
        }),
    },
};

class BoardView extends React.PureComponent {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStationFeaturesAction' does not exist... Remove this comment to see the full error message
    state = {
        catChangeIDs: [],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSystemFeaturesAction' does not exist ... Remove this comment to see the full error message
        asideMusicTracker: {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getHostInformationAction' does not exist... Remove this comment to see the full error message
            opened: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchBoardAction' does not exist on type... Remove this comment to see the full error message
            categoryEdited: {},
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type 'R... Remove this comment to see the full error message
            initialCategory: '',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            dataOption: null,
            version: null,
        },
        openBottomBar: false,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
    };

    UNSAFE_componentWillMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'catMetadata' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSetSongInfoSelected' does not exist on... Remove this comment to see the full error message
        this.props.onSetSongInfoSelected({});
    }

    componentDidMount() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStationFeaturesAction' does not exist... Remove this comment to see the full error message
            getStationFeaturesAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSystemFeaturesAction' does not exist ... Remove this comment to see the full error message
            getSystemFeaturesAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getHostInformationAction' does not exist... Remove this comment to see the full error message
            getHostInformationAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchBoardAction' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
            fetchBoardAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type 'R... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'applied' implicitly has an 'any' type.
            dateIntegrity,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            songVersions: {
                data: { staged },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match: {
                params: { boardId, tabId },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'catMetadata' does not exist on type 'Rea... Remove this comment to see the full error message
            catMetadata,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCategoriesMetadataAction' does not ex... Remove this comment to see the full error message
            getCategoriesMetadataAction,
        } = this.props;

        const savedDate = dateIntegrity;
        if (!isEmpty(staged)) {
            history.push(`/board/radio/${boardId}/categories`);
        }
        const boardDetails = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
            boardType: 'RadioBoard',
            tabId: tabId === 'categories' ? 'musictracker' : tabId,
            boardId,
            typeKey: 'radio',
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeMetricDetailsAction' does not exist... Remove this comment to see the full error message
        const inputs = {
            savedDate,
            resetDateIntegrity: false,
            isDateOrTabChanged: savedDate.persist,
        };
        // this retrives the required board info for selected board
        // such as radio, artist, user etc and store them in redux.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchPanelAction' does not exist on type... Remove this comment to see the full error message
        if (isEmpty(catMetadata)) getCategoriesMetadataAction();
        fetchBoardAction(boardDetails, inputs);
        getSystemFeaturesAction();
        getStationFeaturesAction(boardId);
        getHostInformationAction(boardId);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
    onAnchorClick = href => {
        // TODO: is this needed?
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'lastCategoriesUpdatedDate' does not exis... Remove this comment to see the full error message
        const { updateDateIntegrityAction } = this.props;
        updateDateIntegrityAction({ persist: true });

        history.push(href);
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'applied' implicitly has an 'any' type.
    onFilterSave = (applied, flushPanels = [], callback = null) => {
        const resetApplied = applied;
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            boardDetails: {
                filters,
                layout,
                layout: { board },
            },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
        // If flushing panels, update board state
        const filterCallback =
            callback !== null
                ? callback
                : () => {
                    // Reset cached panels depending on whether we are flushing all or a few
                    const panels = flushPanels.length === 0 ? null : board.panels;
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                    flushPanels.forEach(panelType => {
                        panels[panelType] = undefined;
                    });

                    const newBoard = { ...board, panels, loading: true };
                    layout.setBoard(newBoard);

                    if (board.tabId === 'musictracker') {
                        // reset the page number to 1 when loading previous or next week data
                        resetApplied.options.page = 1;
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categorySidebar' does not exist on type ... Remove this comment to see the full error message
                        const { similarStations } = this.props;
                        const { open } = similarStations;
                        if (open) {
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeMetricDetailsAction' does not exist... Remove this comment to see the full error message
                            const { closeMetricDetailsAction } = this.props;
                            // this closes metric details popup
                            closeMetricDetailsAction();
                        }
                    }
                    filters.save(resetApplied, () => {});

                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dehighlightAction' does not exist on typ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchPanelAction' does not exist on type... Remove this comment to see the full error message
                    const { fetchPanelAction, dateIntegrity } = this.props;
                    const savedDate = dateIntegrity;
                    const params = {
                        savedDate,
                        resetDateIntegrity: false,
                        isDateOrTabChanged: true,
                    };

                    fetchPanelAction({ layout, filters }, params);
                };

        filters.save(resetApplied, filterCallback);
    };

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    getLastUpdateTimestamp = () => {
        // TODO: use this to put in last updated
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songsArray' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'lastCategoriesUpdatedDate' does not exis... Remove this comment to see the full error message
        const { lastCategoriesUpdatedDate, isMusicTracker } = this.props;
        const lastCategoriesUpdatedMoment = lastCategoriesUpdatedDate ? moment(lastCategoriesUpdatedDate) : null;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'versionsWithPacket' implicitly has an '... Remove this comment to see the full error message
        return isMusicTracker
            ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
              lastCategoriesUpdatedMoment && lastCategoriesUpdatedMoment.isValid() && (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
                <div className="last-updated">
                    <span>Last Synced:</span>
                    <span className="date-time">
                        {lastCategoriesUpdatedMoment.utc().format('MM-DD-YYYY HH:mm:ss')}
                    </span>
                </div>
            )
            : '';
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    compareCategoryVersionSelection = song => {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
        const { categoryHighlight } = this.props;

        if (categoryHighlight) {
            const { songId, mediaId } = categoryHighlight.data;
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: any; songs: any; dataSong: an... Remove this comment to see the full error message
            const { sId, media_id: songMediaId } = song;
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            return songMediaId ? songId === sId && mediaId === songMediaId : songId === sId;
        }

        return false;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    openSongInfo = (song, metricKey, ccid) => {
        const {
            sId,
            category: { staged, current },
        } = song;

        let mediaId = ccid;
        // if the mediaId is not passed by default use the merge and reorder method
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabId' implicitly has an 'any' type.
        // and find the last updated version of a song and get its mediaId
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
        if (!ccid && metricKey !== 'compare') {
            let merged = staged || current;
            if (staged && current) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                merged = utils.mergeAndReOrder('media_id', staged, current);
            }
            mediaId = !isEmpty(merged) && merged[0].media_id;
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categorySidebar' does not exist on type ... Remove this comment to see the full error message
        const { categorySidebar, onSetSongInfoSelected, match } = this.props;

        switch (metricKey) {
            case 'compare': {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
                const songInfoSelected = categorySidebar ? categorySidebar.songInfoSelected : {};
                // during compare we get an array of song id not the song object hence
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
                // use the incoming song array with song Id
                const hasSongSelected = song.includes(songInfoSelected.sId);
                if (!hasSongSelected) onSetSongInfoSelected({});
                break;
            }
            default: {
                history.push(`/board/radio/${match.params.boardId}/categories`);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dataOption' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'dehighlightAction' does not exist on typ... Remove this comment to see the full error message
                const { dehighlightAction, highlightAction } = this.props;
                const songItem = { sId, media_id: mediaId };
                // if they are the same item we need to dehighlight
                const highlight = this.compareCategoryVersionSelection(songItem);
                if (highlight) dehighlightAction();
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'openBottomBar' implicitly has an 'any' ... Remove this comment to see the full error message
                else highlightAction(songItem, metricKey);
                const categoryItem =
                    mediaId && mediaId > 0
                        ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                          document.getElementById(`Category-Item-${sId}-${mediaId}`)
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
                        : document.getElementById(`Category-Item-${sId}-0`);
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
                categoryItem.scrollIntoView({ block: 'center' });
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
                break;
            }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
        }
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isMusicTracker' does not exist on type '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songsArray' implicitly has an 'any' typ... Remove this comment to see the full error message
    saveCatChangeIds = songsArray => {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'media_id' implicitly has an 'any'... Remove this comment to see the full error message
        const songsInfo = songsArray.map(({ media_id, category, order_by }) => ({
            media_id,
            category: category && category.name,
            order_by,
        }));
        this.setState({ catChangeIDs: songsInfo });
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'versionsWithPacket' implicitly has an '... Remove this comment to see the full error message
    buildAsideModal = versionsWithPacket => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
            songs,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isMusicTracker' does not exist on type '... Remove this comment to see the full error message
            isMusicTracker,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetWith' does not exist on type 'read... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
            mtData: {
                categoryDetails: { stationCategoriesPermissions },
            },
        } = this.props;
        const {
            asideMusicTracker: { version, dataOption, opened },
        } = this.state;

        const asideModalData = isMusicTracker // playlist overview uses id, not sId
            ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
              songs.find(song => song.sId === version.sId)
            : // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
              songs.find(song => song.id === version.sId);

        return (
            dataOption && (
                <AsideModal
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    title={dataOption.title}
                    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                    subtitle={dataOption.subtitle}
                    handleClose={this.handleCloseAsideModal}
                    asideModalOpened={opened}
                >
                    <AsideModalPanels
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: any; songs: any; dataSong: an... Remove this comment to see the full error message
                        featureName={dataOption.featureName}
                        songs={songs}
                        dataSong={asideModalData}
                        version={version}
                        handleClose={this.handleCloseAsideModal}
                        versionsWithPacket={versionsWithPacket}
                        match={match}
                        stationCategoriesPermissions={stationCategoriesPermissions}
                    />
                </AsideModal>
            )
        );
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabId' implicitly has an 'any' type.
    buildCategorySidebar = tabId => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
            mtData: {
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ loading: any; error: any; onFilterSave: (a... Remove this comment to see the full error message
                categoryDetails: { rawStationCategories, stationCategoriesPermissions },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            boardDetails: {
                layout: { board },
                filters: {
                    applied: {
                        dateRange: { startDate },
                    },
                },
            },
        } = this.props;
        if (['categories', 'musictracker'].includes(tabId)) {
            return (
                <VersionSidebar
                    sendCategoryChangeSongs={this.saveCatChangeIds}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
                    songs={this.props.songs}
                    categories={rawStationCategories}
                    boardId={board.id}
                    startDate={startDate}
                    openSongInfo={this.openSongInfo}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    match={this.props.match}
                    tabId={tabId}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    notifyBottomBarOpened={this.notifyBottomBarOpened}
                    stationCategoriesPermissions={stationCategoriesPermissions}
                />
            );
        }
        return null;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dataOption' implicitly has an 'any' typ... Remove this comment to see the full error message
    handleOpenAsideModal = (dataOption, version) =>
        this.setState({
            asideMusicTracker: {
                ...this.state.asideMusicTracker,
                opened: true,
                dataOption,
                version,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            },
        });

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    handleCloseAsideModal = () =>
        this.setState({
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            asideMusicTracker: {
                opened: false,
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                categoryEdited: {},
                dataOption: null,
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                version: null,
            },
        });

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'openBottomBar' implicitly has an 'any' ... Remove this comment to see the full error message
    notifyBottomBarOpened = openBottomBar => this.setState({ openBottomBar });

    render() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            // boardDetails: { fetching, error, layout, filters },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
            boardDetails: { fetching, error, layout },
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dateIntegrity' implicitly has an ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'box' implicitly has an 'any' type... Remove this comment to see the full error message
            songVersions: { data },
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dayparts' implicitly has an 'any'... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match: {
                params: { tabId },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            categoryHighlight,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            songs,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
            loading,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boxClosedData' does not exist on type 'R... Remove this comment to see the full error message
            boxClosedData,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
            stagedRestrictions,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
            stagedDayparts,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isMusicTracker' does not exist on type '... Remove this comment to see the full error message
            isMusicTracker,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hostInfo' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
            hostInfo: { pollerEnabled, stationHostType },
        } = this.props;
        const {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            catChangeIDs,
            asideMusicTracker: { version },
            openBottomBar,
        } = this.state;

        // const dateRange = filters ? filters.applied.dateRange : null;
        if (fetching || !layout || !songs) {
            return <LoadingIndicator className="dashboard-page-loading" />;
        }

        const { board } = layout;
        if (!board) {
            return <LoadingIndicator className="dashboard-page-loading" />;
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        const { headerProps } = layoutProps[board.type];
        const boardProps = { ...headerProps(board) };
        if (boardProps.url) {
            const anchorUrl = ( // TODO: fix this => change to button
                // eslint-disable-next-line no-script-url
                <button onClick={() => this.onAnchorClick(boardProps.url)}>{boardProps.name}</button>
            );
            boardProps.subtitle = anchorUrl;
        }

        const ishighlighted = !isEmpty(categoryHighlight) && !isEmpty(categoryHighlight.data);
        const objectSongInfoSelected = ishighlighted
            ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
              songs.find(song => song.sId === categoryHighlight.data.songId)
            : {};
        const versionsWithPacket = data.staged
            ? flatten(Object.values(data.staged))
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetWith' does not exist on type 'read... Remove this comment to see the full error message
                .filter(song => song.packetWith)
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'readon... Remove this comment to see the full error message
                .map(song => [song.media_id, song.packetWith[0].media_id])
            : []; // returns array of arrays that have the packet media_ids ex: [[packetIds], []]

        const asideModal = version ? this.buildAsideModal(versionsWithPacket) : null;

        const categorySidebar = this.buildCategorySidebar(tabId);
        const stagedVersions = data.staged || {};
        const flattenedStaged = utils.flatVersions(stagedVersions);

        const bottomBarOpened =
            openBottomBar || flattenedStaged.length > 0 || stagedRestrictions.length > 0 || stagedDayparts.length > 0;

        // const isPlaylistOverview = tabId === 'playlist-overview
        return (
            <div className="content-container">
                {asideModal}
                {categorySidebar}
                <div className="container-fluid container-musictracker">
                    <BoardHeader
                        {...boardProps}
                        // detailOpened={!isPlaylistOverview && ishighlighted} - ML-6162
                    >
                        <div className="station-info">
                            {pollerEnabled && isMusicTracker && (
                                <SyncStatus
                                    boxData={boxClosedData}
                                    stagedSongs={flattenedStaged}
                                    stagedRestrictions={stagedRestrictions}
                                    stagedDayparts={stagedDayparts}
                                />
                            )}
                            {isMusicTracker && (
                                <StationHostStatus pollerEnabled={pollerEnabled} stationHostType={stationHostType} />
                            )}
                        </div>
                    </BoardHeader>
                    {/* ML-6162 Removing the call to render the HeaderSongInfo component */}
                    {/* {isPlaylistOverview ? null : (
                       <HeaderSongInfo songInfo={objectSongInfoSelected} dateRange={dateRange} />
                    )} */}
                    <SecureRoute
                        exact
                        path="/board/radio/:boardId/(musictracker|categories)"
                        render={() => (
                            <MusicTracker
                                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ loading: any; error: any; onFilterSave: (a... Remove this comment to see the full error message
                                loading={loading}
                                error={error}
                                onFilterSave={this.onFilterSave}
                                match={match}
                                openSongInfo={this.openSongInfo}
                                songInfoSelected={objectSongInfoSelected && categoryHighlight}
                                // detailOpened={ishighlighted} - ML-6162
                                versionsWithPacket={versionsWithPacket}
                                catChangeIDs={catChangeIDs}
                                bottomBarOpened={bottomBarOpened}
                            />
                        )}
                    />
                    <SecureRoute
                        exact
                        path="/board/radio/:boardId/playlist-overview"
                        render={() => <PlaylistOverview error={error} onFilterSave={this.onFilterSave} match={match} />}
                    />
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
BoardView.propTypes = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    boardDetails: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    boxClosedData: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    categoryHighlight: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    categorySidebar: PropTypes.shape().isRequired,
    closeMetricDetailsAction: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    dateIntegrity: PropTypes.shape().isRequired,
    dehighlightAction: PropTypes.func.isRequired,
    fetchBoardAction: PropTypes.func.isRequired,
    fetchPanelAction: PropTypes.func.isRequired,
    getStationFeaturesAction: PropTypes.func.isRequired,
    getSystemFeaturesAction: PropTypes.func.isRequired,
    highlightAction: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            boardId: PropTypes.string,
            tabId: PropTypes.string,
            typeKey: PropTypes.string,
        }),
    }).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    mtData: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    similarStations: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    songVersions: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stagedRestrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    updateDateIntegrityAction: PropTypes.func.isRequired,
    onSetSongInfoSelected: PropTypes.func.isRequired,
    asideModalOpened: PropTypes.bool,
    isMusicTracker: PropTypes.bool,
    lastCategoriesUpdatedDate: PropTypes.string,
    loading: PropTypes.bool,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
BoardView.defaultProps = {
    lastCategoriesUpdatedDate: null,
    asideModalOpened: false,
    loading: false,
    isMusicTracker: true,
};

const mapStateToProps = (
    {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
        boardDetails,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'musicTrackerData' implicitly has ... Remove this comment to see the full error message
        musicTrackerData,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dateIntegrity' implicitly has an ... Remove this comment to see the full error message
        dateIntegrity,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'musicTrackerOverlay' implicitly h... Remove this comment to see the full error message
        musicTrackerOverlay,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
        songs,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songVersions' implicitly has an '... Remove this comment to see the full error message
        songVersions,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categorySidebar' implicitly has a... Remove this comment to see the full error message
        categorySidebar,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'similarStations' implicitly has a... Remove this comment to see the full error message
        similarStations,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoryHighlight' implicitly has... Remove this comment to see the full error message
        categoryHighlight,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'box' implicitly has an 'any' type... Remove this comment to see the full error message
        box,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictions' implicitly has an '... Remove this comment to see the full error message
        restrictions,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dayparts' implicitly has an 'any'... Remove this comment to see the full error message
        dayparts,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hostInfo' implicitly has an 'any'... Remove this comment to see the full error message
        hostInfo,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoriesMetadata' implicitly ha... Remove this comment to see the full error message
        categoriesMetadata,
    },
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ownProps' implicitly has an 'any' type.
    ownProps
) => {
    // TODO: move some of this logic into MusicTracker/PlaylistOverview
    // and some into category sidebar
    // We are re-shaping too much data. We should change the shape in the db query
    const path = ownProps.location.pathname;
    const isOverview = path.includes('playlist-overview');
    const isMusicTracker = !isOverview;
    const versionData = songVersions.data;
    const invertedData = {};
    Object.keys(versionData.current || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            current: songVersions.data.current[songId],
        };
    });
    Object.keys(versionData.prior || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            prior: songVersions.data.prior[songId],
        };
    });
    Object.keys(versionData.staged || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            staged: songVersions.data.staged[songId],
        };
    });
    Object.keys(versionData.recommended || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            recommended: songVersions.data.recommended[songId],
        };
    });

    // get all music tracker song ids
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    const musicTrackerSongIds = isMusicTracker ? songs.data.map(song => song.sId) : [];
    // get all gselector songs Ids and convert string to integer
    const gselectorSongIds = Object.keys(invertedData).map(item => parseInt(item, 10));
    // merge and remove duplicates
    const mergedSongIds = [...gselectorSongIds, ...musicTrackerSongIds];
    const ddedup = uniq(mergedSongIds);
    const songsWithVersions = isMusicTracker
        ? ddedup.map(songId => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
            const song = songs.data.find(s => (s && s.sId ? s.sId.toString() === songId.toString() : false));

            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const categories = invertedData[songId] || {
                staged: null,
                current: null,
            };
            if (song) return { ...song, category: categories };
            const version = utils.mergeAndReOrder('media_id', categories.staged, categories.current)[0];
            if (version) {
                return {
                    ...song,
                    sId: parseInt(songId, 10),
                    metadata: { aNm: version.aNm, sNm: version.sNm },
                    category: categories,
                };
            }
            return undefined;
        })
        : songs.data;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    const songsWithVersionsFiltered = songsWithVersions.filter(item => item);

    return {
        boardDetails,
        mtData: musicTrackerData,
        dateIntegrity,
        musicTrackerOverlay,
        isMusicTracker,
        categorySidebar,
        songs: songsWithVersionsFiltered,
        similarStations,
        lastCategoriesUpdatedDate: songs.lastCategoriesUpdatedDate,
        loading: songs.loading && songsWithVersionsFiltered.loading,
        songVersions,
        categoryHighlight,
        boxClosedData: box.closed,
        stagedRestrictions: restrictions.staged,
        stagedDayparts: dayparts.staged,
        hostInfo,
        catMetadata: categoriesMetadata.data,
    };
};

const mapDispatchToProps = {
    fetchPanelAction: fetchPanel,
    updateDateIntegrityAction: updateDateIntegrity,
    loadVersionsAction: loadVersions,
    closeMetricDetailsAction: closeMetricDetails,
    onSetSongInfoSelected: setSongInfoSelected,
    getStationFeaturesAction: getStationFeatures,
    getSystemFeaturesAction: getSystemFeatures,
    fetchBoardAction: fetchBoard,
    requestDateIntegrityAction: requestDateIntegrity,
    highlightAction: highlightCategoryVersion,
    dehighlightAction: dehighlightCategoryVersion,
    getHostInformationAction: getHostInformation,
    getCategoriesMetadataAction: getCategoriesMetadata,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);
