import { FETCH_ALL_USERS_SUCCESS, FETCH_ALL_TEAMS_SUCCESS, USERS_LOADING } from '../actionTypes';

const initialState = {
    allUsers: [],
    allTeams: [],
    loading: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ALL_USERS_SUCCESS:
            return { ...state, allUsers: payload, loading: false };
        case FETCH_ALL_TEAMS_SUCCESS:
            return { ...state, allTeams: payload };
        case USERS_LOADING:
            return { ...state, loading: true };
        default:
            return state;
    }
};
