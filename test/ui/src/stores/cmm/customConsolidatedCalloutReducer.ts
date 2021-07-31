import { CC_CALLOUT_PENDING, CC_CALLOUT_SUCCESS, CC_CALLOUT_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export default (state = initialState, action: any) => {
    const { type, payload, error } = action;
    switch (type) {
        case CC_CALLOUT_PENDING:
            return { ...state, loading: true };
        case CC_CALLOUT_FAILURE:
            return { ...state, loading: false, error };
        case CC_CALLOUT_SUCCESS:
            return { ...state, loading: false, ...payload };
        default:
            return state;
    }
};
