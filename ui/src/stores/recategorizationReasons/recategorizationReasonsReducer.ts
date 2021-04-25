import { REQUEST_REASONS, RECEIVE_REASONS, THROW_REASONS } from '../actionTypes';

const initialState = {
    fetchingReasons: false,
    reasons: [],
    errorReasons: null,
};

export default (state = initialState, action: any) => {
    const { type, payload, error } = action;
    switch (type) {
        case REQUEST_REASONS:
            return { ...state, fetchingReasons: true, errorReasons: null };
        case RECEIVE_REASONS:
            return { ...state, fetchingReasons: false, reasons: payload };
        case THROW_REASONS:
            return { ...state, fetchingReasons: false, errorReasons: error };
        default:
            return state;
    }
};
