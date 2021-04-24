import request from '../../utils/request';
import { SET_HOSTINFO } from '../actionTypes';

export const getHostInformation = stationId => async dispatch => {
    try {
        const hostInfo = await request(`/scheduler/station/${stationId}/hostInfo`);
        if (hostInfo && !hostInfo.errorMessage) {
            return dispatch({ type: SET_HOSTINFO, payload: hostInfo });
        }
        throw new Error(hostInfo.errorMessage);
    } catch (e) {
        console.error(e);
    }
};
