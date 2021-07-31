import {HIDE_HEADER_MENU, TOGGLE_HEADER} from "../actions/types";
// this reducer both toggles and hides the HEADER MENU based on the action dispatched
export default (state = false, action) => {
    switch (action.type){
        case TOGGLE_HEADER:
            return !state;
        case HIDE_HEADER_MENU:
            return false;
        default:
            return state
    }
}