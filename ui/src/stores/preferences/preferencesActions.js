import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

import { setTrendsColumns } from 'stores/songTrends/songTrendsActions';
import request from 'utils/request';
import musicTrackerOrder from './musicTrackerSetup';

import {
    LOAD_SETTINGS_DONE,
    LOAD_SETTINGS_START,
    LOAD_SETTINGS_FAIL,
    ON_APPLY,
    OPEN_MODAL,
    CLOSE_MODAL,
} from '../actionTypes';

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const loadSettingsStart = () => ({ type: LOAD_SETTINGS_START });
export const loadSettingsFail = error => ({ type: LOAD_SETTINGS_FAIL, error });

// load the default and sort them in order
export const getDefaultMTPreferences = () => {
    // get the default music tracker table set and use it
    const sortOrder = (a, b) => a.order - b.order;
    return musicTrackerOrder
        .sort(sortOrder)
        .map(group => ({ ...group, items: group.items.sort(sortOrder) }));
};

// this will either load the setup from the user preferences or from the local file system
export const loadSettingsDone = storedPrefs => dispatch => {
    // get the default preferences when the stored preferences is empty or null
    const { musictracker, competitors } = isEmpty(storedPrefs)
        ? getDefaultMTPreferences()
        : storedPrefs;

    dispatch({ type: LOAD_SETTINGS_DONE, payload: { musictracker, competitors } });
    dispatch(setTrendsColumns(musictracker));
};

export const onCancel = () => dispatch => dispatch(closeModal());

export const saveCustomizeGroups = (musictracker, competitors) => async (dispatch, getState) => {
    const { user, boardDetails, preferences } = getState();

    const { id: userId } = user;
    const { id: stationId } = boardDetails.layout.board;
    const stationCompetitors = { ...preferences.competitors, [stationId]: competitors || [] };
    const method = 'PUT';
    const body = [{ musictracker: cloneDeep(musictracker) }, { competitors: stationCompetitors }];

    try {
        // Save the preference on the Database.
        await request(`/users/${userId}/preferences`, { method, body });
        dispatch(setTrendsColumns(musictracker));
        dispatch({
            type: ON_APPLY,
            payload: { musictracker, competitors: stationCompetitors },
        });
        dispatch(closeModal());
    } catch (error) {
        console.error(error);
    }
};
