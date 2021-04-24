import { STORE_BOARD_METADATA, RECEIVE_BOARD_METADATA } from '../actionTypes';

const receiveDateIntegrity = () => ({ type: RECEIVE_BOARD_METADATA });

const storeDateIntegrity = payload => ({ type: STORE_BOARD_METADATA, payload });

export const requestDateIntegrity = () => dispatch => dispatch(receiveDateIntegrity());

export const updateDateIntegrity = params => dispatch => {
    dispatch(requestDateIntegrity());
    dispatch(storeDateIntegrity(params));
};
