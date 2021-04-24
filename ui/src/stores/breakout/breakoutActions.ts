import request from 'utils/request';

import { REQUEST_BREAKOUT_DATA, UPDATE_BREAKOUT_DETAILS } from '../actionTypes';

export const requestBreakoutData = () => ({ type: REQUEST_BREAKOUT_DATA });

export const updateSongDetails = payload => ({ type: UPDATE_BREAKOUT_DETAILS, payload });

export const getSongDetails = songId => async (dispatch, getState) => {
    dispatch(requestBreakoutData());
    const {
        boardDetails: {
            filters,
            layout: { board },
        },
    } = getState();

    try {
        const response = await request(`/board/RadioBoard/${board.id}/panel/MusicTracker/detail/${songId}`, {
            params: { filters: JSON.stringify(filters.applied) },
        });
        dispatch(updateSongDetails(response));
    } catch (error) {
        console.error(error); // TODO: handle
    }
};
