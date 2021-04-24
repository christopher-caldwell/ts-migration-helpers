import { CATEGORIES_METADATA_PENDING, CATEGORIES_METADATA_SUCCESS, CATEGORIES_METADATA_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case CATEGORIES_METADATA_PENDING:
            return { ...state, loading: true };
        case CATEGORIES_METADATA_FAILURE:
            return { ...state, loading: false, error };
        case CATEGORIES_METADATA_SUCCESS:
            return { ...state, loading: false, ...payload };
        default:
            return state;
    }
};
