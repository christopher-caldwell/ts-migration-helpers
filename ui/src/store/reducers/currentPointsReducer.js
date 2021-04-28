import { CURRENT_POINTS } from '../actions/types';

export default (state = 0, action) => {
    switch(action.type) {
        case CURRENT_POINTS:
            let currentPoints = state + action.payload;
            return currentPoints;
        default:
            return state
    }
};