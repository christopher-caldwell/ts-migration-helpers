import { STATION_CATEGORIES_PENDING, STATION_CATEGORIES_SUCCESS, STATION_CATEGORIES_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = initialState, action: any) => {
    const { type, payload, error } = action;
    switch (type) {
        case STATION_CATEGORIES_PENDING:
            return { ...state, loading: true, error: null };
        case STATION_CATEGORIES_FAILURE:
            return { ...state, loading: false, error };
        case STATION_CATEGORIES_SUCCESS:
            return { ...state, loading: false, error: null, ...payload };
        default:
            return state;
    }
};
