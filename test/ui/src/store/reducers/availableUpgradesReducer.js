import { FIND_UPGRADES } from "../actions/types";
import uniqueCards from '../../data/UniqueCards';

export default (state = [...uniqueCards], action) => {
    switch (action.type){
        case FIND_UPGRADES:
            console.log(action.payload);
            return [...state];
        default:
            return state
    }
}