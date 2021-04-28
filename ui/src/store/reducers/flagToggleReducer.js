import {FLAG_TOGGLE, SHOW_FLAG} from "../actions/types";

export default (state = false, action) => {
    switch (action.type) {
        case FLAG_TOGGLE:
            return false;
        case SHOW_FLAG:
            return true;
        default: return state
    }
}