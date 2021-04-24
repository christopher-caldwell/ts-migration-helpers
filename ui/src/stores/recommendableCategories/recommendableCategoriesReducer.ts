import { STORE_RECOMMENDABLE_CATEGORIES, HIDE_RECOMMENDABLE_CATEGORIES } from '../actionTypes';

// initializing state of object for data storage
const initialState = {
    recommendableCategories: {},
    showRecommended: false,
    error: null,
};

// calling the the actions for the reducer
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case STORE_RECOMMENDABLE_CATEGORIES:
            return { ...state, recommendableCategories: payload, error: null, showRecommended: true };
        case HIDE_RECOMMENDABLE_CATEGORIES:
            return { ...state, showRecommended: false };
        default:
            return state;
    }
};
