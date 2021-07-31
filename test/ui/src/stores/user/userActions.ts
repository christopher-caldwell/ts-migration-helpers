import isEmpty from 'lodash/isEmpty';

import request from 'utils/request';
import { getDefaultMTPreferences } from 'stores/preferences/preferencesActions';
import { USER_LOGIN, STORE_MUSIC_TRACKER_PREFERENCES } from '../actionTypes';

const loadUser = (payload: any) => async (dispatch: any) => {
    dispatch({ type: USER_LOGIN, payload });
};

const loadUserPreferences = (userId: any) => async (dispatch: any) => {
    const savedPreferences = await request(`/users/${userId}/preferences`, {
        params: { preferenceIds: JSON.stringify([]) },
    });

    // if the incoming music tracker preferences is empty
    // load the default settings from the local file
    const preferences = isEmpty(savedPreferences.musictracker)
        ? {
            ...savedPreferences,
            musictracker: getDefaultMTPreferences(),
            competitors: {},
        }
        : savedPreferences;

    dispatch({
        // store music tracker specific settings in preferences
        type: STORE_MUSIC_TRACKER_PREFERENCES,
        payload: {
            musictracker: preferences.musictracker,
            competitors: preferences.competitors || {},
        },
    });
};

export { loadUser, loadUserPreferences };
