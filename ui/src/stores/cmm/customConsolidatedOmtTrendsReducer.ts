import { CC_OMT_TRENDS_PENDING, CC_OMT_TRENDS_SUCCESS, CC_OMT_TRENDS_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case CC_OMT_TRENDS_PENDING:
            return { ...state, loading: true };
        case CC_OMT_TRENDS_SUCCESS:
            return { ...state, loading: false, ...payload };
        case CC_OMT_TRENDS_FAILURE:
            return { ...state, loading: false, error };
        default:
            return state;
    }
};