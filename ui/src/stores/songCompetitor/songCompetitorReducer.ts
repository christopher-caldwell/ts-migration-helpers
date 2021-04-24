import {
    SONG_COMPETITOR_SPINS_PENDING,
    SONG_COMPETITOR_SPINS_SUCCESS,
    SONG_COMPETITOR_SPINS_FAILURE,
} from '../actionTypes';

const InitialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = InitialState, action) => {
    switch (action.type) {
        case SONG_COMPETITOR_SPINS_PENDING:
            return { ...state, error: null, loading: true };
        case SONG_COMPETITOR_SPINS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload.competitors,
            };
        case SONG_COMPETITOR_SPINS_FAILURE:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
};
