import request from 'utils/request';

import { LOAD_SYSTEM_FEATURES, LOAD_STATION_FEATURES } from '../actionTypes';

export const getSystemFeatures = () => (dispatch: any) => {
    request('/features').then(features => {
        dispatch({ type: LOAD_SYSTEM_FEATURES, features });
    });
};

export const getStationFeatures = (stationID: any) => (dispatch: any) => {
    request('/features/access', { params: { stationID } }).then(features => {
        dispatch({ type: LOAD_STATION_FEATURES, features });
    });
};
