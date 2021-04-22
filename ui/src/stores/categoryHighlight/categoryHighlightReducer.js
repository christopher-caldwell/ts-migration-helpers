import { DEHIGHLIGHT_CATEGORY_VERSION, HIGHLIGHT_CATEGORY_VERSION } from '../actionTypes';

const initialState = {
    data: {},
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case HIGHLIGHT_CATEGORY_VERSION:
            return { ...state, data: payload };
        case DEHIGHLIGHT_CATEGORY_VERSION:
            return { ...state, data: {} };
        default:
            return state;
    }
};
