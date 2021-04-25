import { STORE_BOARD_METADATA, RECEIVE_BOARD_METADATA } from '../actionTypes';

const receiveDateIntegrity = () => ({ type: RECEIVE_BOARD_METADATA });

const storeDateIntegrity = (payload: any) => ({
    type: STORE_BOARD_METADATA,
    payload
});

export const requestDateIntegrity = () => (dispatch: any) => dispatch(receiveDateIntegrity());

export const updateDateIntegrity = (params: any) => (dispatch: any) => {
    dispatch(requestDateIntegrity());
    dispatch(storeDateIntegrity(params));
};
