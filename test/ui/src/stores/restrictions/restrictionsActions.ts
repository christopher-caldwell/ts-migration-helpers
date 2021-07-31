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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
export const fetchHourRestrictions = stationId => async dispatch => {
    try {
        dispatch({ type: RESTRICTION_PENDING });
        const restrictions = await request(`/scheduler/station/${stationId}/restriction`);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
        dispatch({ type: RESTRICTION_SUCCESS, payload: { restrictions } });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
    } catch (error) {
        dispatch({ type: RESTRICTION_FAILURE, payload: { error } });
    }
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
        dispatch(successApproveOverlay());
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
    } catch (error) {
        dispatch({
            type: RESTRICTION_FAILURE,
            payload: { error },
        });
        dispatch(errorApproveOverlay(error));
    }
};

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'media_id' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
export const updateSongsRestriction = (stationId, songs) => async dispatch => {
    try {
        dispatch({ type: RESTRICTION_PENDING });
        const response = await request(`/scheduler/station/${stationId}/song/restriction`, {
            method: 'PUT',
            body: {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'media_id' implicitly has an 'any'... Remove this comment to see the full error message
                songs: songs.map(({ media_id, restriction_id }) => ({
                    media_id,
                    restriction_id,
                })),
            },
        });
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        dispatch({ type: RESTRICTION_SUCCESS, payload: { response } });
        dispatch({ type: STAGE_SONGS_MEDIA, payload: { songs } });
    } catch (error) {
        dispatch({ type: RESTRICTION_FAILURE, payload: { error } });
    }
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
export const updateHourRestrictions = payload => async dispatch => {
    try {
        dispatch(requestOverlay());
        await request(`/scheduler/station/${payload.stationId}/restriction/${payload.id}`, {
            method: 'PUT',
            body: { hours: payload.restrictionHour },
        });
        const enableCallback = false;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        dispatch(successApproveOverlay(enableCallback));
        dispatch({ type: EDIT_RESTRICTION_SUCCESS, payload });
    } catch (error) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        dispatch({
            type: RESTRICTION_FAILURE,
            payload: { error },
        });
        dispatch(errorApproveOverlay(error));
    }
};
