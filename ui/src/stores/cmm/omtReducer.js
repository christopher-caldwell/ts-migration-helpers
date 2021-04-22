import { OMT_PENDING, OMT_SUCCESS, OMT_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case OMT_PENDING:
            return { ...state, loading: true };
        case OMT_FAILURE:
            return { ...state, loading: false, error };
        case OMT_SUCCESS:
            return { ...state, loading: false, ...payload };
        default:
            return state;
    }
};
