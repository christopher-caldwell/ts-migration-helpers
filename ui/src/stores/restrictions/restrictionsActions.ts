import request from 'utils/request';
import {
    RESTRICTION_PENDING,
    RESTRICTION_SUCCESS,
    RESTRICTION_FAILURE,
    CREATE_RESTRICTION_SUCCESS,
    EDIT_RESTRICTION_SUCCESS,
    STAGE_SONGS_MEDIA,
} from '../actionTypes';
import {
    successApproveOverlay,
    errorApproveOverlay,
    requestOverlay,
} from '../musicTrackerOverlay/musicTrackerOverlayActions';
import { getBoxClosed } from '../box/boxActions';

export const fetchHourRestrictions = stationId => async dispatch => {
    try {
        dispatch({ type: RESTRICTION_PENDING });
        const restrictions = await request(`/scheduler/station/${stationId}/restriction`);
        dispatch({ type: RESTRICTION_SUCCESS, payload: { restrictions } });
    } catch (error) {
        dispatch({ type: RESTRICTION_FAILURE, payload: { error } });
    }
};

export const createHourRestrictions = payload => async dispatch => {
    try {
        dispatch(requestOverlay());
        await request(`/scheduler/station/${payload.stationId}/restriction`, {
            method: 'POST',
            body: {
                name: payload.name,
                hours: payload.restrictionHour,
            },
        });
        dispatch({ type: CREATE_RESTRICTION_SUCCESS, payload });
        dispatch(getBoxClosed(payload.stationId));
        dispatch(successApproveOverlay());
    } catch (error) {
        dispatch({
            type: RESTRICTION_FAILURE,
            payload: { error },
        });
        dispatch(errorApproveOverlay(error));
    }
};

export const updateSongsRestriction = (stationId, songs) => async dispatch => {
    try {
        dispatch({ type: RESTRICTION_PENDING });
        const response = await request(`/scheduler/station/${stationId}/song/restriction`, {
            method: 'PUT',
            body: {
                songs: songs.map(({ media_id, restriction_id }) => ({
                    media_id,
                    restriction_id,
                })),
            },
        });
        dispatch({ type: RESTRICTION_SUCCESS, payload: { response } });
        dispatch({ type: STAGE_SONGS_MEDIA, payload: { songs } });
    } catch (error) {
        dispatch({ type: RESTRICTION_FAILURE, payload: { error } });
    }
};

export const updateHourRestrictions = payload => async dispatch => {
    try {
        dispatch(requestOverlay());
        await request(`/scheduler/station/${payload.stationId}/restriction/${payload.id}`, {
            method: 'PUT',
            body: { hours: payload.restrictionHour },
        });
        const enableCallback = false;
        dispatch(successApproveOverlay(enableCallback));
        dispatch({ type: EDIT_RESTRICTION_SUCCESS, payload });
    } catch (error) {
        dispatch({
            type: RESTRICTION_FAILURE,
            payload: { error },
        });
        dispatch(errorApproveOverlay(error));
    }
};
