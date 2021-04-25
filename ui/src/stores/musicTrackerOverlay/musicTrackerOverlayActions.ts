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

export const requestOverlay = () => ({ type: REQUEST_OVERLAY });

export const successRequestOverlay = () => ({ type: SUCCESS_REQUEST_OVERLAY });

export const errorRequestOverlay = (error: any) => ({
    type: ERROR_REQUEST_OVERLAY,
    error
});

export const successApproveOverlay = () => ({ type: SUCCESS_APPROVE_OVERLAY });

export const errorApproveOverlay = (error: any) => ({
    type: ERROR_APPROVE_OVERLAY,
    error
});

export const successCancelOverlay = () => ({ type: SUCCESS_CANCEL_OVERLAY });

export const errorCancelOverlay = (error: any) => ({
    type: ERROR_CANCEL_OVERLAY,
    error
});

export const closeOverlay = () => ({ type: CLOSE_OVERLAY });

export const openOverlay = (showConfirm: any) => ({
    type: OPEN_OVERLAY,
    showConfirm
});

export const resetError = () => ({ type: RESET_ERROR });
