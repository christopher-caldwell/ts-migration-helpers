import { BREAKOUT_PREF_FAIL, BREAKOUT_PREF_SUCCESS } from '../actionTypes';

const initialState = {
    error: null,
    byStation: {},
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case BREAKOUT_PREF_SUCCESS:
            return { byStation: payload, error: null };
        case BREAKOUT_PREF_FAIL:
            return { ...state, error };
        default:
            return state;
    }
};
