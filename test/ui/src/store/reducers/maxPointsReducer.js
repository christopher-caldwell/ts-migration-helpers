import { MAX_POINTS } from "../actions/types";

export default (state = 400, action) => {
    switch (action.type){
        case MAX_POINTS:
            return action.payload;
        default:
            return state
    }
}