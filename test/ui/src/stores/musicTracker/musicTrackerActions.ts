import {
    loadSettingsStart,
    loadSettingsFail,
    loadSettingsDone,
} from 'stores/preferences/preferencesActions';
import {
    ON_SET_DATE,
    ON_RESET_FILTER,
    UPDATE_COMPARE_OPTIONS,
    ON_SET_FILTER,
    REMOVE_READ_ONLY_CATEGORIES,
} from '../actionTypes';

export const loadSettings = () => async (dispatch: any, getState: any) => {
    const { preferences } = getState();
    try {
        // competitor logic turned off for now
        dispatch(loadSettingsStart());
        // at this point we assume that user preferences has been loaded already
        const storedPreferences = {
            musictracker: [...preferences.musictracker],
            competitors: { ...preferences.competitors },
        };
        dispatch(loadSettingsDone(storedPreferences));
    } catch (error) {
        console.error(error);
        dispatch(loadSettingsFail(error));
    }
};

export const updateCompareOptions = (compare: any) => ({
    type: UPDATE_COMPARE_OPTIONS,

    // TODO: make this simpler
    payload: compare
});

export const onSetDate = (date: any) => ({
    type: ON_SET_DATE,
    date
});

export const setMusicTrackerFilter = (musicTrackerFilter: any) => ({
    type: ON_SET_FILTER,
    payload: musicTrackerFilter
});

export const resetMusicTrackerFilter = () => ({ type: ON_RESET_FILTER });

export const removeReadOnlyCategories = (newFilter: any) => ({
    type: REMOVE_READ_ONLY_CATEGORIES,
    payload: newFilter
});
