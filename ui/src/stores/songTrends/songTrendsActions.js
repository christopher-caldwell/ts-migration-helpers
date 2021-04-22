import request from 'utils/request';
import {
    SONG_TRENDS_PENDING,
    SET_TRENDS_COLUMNS,
    SET_TRENDS,
    SONG_TRENDS_FAILURE,
    TOGGLE_TRENDS,
} from '../actionTypes';

export const setTrendsColumns = mTPreferences => dispatch => {
    const callout = [...mTPreferences].find(group => group.key === 'callout');
    const trendsColumns = callout.items
        .filter(item => item.hasTrends && item.checked)
        .reduce((acc, cur) => acc.concat(cur.sortKey.split('.')[2]), [])
        .filter((v, i, a) => a.indexOf(v) === i);

    dispatch({ type: SET_TRENDS_COLUMNS, payload: trendsColumns });
};

export const onToggleTrends = () => dispatch => dispatch({ type: TOGGLE_TRENDS });

export const initializeSongTrends = (filters, boardId, boardType, reset) => async (dispatch, getState) => {
    dispatch({ type: SONG_TRENDS_PENDING });
    dispatch({ type: 'GET_MUSIC_TRACKER_DATA' });

    const { songTrends } = getState();
    const trendsColumns = songTrends.columns;
    const filterWithSongIds = {
        ...filters.applied,
        trendsColumns,
    };
    try {
        const dataTrends = await request(`/board/${boardType}/${boardId}/panel/MusicTrackerTrends`, {
            params: { filters: JSON.stringify(filterWithSongIds) },
        });
        // retrieve the songTrends that got stored before.
        let trendsData = songTrends.data;
        if (trendsData.size !== undefined || reset) {
            trendsData = [];
        }
        // if there is store before add the new trends at the end
        if (dataTrends && dataTrends.metrics) {
            trendsData = trendsData.concat(dataTrends.metrics.songs);
        }
        dispatch({ type: SET_TRENDS, payload: { trends: trendsData } });
    } catch (error) {
        dispatch({ type: SONG_TRENDS_FAILURE, payload: { error } });
    }
};
