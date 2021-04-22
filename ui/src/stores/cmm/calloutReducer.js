import { CALLOUT_PENDING, CALLOUT_SUCCESS, CALLOUT_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case CALLOUT_PENDING:
            return { ...state, loading: true };
        case CALLOUT_FAILURE:
            return { ...state, loading: false, error };
        case CALLOUT_SUCCESS:
            return { ...state, loading: false, ...payload };
        default:
            return state;
    }
};
