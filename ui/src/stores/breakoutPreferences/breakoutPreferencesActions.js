import request from 'utils/request';
import { BREAKOUT_PREF_SUCCESS, BREAKOUT_PREF_FAIL } from '../actionTypes';

export const storeBreakoutPrefs = preferenceObj => ({
    type: BREAKOUT_PREF_SUCCESS,
    payload: preferenceObj,
});

export const breakoutPrefsFail = error => ({ type: BREAKOUT_PREF_FAIL, error });

export const getBreakoutPrefs = () => async (dispatch, getState) => {
    const {
        user: { id },
    } = getState();
    try {
        const savedBreakoutPrefs = await request(`/users/${id}/preferences`, { method: 'GET' });
        dispatch(storeBreakoutPrefs(savedBreakoutPrefs.breakouts || {}));
    } catch (error) {
        dispatch(breakoutPrefsFail(error));
    }
};

export const saveBreakoutPrefs = newStationPrefs => async (dispatch, getState) => {
    const {
        breakoutPreferences: { byStation },
        user: { id: userId },
        boardDetails: {
            layout: {
                board: { id: stationId },
            },
        },
    } = getState();

    const newPrefsObj = { ...byStation, [stationId]: newStationPrefs };

    try {
        const options = { method: 'PUT', body: [{ breakouts: newPrefsObj }] };
        await request(`/users/${userId}/preferences`, options);
        dispatch(storeBreakoutPrefs(newPrefsObj));
    } catch (error) {
        dispatch(breakoutPrefsFail(error));
    }
};
