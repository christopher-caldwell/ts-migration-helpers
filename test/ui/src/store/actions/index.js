import axios from 'axios';
import {
    FETCH_USERS,
    FETCH_SHIPS,
    UPDATE_NAME,
    MAX_POINTS,
    FIND_FACTION,
    TOGGLE_HEADER,
    LEFT_MENU_TOGGLE,
    HIDE_LEFT_MENU,
    HIDE_HEADER_MENU,
    ADD_SHIP,
    ADD_SQUADRON,
    CURRENT_POINTS,
    FIND_UPGRADES,
    FLAG_TOGGLE,
    SHOW_FLAG
} from "./types";


export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/api/user");
    dispatch({type: FETCH_USERS, payload: res.data})
};

export const fetchFleet = () => async (dispatch) => {
    const res = await axios.get("/api/fleets").catch(error => {console.log(error)});
    dispatch({type: FETCH_SHIPS, payload: res.data})
};

// incoming data comes in first arg
export const updateName = name => dispatch => {
    dispatch({type: UPDATE_NAME, payload: name})
};

export const maxPoints = points => dispatch => {
    dispatch({type: MAX_POINTS, payload: points})
};

export const addShip = updatedSelectedShips => dispatch => {
    dispatch({type: ADD_SHIP, payload: updatedSelectedShips})
};

export const addSquad = selectedSquadron => dispatch => {
  dispatch({type: ADD_SQUADRON, payload:selectedSquadron})
};

export const findFaction = faction => dispatch => {
    dispatch({type: FIND_FACTION, payload: faction})
};
export const toggleLeftMenu = () => dispatch => {
    dispatch({type: LEFT_MENU_TOGGLE})
};
export const toggleHeaderMenu = () => dispatch => {
    dispatch({type: TOGGLE_HEADER})
};

export const hideLeftMenu = () => dispatch => {
    dispatch({type: HIDE_LEFT_MENU})
};
export const hideHeaderMenu = () => dispatch => {
    dispatch({type: HIDE_HEADER_MENU})
};
export const currentPoints = ship => dispatch => {
    dispatch({type: CURRENT_POINTS, payload: ship.points})
};
export const findUpgrades = card => dispatch => {
    dispatch({type: FIND_UPGRADES, payload: card})
};
export const flagToggle = () => dispatch => {
    dispatch({type: FLAG_TOGGLE})
};
export const showFlag = () => dispatch => {
    dispatch({type: SHOW_FLAG})
};
