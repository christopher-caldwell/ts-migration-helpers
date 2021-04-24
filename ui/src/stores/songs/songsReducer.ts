import { SONGS_PENDING, SONGS_FAILURE, SET_SONGS } from '../actionTypes';

const InitialState = {
    loading: false,
    error: null,
    data: [],
    count: 0,
};

export default (state = InitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SONGS_PENDING:
            return { ...state, error: null, loading: true };
        case SONGS_FAILURE:
            return { ...state, error: payload.error, loading: false };
        case SET_SONGS:
            return {
                ...state,
                loading: false,
                data: payload.songs,
                count: payload.songs.length,
            };
        default:
            return state;
    }
};
