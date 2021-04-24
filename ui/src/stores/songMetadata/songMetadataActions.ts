import request from 'utils/request';

import { SUCCESS_SONG_METADATA } from '../actionTypes';

const successSongMetadata = (data) => ({ type: SUCCESS_SONG_METADATA, payload: data });

export const getSongMetadata = (currentStationId, startDate, endDate) => async (dispatch, getState) => {
    try {
        const options = { params: { startDate: startDate, endDate: endDate } };
        const response = await request(`/metadata/station/${currentStationId}/song`, options);
        return dispatch(successSongMetadata(response));
        // TODO: create new store to house the arrays?
    } catch (error) {
        console.error(error);
    }
};
