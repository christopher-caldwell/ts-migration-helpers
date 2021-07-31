import { FETCH_USERS } from "../actions/types";

export default (state = null, action) => {
    switch (action.type){
        case FETCH_USERS:
            return action.payload || false;
        default:
            return state
    }
}