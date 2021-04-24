import { UPDATE_BREAKOUT_DETAILS, REQUEST_BREAKOUT_DATA } from '../actionTypes';

const initialState = {
    data: {},
    loading: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REQUEST_BREAKOUT_DATA:
            return { ...state, loading: true };
        case UPDATE_BREAKOUT_DETAILS:
            return { ...state, data: payload, loading: false };
        default:
            return state;
    }
};
