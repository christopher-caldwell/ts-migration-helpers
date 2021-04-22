import React from 'react';
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
import { getCategoriesMetadata } from 'stores/categories/categoriesActions';
import { setSongInfoSelected } from 'stores/categorySidebar/categorySidebarActions';
import { SecureRoute } from '@okta/okta-react';
import { RadioBoard } from 'components/BoardPage/Panels';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import VersionSidebar from 'components/VersionSidebar';
import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import SyncStatus from 'components/SyncStatus';
import StationHostStatus from 'components/BoardPage/StationHostStatus';
import {
    highlightCategoryVersion,
    dehighlightCategoryVersion,
} from 'stores/categoryHighlight/categoryHighlightActions';
import history from '../../history';

const { MusicTracker, PlaylistOverview } = RadioBoard;

const layoutProps = {
    RadioBoard: {
        headerProps: (board) => ({
            title: board.name,
            subtitle: [
                <span key={0} className="radio-subtitle">
                    {`${board.callLetters} ${board.market}`}
                </span>,
                <span key={1} className="radio-subtitle radio-subtitle--border-left">
                    {board.format}
                </span>,
            ],
        }),
    },
};

class BoardView extends React.PureComponent {
    state = {
        catChangeIDs: [],
        asideMusicTracker: {
            opened: false,
            categoryEdited: {},
            initialCategory: '',
            dataOption: null,
            version: null,
        },
        openBottomBar: false,
    };

    UNSAFE_componentWillMount() {
        this.props.onSetSongInfoSelected({});
    }

    componentDidMount() {
        const {
            getStationFeaturesAction,
            getSystemFeaturesAction,
            getHostInformationAction,
            fetchBoardAction,
            dateIntegrity,
            songVersions: {
                data: { staged },
            },
            match: {
                params: { boardId, tabId },
            },
            catMetadata,
            getCategoriesMetadataAction,
        } = this.props;

        const savedDate = dateIntegrity;
        if (!isEmpty(staged)) {
            history.push(`/board/radio/${boardId}/categories`);
        }
        const boardDetails = {
            boardType: 'RadioBoard',
            tabId: tabId === 'categories' ? 'musictracker' : tabId,
            boardId,
            typeKey: 'radio',
        };
        const inputs = {
            savedDate,
            resetDateIntegrity: false,
            isDateOrTabChanged: savedDate.persist,
        };
        // this retrives the required board info for selected board
        // such as radio, artist, user etc and store them in redux.
        if (isEmpty(catMetadata)) getCategoriesMetadataAction();
        fetchBoardAction(boardDetails, inputs);
        getSystemFeaturesAction();
        getStationFeaturesAction(boardId);
        getHostInformationAction(boardId);
    }

    onAnchorClick = (href) => {
        // TODO: is this needed?
        const { updateDateIntegrityAction } = this.props;
        updateDateIntegrityAction({ persist: true });

        history.push(href);
    };

    onFilterSave = (applied, flushPanels = [], callback = null) => {
        const resetApplied = applied;
        const {
            boardDetails: {
                filters,
                layout,
                layout: { board },
            },
        } = this.props;
        // If flushing panels, update board state
        const filterCallback =
            callback !== null
                ? callback
                : () => {
                      // Reset cached panels depending on whether we are flushing all or a few
                      const panels = flushPanels.length === 0 ? null : board.panels;
                      flushPanels.forEach((panelType) => {
                          panels[panelType] = undefined;
                      });

                      const newBoard = { ...board, panels, loading: true };
                      layout.setBoard(newBoard);

                      if (board.tabId === 'musictracker') {
                          // reset the page number to 1 when loading previous or next week data
                          resetApplied.options.page = 1;
                          const { similarStations } = this.props;
                          const { open } = similarStations;
                          if (open) {
                              const { closeMetricDetailsAction } = this.props;
                              // this closes metric details popup
                              closeMetricDetailsAction();
                          }
                      }
                      filters.save(resetApplied, () => {});

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

    getLastUpdateTimestamp = () => {
        // TODO: use this to put in last updated
        const { lastCategoriesUpdatedDate, isMusicTracker } = this.props;
        const lastCategoriesUpdatedMoment = lastCategoriesUpdatedDate ? moment(lastCategoriesUpdatedDate) : null;

        return isMusicTracker
            ? lastCategoriesUpdatedMoment && lastCategoriesUpdatedMoment.isValid() && (
                  <div className="last-updated">
                      <span>Last Synced:</span>
                      <span className="date-time">
                          {lastCategoriesUpdatedMoment.utc().format('MM-DD-YYYY HH:mm:ss')}
                      </span>
                  </div>
              )
            : '';
    };

    compareCategoryVersionSelection = (song) => {
        const { categoryHighlight } = this.props;

        if (categoryHighlight) {
            const { songId, mediaId } = categoryHighlight.data;
            const { sId, media_id: songMediaId } = song;
            return songMediaId ? songId === sId && mediaId === songMediaId : songId === sId;
        }

        return false;
    };

    openSongInfo = (song, metricKey, ccid) => {
        const {
            sId,
            category: { staged, current },
        } = song;

        let mediaId = ccid;
        // if the mediaId is not passed by default use the merge and reorder method
        // and find the last updated version of a song and get its mediaId
        if (!ccid && metricKey !== 'compare') {
            let merged = staged || current;
            if (staged && current) {
                merged = utils.mergeAndReOrder('media_id', staged, current);
            }
            mediaId = !isEmpty(merged) && merged[0].media_id;
        }

        const { categorySidebar, onSetSongInfoSelected, match } = this.props;

        switch (metricKey) {
            case 'compare': {
                const songInfoSelected = categorySidebar ? categorySidebar.songInfoSelected : {};
                // during compare we get an array of song id not the song object hence
                // use the incoming song array with song Id
                const hasSongSelected = song.includes(songInfoSelected.sId);
                if (!hasSongSelected) onSetSongInfoSelected({});
                break;
            }
            default: {
                history.push(`/board/radio/${match.params.boardId}/categories`);
                const { dehighlightAction, highlightAction } = this.props;
                const songItem = { sId, media_id: mediaId };
                // if they are the same item we need to dehighlight
                const highlight = this.compareCategoryVersionSelection(songItem);
                if (highlight) dehighlightAction();
                else highlightAction(songItem, metricKey);
                const categoryItem =
                    mediaId && mediaId > 0
                        ? document.getElementById(`Category-Item-${sId}-${mediaId}`)
                        : document.getElementById(`Category-Item-${sId}-0`);
                categoryItem.scrollIntoView({ block: 'center' });
                break;
            }
        }
    };

    saveCatChangeIds = (songsArray) => {
        const songsInfo = songsArray.map(({ media_id, category, order_by }) => ({
            media_id,
            category: category && category.name,
            order_by,
        }));
        this.setState({ catChangeIDs: songsInfo });
    };

    buildAsideModal = (versionsWithPacket) => {
        const {
            songs,
            isMusicTracker,
            match,
            mtData: {
                categoryDetails: { stationCategoriesPermissions },
            },
        } = this.props;
        const {
            asideMusicTracker: { version, dataOption, opened },
        } = this.state;

        const asideModalData = isMusicTracker // playlist overview uses id, not sId
            ? songs.find((song) => song.sId === version.sId)
            : songs.find((song) => song.id === version.sId);

        return (
            dataOption && (
                <AsideModal
                    title={dataOption.title}
                    subtitle={dataOption.subtitle}
                    handleClose={this.handleCloseAsideModal}
                    asideModalOpened={opened}
                >
                    <AsideModalPanels
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

    buildCategorySidebar = (tabId) => {
        const {
            mtData: {
                categoryDetails: { rawStationCategories, stationCategoriesPermissions },
            },
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
                    songs={this.props.songs}
                    categories={rawStationCategories}
                    boardId={board.id}
                    startDate={startDate}
                    openSongInfo={this.openSongInfo}
                    match={this.props.match}
                    tabId={tabId}
                    notifyBottomBarOpened={this.notifyBottomBarOpened}
                    stationCategoriesPermissions={stationCategoriesPermissions}
                />
            );
        }
        return null;
    };

    handleOpenAsideModal = (dataOption, version) =>
        this.setState({
            asideMusicTracker: {
                ...this.state.asideMusicTracker,
                opened: true,
                dataOption,
                version,
            },
        });

    handleCloseAsideModal = () =>
        this.setState({
            asideMusicTracker: {
                opened: false,
                categoryEdited: {},
                dataOption: null,
                version: null,
            },
        });

    notifyBottomBarOpened = (openBottomBar) => this.setState({ openBottomBar });

    render() {
        const {
            // boardDetails: { fetching, error, layout, filters },
            boardDetails: { fetching, error, layout },
            songVersions: { data },
            match,
            match: {
                params: { tabId },
            },
            categoryHighlight,
            songs,
            loading,
            boxClosedData,
            stagedRestrictions,
            stagedDayparts,
            isMusicTracker,
            hostInfo: { pollerEnabled, stationHostType },
        } = this.props;
        const {
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
            ? songs.find((song) => song.sId === categoryHighlight.data.songId)
            : {};
        const versionsWithPacket = data.staged
            ? flatten(Object.values(data.staged))
                  .filter((song) => song.packetWith)
                  .map((song) => [song.media_id, song.packetWith[0].media_id])
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

BoardView.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    boxClosedData: PropTypes.shape().isRequired,
    categoryHighlight: PropTypes.shape().isRequired,
    categorySidebar: PropTypes.shape().isRequired,
    closeMetricDetailsAction: PropTypes.func.isRequired,
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
    mtData: PropTypes.shape().isRequired,
    similarStations: PropTypes.shape().isRequired,
    songVersions: PropTypes.shape().isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedRestrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    updateDateIntegrityAction: PropTypes.func.isRequired,
    onSetSongInfoSelected: PropTypes.func.isRequired,
    asideModalOpened: PropTypes.bool,
    isMusicTracker: PropTypes.bool,
    lastCategoriesUpdatedDate: PropTypes.string,
    loading: PropTypes.bool,
};

BoardView.defaultProps = {
    lastCategoriesUpdatedDate: null,
    asideModalOpened: false,
    loading: false,
    isMusicTracker: true,
};

const mapStateToProps = (
    {
        boardDetails,
        musicTrackerData,
        dateIntegrity,
        musicTrackerOverlay,
        songs,
        songVersions,
        categorySidebar,
        similarStations,
        categoryHighlight,
        box,
        restrictions,
        dayparts,
        hostInfo,
        categoriesMetadata,
    },
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
    Object.keys(versionData.current || {}).forEach((songId) => {
        invertedData[songId] = {
            ...invertedData[songId],
            current: songVersions.data.current[songId],
        };
    });
    Object.keys(versionData.prior || {}).forEach((songId) => {
        invertedData[songId] = {
            ...invertedData[songId],
            prior: songVersions.data.prior[songId],
        };
    });
    Object.keys(versionData.staged || {}).forEach((songId) => {
        invertedData[songId] = {
            ...invertedData[songId],
            staged: songVersions.data.staged[songId],
        };
    });
    Object.keys(versionData.recommended || {}).forEach((songId) => {
        invertedData[songId] = {
            ...invertedData[songId],
            recommended: songVersions.data.recommended[songId],
        };
    });

    // get all music tracker song ids
    const musicTrackerSongIds = isMusicTracker ? songs.data.map((song) => song.sId) : [];
    // get all gselector songs Ids and convert string to integer
    const gselectorSongIds = Object.keys(invertedData).map((item) => parseInt(item, 10));
    // merge and remove duplicates
    const mergedSongIds = [...gselectorSongIds, ...musicTrackerSongIds];
    const ddedup = uniq(mergedSongIds);
    const songsWithVersions = isMusicTracker
        ? ddedup.map((songId) => {
              const song = songs.data.find((s) => (s && s.sId ? s.sId.toString() === songId.toString() : false));

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

    const songsWithVersionsFiltered = songsWithVersions.filter((item) => item);

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
