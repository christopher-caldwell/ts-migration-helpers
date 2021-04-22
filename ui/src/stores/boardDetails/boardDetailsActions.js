import Filters from 'models/Filters';
import Layout from 'models/Layout';
import request from 'utils/request';
import uniq from 'lodash/uniq';
import { updateDateIntegrity } from 'stores/dateIntegrity/dateIntegrityActions';
import { loadSettings, onSetDate } from 'stores/musicTracker/musicTrackerActions';
import { songsLoading, setSongs, songsFailed } from 'stores/songs/songsActions';
import objectGet from 'utils/objectGet';
import { initializeSongTrends } from 'stores/songTrends/songTrendsActions';
import { closeMetricDetails } from 'stores/similarStations/similarStationsActions';
import { fetchStationPackets } from 'stores/packets/packetsActions';
import { getBox, getBoxClosed } from 'stores/box/boxActions';
import { fetchHourRestrictions } from 'stores/restrictions/restrictionsActions';
import { fetchStationDayparts } from 'stores/dayparts/daypartsActions';
import {
    getOmtData,
    getCustomConsolidatedCalloutData,
    getCustomConsolidatedOmtData,
    getOmtTrends,
    getCustomConsolidatedCalloutTrends,
    getCustomConsolidatedOmtTrends,
} from 'stores/cmm/cmmActions';
import { getStationCategories } from 'stores/categories/categoriesActions';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import history from '../../history';
import { competitorsPending } from '../songCompetitor/songCompetitorActions';

import {
    SONG_VERSIONS_PENDING,
    SONG_VERSIONS_SUCCESS,
    SONG_VERSIONS_FAILURE,
    STAGE_SONGS_MEDIA,
    SONG_COMPETITOR_SPINS_SUCCESS,
    SONG_COMPETITOR_SPINS_FAILURE,
    REQUEST_BOARD,
    UPDATE_BOARD,
    THROW_BOARD,
    UPDATE_OPTIONS,
} from '../actionTypes';

const requestBoard = () => ({ type: REQUEST_BOARD });

const addBoardDetails = payload => ({ type: UPDATE_BOARD, payload });

export const updateOptions = payload => ({ type: UPDATE_OPTIONS, payload });

const throwBoard = error => ({ type: THROW_BOARD, error });

export const fetchPanel = (params, inputs) => async (dispatch, getState) => {
    dispatch(requestBoard());
    try {
        const { layout, filters } = params;
        const { board } = layout; // TODO: remove reliance on this object
        if (inputs && inputs.savedDate) {
            const savedDate = filters.checkDateIntegrity(board, inputs);
            dispatch(updateDateIntegrity(savedDate));
        }
        // It's always an array of length 1
        const activePanel = layout.determinePanelsInUse(layout.getActiveLayout())[0];
        let applied = filters.getTabFilters(board);
        const { preferences } = getState();

        // gets station songs

        // mt metrics // versions // competitors
        // pl metrics
        // else metrics
        if (board.tabId === 'musictracker') {
            // Fetch Station Categories
            dispatch(getStationCategories(board.id));

            // Fetch Packets
            dispatch(fetchStationPackets(board.id));

            // Fetch Restrictions
            dispatch(fetchHourRestrictions(board.id));

            // Fetch Dayparts
            dispatch(fetchStationDayparts(board.id));

            // Fetch Opened Box
            dispatch(getBox(board.id));

            // Fetch Closed Box
            dispatch(getBoxClosed(board.id));

            // set the default date of the station
            dispatch(onSetDate(filters.applied.dateRange.startDate));

            // start loading songs
            dispatch(songsLoading());

            // fetch CMM data
            dispatch(getOmtData(board.id, filters.applied.dateRange.startDate, filters.applied.dateRange.endDate));
            dispatch(
                getCustomConsolidatedCalloutData(
                    board.id,
                    filters.applied.dateRange.startDate,
                    filters.applied.dateRange.endDate
                )
            );
            dispatch(
                getCustomConsolidatedOmtData(
                    board.id,
                    filters.applied.dateRange.startDate,
                    filters.applied.dateRange.endDate
                )
            );

            // fetch CMM Trends data
            dispatch(getOmtTrends(board.id, filters.applied.dateRange.startDate, filters.applied.dateRange.endDate));
            dispatch(
                getCustomConsolidatedCalloutTrends(
                    board.id,
                    filters.applied.dateRange.startDate,
                    filters.applied.dateRange.endDate
                )
            );
            dispatch(
                getCustomConsolidatedOmtTrends(
                    board.id,
                    filters.applied.dateRange.startDate,
                    filters.applied.dateRange.endDate
                )
            );

            // reset when page is being prefreshed or when tab change
            applied = {
                ...applied,
                options: {
                    ...applied.options,
                    sort: {
                        key: 'enhanced.pop.rnk',
                        field: 'enhanced_pop_rank',
                        defaultSort: true, // this is tell music tracker to not override the
                        // sortfield if it is set to false
                        sortValueExtractor: (songData, key) => objectGet(songData, key),
                        ascending: true,
                    },
                },
            };
            filters.save(applied, () => {});
        } else if (board.panels && board.panels[activePanel]) {
            // Re-use panel if it has already been loaded.
            // panel = board.panels[activePanel];
            // TODO: fix this logic. we don't store songs anymore so we can't reuse panel
        }
        // TODO: clean up naming conventions
        // Call Musictracker for songs and metrics
        // Call playlist overview only for additional metrics
        const panel = await request(`/board/${board.type}/${board.id}/panel/${activePanel}`, {
            params: { filters: JSON.stringify(applied) },
        });
        // right now mt songs and pl songs are in different shapes
        if (board.tabId !== 'musictracker') dispatch(setSongs(panel.metrics.songs));
        else dispatch(setSongs(panel.songs));

        if (board.tabId === 'musictracker') {
            dispatch({ type: SONG_VERSIONS_PENDING });
            const versions = await request(`/board/${board.type}/${board.id}/panel/category`, {
                params: { filters: JSON.stringify(applied) },
            });
            dispatch({ type: SONG_VERSIONS_SUCCESS, payload: { versions } });

            const flattenedStaged = utils.flatVersions(versions.staged);
            dispatch({
                type: STAGE_SONGS_MEDIA,
                payload: { songs: flattenedStaged },
            });

            const stationCompetitorSpins = preferences.competitors[board.id] || [];

            if (stationCompetitorSpins.length > 0) {
                const competitorsList = uniq([...stationCompetitorSpins.map(item => parseInt(item.value, 10))]);
                // get all the competitor spins
                dispatch(competitorsPending());
                const competitors = await request(`/board/${board.type}/${board.id}/panel/competitor`, {
                    params: {
                        filters: JSON.stringify({
                            ...applied,
                            competitors: competitorsList,
                        }),
                    },
                });
                dispatch({
                    type: SONG_COMPETITOR_SPINS_SUCCESS,
                    payload: { competitors },
                });
            }
        }

        // TODO: clean this up more
        const panels = {};
        if (board.tabId === 'musictracker') {
            panels[panel.type] = { ...panel, songs: null }; // we don't want to store this twice
            const { similarStations } = getState();
            const { open } = similarStations;
            if (open) {
                // this closes metric details popup
                dispatch(closeMetricDetails());
            }

            // store the data in the musictracker store
            // const { count, songs, sortField, sortKey, sortOrder } = panel.metrics;
            const { filters: songFilters } = panel;
            const { sortField, sortKey, sortOrder, hasTAA } = songFilters;
            applied = {
                ...applied,
                options: {
                    ...applied.options,
                    sort: {
                        ...applied.options.sort,
                        key: sortKey,
                        field: sortField,
                        // defaultSort: false, // this is tell music tracker to not
                        // override the sortfield if it is set to false
                        ascending: sortOrder,
                    },
                    hasTAA,
                },
            };
            filters.save(applied, () => {});

            // songs trends for the intial load
            dispatch(initializeSongTrends(filters, board.id, board.type, true));

            // loading the settings at last all because we want user preferences
            // before loading the settings.
            // initialize the music tracker settings, this method has the logic
            // to check before loading musictrackerorder.json
            // or before pulling data from user preference db
            dispatch(loadSettings(board.id));
        } else {
            panels[panel.type] = { ...panel, songs: null }; // we don't want to store this twice
        }

        const newBoard = {
            ...board,
            loading: false,
            panels: { ...board.panels, ...panels },
        };
        layout.setBoard(newBoard);
        dispatch(addBoardDetails({ layout, filters }));
    } catch (e) {
        console.error(e.message, e);
        dispatch(songsFailed(e));

        // TODO action specific catch block should be created or have its own action classes
        dispatch({ type: SONG_VERSIONS_FAILURE, payload: { error: e } });
        dispatch({ type: SONG_COMPETITOR_SPINS_FAILURE, payload: { error: e } });
        dispatch(addBoardDetails({ error: 'panels', loading: false }));
    }
};

export const initializeBoard = (board, inputs) => dispatch => {
    dispatch(requestBoard());

    const filters = new Filters();
    const layout = new Layout();

    const initialBoard = { ...board, panels: null, loading: true };

    filters.loadInitial(initialBoard, inputs, savedDate => {
        dispatch(updateDateIntegrity(savedDate));
        layout.setBoard(initialBoard);

        // store the board details such as applied, available and active layout to redux
        const params = { filters, layout };
        dispatch(fetchPanel(params));
    });
};

export const fetchBoard = (params, inputs) => dispatch => {
    const { boardType, boardId, typeKey, tabId } = params;
    dispatch(requestBoard());
    return request(`/board/${boardType}/${boardId}`)
        .then((board) => {
            // check if this is radio board and if the user has access to music tracker
            if (
                typeKey === 'radio' &&
                tabId === 'musictracker' &&
                board.config.layout.find(l => l.id === 'musictracker')
            ) {
                dispatch(initializeBoard({ ...board, tabId }, inputs));
            } else {
                history.replace('playlist-overview');
                dispatch(
                    initializeBoard(
                        {
                            ...board,
                            tabId: board.config.layout[0].id,
                        },
                        inputs
                    )
                );
            }
        })
        .catch(err => dispatch(throwBoard(err)));
};
