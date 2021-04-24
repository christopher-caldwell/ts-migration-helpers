import { initializeSongTrends } from 'stores/songTrends/songTrendsActions';
import { getMusicTrackerData } from 'stores/musicTrackerData/musicTrackerDataActions';
import request from 'utils/request';
import {
    SONGS_PENDING,
    SONGS_FAILURE,
    SET_SONGS,
    SONG_VERSIONS_PENDING,
    SONG_VERSIONS_FAILURE,
    SONG_VERSIONS_SUCCESS,
} from '../actionTypes';

export const songsFailed = error => ({
    type: SONGS_FAILURE,
    payload: { error },
});

export const setSongs = songs => {
    return { type: SET_SONGS, payload: { songs } };
}

export const songsLoading = () => ({ type: SONGS_PENDING });

export const loadSongs = (filters, boardId, boardType, reset) => async (dispatch, getState) => {
    const {
        boardDetails: { layout },
    } = getState();
    dispatch(getMusicTrackerData());
    dispatch(songsLoading());

    try {
        const activePanel = layout.determinePanelsInUse(layout.getActiveLayout())[0];
        const panel = await request(`/board/${boardType}/${boardId}/panel/${activePanel}`, {
            params: { filters: JSON.stringify(filters.applied) },
        });
        dispatch({ type: SONG_VERSIONS_PENDING });
        const versions = await request(`/board/${boardType}/${boardId}/panel/category`);
        // TODO check if this is valid here
        // if (board.tabId !== 'musictracker') dispatch(setSongs(panel.metrics.songs));
        // else dispatch(setSongs(panel.songs));
        dispatch(setSongs(panel.songs));
        dispatch({ type: SONG_VERSIONS_SUCCESS, payload: { versions } });

        // load the trends for the songs that got just loaded
        dispatch(initializeSongTrends(filters, boardId, boardType, reset));
    } catch (error) {
        dispatch(songsFailed(error));
    }
};

export const loadVersions = (filters, boardId) => async dispatch => {
    try {
        dispatch({ type: SONG_VERSIONS_PENDING });
        const versions = await request(`/board/RadioBoard/${boardId}/panel/category`, {
            params: { filters: JSON.stringify(filters.applied) },
        });
        dispatch({ type: SONG_VERSIONS_SUCCESS, payload: { versions } });
    } catch (error) {
        dispatch({ type: SONG_VERSIONS_FAILURE, payload: { error } });
    }
};

export const getMusicpointSongs = () => async dispatch => {
    dispatch(songsLoading());
    try {
        const songs = await request('/director/songs');
        dispatch(setSongs(songs));
    } catch (error) {
        dispatch(songsFailed(error));
    }
};
