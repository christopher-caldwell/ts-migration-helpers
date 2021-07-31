import request from 'utils/request';

import {
    SIMILAR_STATIONS_PENDING,
    SIMILAR_STATIONS_SUCCESS,
    SIMILAR_STATIONS_FAILURE,
    CLOSE_SIMILAR_STATIONS,
} from '../actionTypes';

export const getMetricDetails = (row: any, rowIndex: any, metricKey: any) => async (dispatch: any, getState: any) => {
    const { boardDetails } = getState();
    const {
        filters,
        layout: {
            board: { id: boardId },
        },
    } = boardDetails;
    const key = metricKey.split(/\.(.+)/)[1];
    dispatch({ type: SIMILAR_STATIONS_PENDING });

    try {
        const metricDetail = await request(
            `/board/RadioBoard/${boardId}/panel/MusicTracker/compare/${row.sId}/metric/${key}`,
            { params: { filters: JSON.stringify(filters.applied) } }
        );
        dispatch({
            type: SIMILAR_STATIONS_SUCCESS,
            payload: {
                metricDetail,
                selectedRowIndex: rowIndex,
                songId: row.sId,
                metricKey,
            },
        });
    } catch (error) {
        dispatch({ type: SIMILAR_STATIONS_FAILURE, payload: { error } });
    }
};

export const closeMetricDetails = () => (dispatch: any) => dispatch({ type: CLOSE_SIMILAR_STATIONS });
