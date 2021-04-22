import {
    SIMILAR_STATIONS_PENDING,
    SIMILAR_STATIONS_SUCCESS,
    SIMILAR_STATIONS_FAILURE,
    CLOSE_SIMILAR_STATIONS,
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    docked: false,
    open: false,
    selectedRowIndex: null,
    selectedRow: 0,
    selectedMetricKey: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIMILAR_STATIONS_FAILURE:
            return { ...state, error: action.payload.error, loading: false };
        case SIMILAR_STATIONS_SUCCESS: {
            const { metricDetail, songId, metricKey, selectedRowIndex } = action.payload;
            if (metricDetail) {
                return {
                    ...state,
                    [songId]: { ...state[songId], [metricKey]: metricDetail },
                    docked: true,
                    open: true,
                    selectedRowIndex,
                    selectedRow: songId,
                    selectedMetricKey: metricKey,
                    loading: false,
                };
            }
            return state;
        }
        case SIMILAR_STATIONS_PENDING:
            return { ...state, docked: true, open: true, loading: true };
        case CLOSE_SIMILAR_STATIONS:
            return {
                ...state,
                loading: false,
                docked: false,
                open: false,
                selectedRowIndex: undefined,
                selectedRow: 0,
            };
        default:
            return state;
    }
};
