import request from 'utils/request';

import { LOAD_SYSTEM_FEATURES, LOAD_STATION_FEATURES } from '../actionTypes';

export const getSystemFeatures = () => dispatch => {
    request('/features').then(features => {
        dispatch({ type: LOAD_SYSTEM_FEATURES, features });
    });
};

export const getStationFeatures = stationID => dispatch => {
    request('/features/access', { params: { stationID } }).then(features => {
        dispatch({ type: LOAD_STATION_FEATURES, features });
    });
};
