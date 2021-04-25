import request from 'utils/request';

import { SUCCESS_SONG_METADATA } from '../actionTypes';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentStationId' implicitly has an 'an... Remove this comment to see the full error message
const successSongMetadata = data => ({ type: SUCCESS_SONG_METADATA, payload: data });
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'getState' implicitly has an 'any' type.

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentStationId' implicitly has an 'an... Remove this comment to see the full error message
export const getSongMetadata = (currentStationId, startDate, endDate) => async (dispatch, getState) => {
    try {
        const options = { params: { startDate, endDate } };
        const response = await request(`/metadata/station/${currentStationId}/song`, options);
        return dispatch(successSongMetadata(response));
        // TODO: create new store to house the arrays?
    } catch (error) {
        console.error(error);
    }
};
