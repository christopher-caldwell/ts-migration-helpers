import request from 'utils/request';
import {
    CALLOUT_PENDING,
    CALLOUT_SUCCESS,
    CALLOUT_FAILURE,
    OMT_PENDING,
    OMT_SUCCESS,
    OMT_FAILURE,
    CC_CALLOUT_PENDING,
    CC_CALLOUT_SUCCESS,
    CC_CALLOUT_FAILURE,
    CC_OMT_PENDING,
    CC_OMT_SUCCESS,
    CC_OMT_FAILURE,
    CALLOUT_TRENDS_PENDING,
    CALLOUT_TRENDS_SUCCESS,
    CALLOUT_TRENDS_FAILURE,
    OMT_TRENDS_PENDING,
    OMT_TRENDS_SUCCESS,
    OMT_TRENDS_FAILURE,
    CC_CALLOUT_TRENDS_PENDING,
    CC_CALLOUT_TRENDS_SUCCESS,
    CC_CALLOUT_TRENDS_FAILURE,
    CC_OMT_TRENDS_PENDING,
    CC_OMT_TRENDS_SUCCESS,
    CC_OMT_TRENDS_FAILURE,
} from '../actionTypes';

const CALLOUT_PROJECT_TYPE = 'CALLOUT';
const OMT_PROJECT_TYPE = 'OMT';
const CUSTOM_CALLOUT_PROJECT_TYPE = 'CUSTOM_CONSOLIDATED_CALLOUT';
const CUSTOM_OMT_PROJECT_TYPE = 'CUSTOM_CONSOLIDATED_OMT';

const getCmmData = (stationId, projectType, startDate, endDate) => {
    return request(
        `/research/station/${stationId}/cmm?projectType=${projectType}&startDate=${startDate}&endDate=${endDate}`
    );
};

const getCmmTrends = (stationId, projectType, startDate, endDate) => {
    return request(
        `/research/station/${stationId}/cmm/trends?projectType=${projectType}&startDate=${startDate}&endDate=${endDate}`
    );
};

export const getCalloutData = (currentStationId, startDate, endDate) => async (dispatch, getState) => {
    dispatch({ type: CALLOUT_PENDING });
    // TODO: the startDate and endDate parameters will be fetch from the state as well
    try {
        const data = await getCmmData(currentStationId, CALLOUT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: CALLOUT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CALLOUT_FAILURE, payload: { error } });
    }
};

export const getOmtData = (stationId, startDate, endDate) => async dispatch => {
    dispatch({ type: OMT_PENDING });
    try {
        const data = await getCmmData(stationId, OMT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: OMT_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: OMT_FAILURE, payload: { error } });
    }
};

export const getCustomConsolidatedCalloutData = (stationId, startDate, endDate) => async dispatch => {
    dispatch({ type: CC_CALLOUT_PENDING });
    try {
        const data = await getCmmData(stationId, CUSTOM_CALLOUT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: CC_CALLOUT_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: CC_CALLOUT_FAILURE, payload: { error } });
    }
};

export const getCustomConsolidatedOmtData = (stationId, startDate, endDate) => async dispatch => {
    dispatch({ type: CC_OMT_PENDING });
    try {
        const data = await getCmmData(stationId, CUSTOM_OMT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: CC_OMT_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: CC_OMT_FAILURE, payload: { error } });
    }
};

export const getCalloutTrends = (currentStationId, startDate, endDate) => async (dispatch, getState) => {
    dispatch({ type: CALLOUT_TRENDS_PENDING });
    try {
        const trends = await getCmmTrends(currentStationId, CALLOUT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: CALLOUT_TRENDS_SUCCESS, payload: trends });
    } catch (error) {
        dispatch({ type: CALLOUT_TRENDS_FAILURE, payload: { error } });
    }
};

export const getOmtTrends = (stationId, startDate, endDate) => async dispatch => {
    dispatch({ type: OMT_TRENDS_PENDING });
    try {
        const data = await getCmmTrends(stationId, OMT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: OMT_TRENDS_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: OMT_TRENDS_FAILURE, payload: { error } });
    }
};

export const getCustomConsolidatedCalloutTrends = (stationId, startDate, endDate) => async dispatch => {
    dispatch({ type: CC_CALLOUT_TRENDS_PENDING });
    try {
        const data = await getCmmTrends(stationId, CUSTOM_CALLOUT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: CC_CALLOUT_TRENDS_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: CC_CALLOUT_TRENDS_FAILURE, payload: { error } });
    }
};

export const getCustomConsolidatedOmtTrends = (stationId, startDate, endDate) => async dispatch => {
    dispatch({ type: CC_OMT_TRENDS_PENDING });
    try {
        const data = await getCmmTrends(stationId, CUSTOM_OMT_PROJECT_TYPE, startDate, endDate);
        dispatch({ type: CC_OMT_TRENDS_SUCCESS, payload: { data } });
    } catch (error) {
        dispatch({ type: CC_OMT_TRENDS_FAILURE, payload: { error } });
    }
};
