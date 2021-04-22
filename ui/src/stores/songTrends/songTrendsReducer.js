import {
    SONG_TRENDS_PENDING,
    SET_TRENDS_COLUMNS,
    SET_TRENDS,
    SONG_TRENDS_FAILURE,
    TOGGLE_TRENDS,
} from '../actionTypes';

const InitialState = {
    loading: false,
    error: null,
    enabled: true,
    data: [],
    columns: [],
};

export default (state = InitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SONG_TRENDS_PENDING:
            return { ...state, loading: true };
        case SONG_TRENDS_FAILURE:
            return { ...state, error: payload.error, loading: false };
        case TOGGLE_TRENDS:
            return { ...state, enabled: !state.enabled };
        case SET_TRENDS:
            return {
                ...state,
                loading: false,
                error: null,
                data: payload.trends,
            };
        case SET_TRENDS_COLUMNS:
            return { ...state, columns: payload };
        default:
            return state;
    }
};
