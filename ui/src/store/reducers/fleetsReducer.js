import { FETCH_SHIPS } from "../actions/types";

export default (state = null, action) => {
    switch (action.type){
        case FETCH_SHIPS:
            return action.payload || false;
        default:
            return state
    }
}