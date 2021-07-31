import { ADD_SHIP } from "../actions/types";
let uniqid = require('uniqid');

export default (state = [], action) => {
    switch (action.type){
        case ADD_SHIP:
            let ship = {...action.payload};
            let chosenShip = {
                name: ship.title,
                points: ship.points,
                id: uniqid(),
                imagePath: `/images/cards/ship/imperial/${ship.image}`,
                upgrades: {...ship.upgrades},
                type: ship.type,
                dual: ship.dual,
                upgradesShown: false,
                size: ship.size
            };
            return [...state, chosenShip];
        default:
            return state
    }
}