import { REQUEST_BOARDGROUPS, RECEIVE_BOARDGROUPS, COMMIT_BOARDGROUPS, THROW_BOARDGROUPS } from '../actionTypes';

const initialState = {
    retrieving: false,
    data: null,
    error: null,
    objectPath: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BOARDGROUPS:
            return { ...state, retrieving: true, error: null };
        case RECEIVE_BOARDGROUPS:
            return { ...state, retrieving: false, data: action.payload };
        case COMMIT_BOARDGROUPS: {
            const { data } = state;
            const { boardGroupIndex } = action.objectPath;
            const { boardIndex } = action.objectPath;
            data[boardGroupIndex].boards[boardIndex] = action.payload;
            return { ...state, retrieving: false, data };
        }
        case THROW_BOARDGROUPS:
            return { ...state, retrieving: false, error: action.error };
        default:
            return state;
    }
};
