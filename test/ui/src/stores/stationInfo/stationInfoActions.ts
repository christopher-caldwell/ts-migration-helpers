import request from 'utils/request';

import {
    REQUEST_STATIONS_INFO,
    SUCCESS_STATIONS_INFO,
    FAILURE_STATIONS_INFO,
    SET_CURRENT_STATION,
} from '../actionTypes';

const defaultOptions = {
    params: {
        options: JSON.stringify({}),
        filters: JSON.stringify({}),
    },
};

const requestStationsInfo = () => ({ type: REQUEST_STATIONS_INFO });

const successStationsInfo = (stations: any) => ({
    type: SUCCESS_STATIONS_INFO,
    payload: stations
});

const failureStationsInfo = (error: any) => ({
    type: FAILURE_STATIONS_INFO,
    error
});

export const setCurrentStation = (stationId: any) => ({
    type: SET_CURRENT_STATION,
    payload: stationId
});

export const getStations = (options = defaultOptions) => async (dispatch: any) => {
    dispatch(requestStationsInfo());
    try {
        const stations = await request(`/home/boards/RadioBoard`, options); // TODO: refactor this call
        dispatch(successStationsInfo(stations));
    } catch (error) {
        dispatch(failureStationsInfo(error));
    }
};

// needed when director feature gets developed again
// export const fetchDirectorStations = (userId, filters) => dispatch => {
//     // used for director!
//     dispatch(requestBoardGroups());
//     return request(`/director/${userId}/stations`, {
//         params: {
//             filters: JSON.stringify(filters),
//         },
//     })
//         .then(stations => {
//             dispatch(receiveBoardGroups(stations));
//         })
//         .catch(err => dispatch(throwBoardGroups(err)));
// };
