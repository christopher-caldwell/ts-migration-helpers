import {FIND_FACTION} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type){
        case FIND_FACTION:
            return action.payload;
        default:
            return state
    }
}