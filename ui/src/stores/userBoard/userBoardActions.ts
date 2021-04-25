import request from 'utils/request';

import { FETCH_ALL_TEAMS_SUCCESS, FETCH_ALL_USERS_SUCCESS, USERS_LOADING } from '../actionTypes';

export const fetchAllTeamsSuccess = (payload: any) => ({
    type: FETCH_ALL_TEAMS_SUCCESS,
    payload
});

export const fetchAllUsersLoading = () => ({ type: USERS_LOADING });

export const fetchAllUsersSuccess = (payload: any) => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload
});

export const fetchAllTeams = () => (dispatch: any) => request('/admin/teams').then(response => dispatch(fetchAllTeamsSuccess(response)));

export const fetchAllUsers = () => (dispatch: any) => {
    dispatch(fetchAllUsersLoading());
    request('/admin/users').then(response => dispatch(fetchAllUsersSuccess(response)));
};

export const saveNewTeamsToUser = (userId: any, teams = []) => (dispatch: any) => {
    dispatch(fetchAllUsersLoading());
    return request(`/admin/users/${userId}/teams`, {
        method: 'PUT',
        body: { teams },
    })
        .then(() => dispatch(fetchAllUsers()))
        .catch(error => console.error(error));
};

export const saveNewPermissionsToTeam = (method: any, team: any) => (dispatch: any) => request(`/admin/teams/${team.teamId}`, { method, body: { team } })
    .then(() => dispatch(fetchAllTeams()))
    .catch(error => console.error(error));

export const createNewTeam = (method: any, team: any) => (dispatch: any) => request('/admin/teams', { method, body: { team } })
    .then(() => dispatch(fetchAllTeams()))
    .catch(error => console.error(error));
