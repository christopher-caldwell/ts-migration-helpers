import {HIDE_LEFT_MENU, LEFT_MENU_TOGGLE} from "../actions/types";
// this reducer both toggles and hides the left menu based on the action dispatched
export default (state = false, action) => {
    switch (action.type){
        case LEFT_MENU_TOGGLE:
            return !state;
        case HIDE_LEFT_MENU:
            return false;
        default:
            return state
    }
}