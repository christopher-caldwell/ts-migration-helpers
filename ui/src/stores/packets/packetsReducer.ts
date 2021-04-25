import { PACKET_PENDING, PACKET_SUCCESS, PACKET_FAILURE } from '../actionTypes';

const InitialState = {
    error: null,
    data: [],
    retrieving: false,
};

export default (state = InitialState, action: any) => {
    const { payload } = action;
    switch (action.type) {
        case PACKET_PENDING:
            return { ...state, retrieving: true, error: null };
        case PACKET_SUCCESS:
            return {
                ...state,
                retrieving: false,
                error: null,
                data: payload && payload.packets ? payload.packets : state.data,
            };
        case PACKET_FAILURE:
            return { ...state, retrieving: false, error: payload.error };
        default:
            return state;
    }
};
