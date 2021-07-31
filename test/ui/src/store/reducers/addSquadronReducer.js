import { ADD_SQUADRON } from "../actions/types";
let uniqid = require('uniqid');

export default (state = [], action) => {
    switch (action.type){
        case ADD_SQUADRON:
            let squadron = {...action.payload};
            let chosenSquadron = {
                name: squadron.title,
                points: squadron.points,
                id: uniqid(),
                imagePath: `/images/cards/ship/imperial/${squadron.image}`,
                keywords: squadron.keywords,
                unique: squadron.unique,
                type: squadron.type
            };
            return [...state, chosenSquadron];
        default:
            return state
    }
}