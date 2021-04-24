import { CC_OMT_PENDING, CC_OMT_SUCCESS, CC_OMT_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = initialState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case CC_OMT_PENDING:
            return { ...state, loading: true };
        case CC_OMT_FAILURE:
            return { ...state, loading: false, error };
        case CC_OMT_SUCCESS:
            return { ...state, loading: false, ...payload };
        default:
            return state;
    }
};
