import {
    LOAD_SETTINGS_DONE,
    LOAD_SETTINGS_START,
    LOAD_SETTINGS_FAIL,
    ON_APPLY,
    OPEN_MODAL,
    CLOSE_MODAL,
    STORE_MUSIC_TRACKER_PREFERENCES,
} from '../actionTypes';

const initialState = {
    loading: true,
    musictracker: [],
    competitors: {},
    show: false,
    error: null,
};

export default (state = initialState, action: any) => {
    const { type, error, payload } = action;
    switch (type) {
        case OPEN_MODAL:
            return { ...state, show: true };
        case CLOSE_MODAL:
            return { ...state, show: false };
        case LOAD_SETTINGS_START:
            return { ...state, loading: true };
        case LOAD_SETTINGS_FAIL:
            return { ...state, loading: false, error: error.message };
        case LOAD_SETTINGS_DONE:
            return {
                ...state,
                loading: false,
                error: null,
                musictracker: payload.musictracker,
                competitors: payload.competitors,
            };
        case ON_APPLY:
            return {
                ...state,
                musictracker: payload.musictracker, // array of column groups
                competitors: { ...state.competitors, ...payload.competitors },
            };
        case STORE_MUSIC_TRACKER_PREFERENCES:
            return { ...state, ...payload, loading: false };
        default:
            return state;
    }
};
