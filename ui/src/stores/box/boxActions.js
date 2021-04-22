import request from 'utils/request';
import {
    requestOverlay,
    successCancelOverlay,
    errorCancelOverlay,
} from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import {
    DAYPART_UPDATE_STAGED_DATA,
    CLEAR_STAGED_DAYPART_CHANGES,
    RESTRICTION_UPDATE_STAGED_DATA,
    CLEAR_STAGED_RESTRICTION_CHANGES,
    CLEAR_STAGED_CHANGES,
    BOX_PENDING,
    BOX_CLEARED_SUCCESS,
    BOX_FAILURE,
    BOX_OPEN_SUCCESS,
    BOX_CLOSED_SUCCESS,
} from '../actionTypes';

export const clearBox = stationId => async dispatch => {
    dispatch(requestOverlay());
    dispatch({ type: BOX_PENDING });
    try {
        const response = await request(`/scheduler/station/${stationId}/box`, {
            method: 'DELETE',
        });

        dispatch({ type: CLEAR_STAGED_CHANGES });
        dispatch({ type: CLEAR_STAGED_RESTRICTION_CHANGES });
        dispatch({ type: CLEAR_STAGED_DAYPART_CHANGES });
        dispatch({ type: BOX_CLEARED_SUCCESS });
        dispatch(successCancelOverlay());

        if (response.errorMessage) throw Error(response.errorMessage);
    } catch (error) {
        dispatch(errorCancelOverlay(error));
        dispatch({ type: BOX_FAILURE, payload: { error } });
    }
};

export const getBox = stationId => async dispatch => {
    dispatch({ type: BOX_PENDING });
    try {
        const boxData = await request(`/scheduler/station/${stationId}/box/open`);
        dispatch({ type: BOX_OPEN_SUCCESS, payload: { boxData } });
        dispatch({
            type: RESTRICTION_UPDATE_STAGED_DATA,
            payload: boxData.templates.hour_restriction,
        });
        dispatch({
            type: DAYPART_UPDATE_STAGED_DATA,
            payload: boxData.templates.daypart,
        });
    } catch (error) {
        dispatch({ type: BOX_FAILURE, payload: { error } });
    }
};

export const getBoxClosed = stationId => async dispatch => {
    dispatch({ type: BOX_PENDING });
    try {
        const boxClosedData = await request(`/scheduler/station/${stationId}/box/closed`);
        dispatch({ type: BOX_CLOSED_SUCCESS, payload: { boxClosedData } });
    } catch (error) {
        dispatch({ type: BOX_FAILURE, payload: { error } });
    }
};

// todo: migrate all logic of aproveChanges here
export const approveBox = () => {};
