import { UPDATE_NAME } from "../actions/types";

export default (state = "", action) => {
    switch (action.type){
        case UPDATE_NAME:
            return action.payload;
        default:
            return state
    }
}