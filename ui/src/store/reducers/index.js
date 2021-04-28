import { combineReducers } from 'redux';
import authReducer from './authReducer'
import fleetReducer from './fleetsReducer'
import updateNameReducer from './updateNameReducer';
import maxPointsReducer from './maxPointsReducer';
import addShipReducer from './addShipReducer';
import addSquadronReducer from './addSquadronReducer';
import findFaction from './factionReducer';
import toggleHeaderReducer from './toggleHeaderReducer';
import toggleLeftMenuReducer from './toggleLeftMenuReducer';
import currentPointsReducer from './currentPointsReducer';
import findUpgradesReducer from './availableUpgradesReducer';
import flagToggleReducer from './flagToggleReducer';

//defines global store state
export default combineReducers({
    auth: authReducer,
    fleets: fleetReducer,
    fleetName: updateNameReducer,
    maxAllowedPoints: maxPointsReducer,
    chosenSquadrons: addSquadronReducer,
    ships: addShipReducer,
    faction: findFaction,
    headerMenuShown: toggleHeaderReducer,
    leftMenuShown: toggleLeftMenuReducer,
    currentPoints: currentPointsReducer,
    availableUpgrades: findUpgradesReducer,
    flagShown: flagToggleReducer
})