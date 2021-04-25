import { SET_HOSTINFO } from '../actionTypes';

const initialState = {
    pollerEnabled: false,
    stationHostType: null,
};

export default (state = initialState, action: any) => {
    const { payload } = action;
    switch (action.type) {
        case SET_HOSTINFO:
            return {
                ...state,
                pollerEnabled: payload.sync_poller_enabled,
                stationHostType: payload.type,
            };
        default:
            return state;
    }
};
