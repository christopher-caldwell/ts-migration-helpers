import {
    REQUEST_OVERLAY,
    SUCCESS_REQUEST_OVERLAY,
    ERROR_REQUEST_OVERLAY,
    SUCCESS_APPROVE_OVERLAY,
    ERROR_APPROVE_OVERLAY,
    SUCCESS_CANCEL_OVERLAY,
    ERROR_CANCEL_OVERLAY,
    CLOSE_OVERLAY,
    OPEN_OVERLAY,
    RESET_ERROR,
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    showOverlay: false,
    showConfirm: false,
};

export default (state = initialState, action: any) => {
    const { type, error, showConfirm } = action;
    switch (type) {
        case CLOSE_OVERLAY:
            return { ...state, showOverlay: false, showConfirm: false };
        case OPEN_OVERLAY:
            return { ...state, showOverlay: true, showConfirm };
        case REQUEST_OVERLAY:
            return { ...state, error: null, loading: true, showOverlay: true };
        case SUCCESS_REQUEST_OVERLAY:
            return {
                ...state,
                error: null,
                loading: false,
                showOverlay: false,
            };
        case ERROR_REQUEST_OVERLAY:
            return {
                ...state,
                error: error.message,
                loading: false,
                showConfirm: false,
            };
        case SUCCESS_APPROVE_OVERLAY:
            return { ...state, error: null, loading: false };
        case ERROR_APPROVE_OVERLAY:
            return { ...state, error, loading: false };
        case SUCCESS_CANCEL_OVERLAY:
            return {
                ...state,
                error: null,
                loading: false,
                showConfirm: false,
            };
        case ERROR_CANCEL_OVERLAY:
            return {
                ...state,
                showConfirm: false,
                error: error.message,
                loading: false,
            };
        case RESET_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};
