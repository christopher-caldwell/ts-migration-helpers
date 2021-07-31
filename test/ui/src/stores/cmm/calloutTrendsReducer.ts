import { CALLOUT_TRENDS_PENDING, CALLOUT_TRENDS_SUCCESS, CALLOUT_TRENDS_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
};

export default (state = initialState, action: any) => {
    const { type, payload, error } = action;
    switch (type) {
        case CALLOUT_TRENDS_PENDING:
            return { ...state, loading: true };
        case CALLOUT_TRENDS_SUCCESS:
            return { ...state, loading: false, ...payload };
        case CALLOUT_TRENDS_FAILURE:
            return { ...state, loading: false, error };
        default:
            return state;
    }
};
