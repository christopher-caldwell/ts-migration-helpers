import {
    REQUEST_STATIONS_INFO,
    SUCCESS_STATIONS_INFO,
    FAILURE_STATIONS_INFO,
    SET_CURRENT_STATION,
} from '../actionTypes';

const initialState = {
    loading: false,
    data: {},
    currentStationId: null,
    error: false,
};

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
        case REQUEST_STATIONS_INFO:
            return { ...state, loading: true };
        case SUCCESS_STATIONS_INFO:
            return { ...state, loading: false, error: false, data: payload };
        case FAILURE_STATIONS_INFO:
            return { ...state, loading: false, error };
        case SET_CURRENT_STATION:
            return { ...state, currentStationId: payload };
        default:
            return state;
    }
};
