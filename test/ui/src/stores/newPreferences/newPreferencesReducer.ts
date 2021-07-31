import { SUCCESS_TABLE_PREFERENCES } from '../actionTypes';

const initialState = {
    tablePreferences: {},
    error: false,
};

export default (state = initialState, {
    type,
    payload
}: any) => {
    switch (type) {
        case SUCCESS_TABLE_PREFERENCES:
            return { ...state, tablePreferences: payload };
        default:
            return state;
    }
};
