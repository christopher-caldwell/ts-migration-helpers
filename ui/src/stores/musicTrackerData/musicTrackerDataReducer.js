import {
    GET_MUSIC_TRACKER_DATA,
    STORE_STATION_CATEGORY,
    STORE_CATEGORY_DATASET,
    LOADING_CATEGORY_DETAILS,
    CLOSE_CATEGORY_DETAILS,
} from '../actionTypes';

const initialState = {
    songDetail: {
        showDetail: false,
        loading: false,
        details: {},
        selectedSongId: 0,
    },
    categoryDetails: {
        stationCategories: {},
        stationCategoriesPermissions: {},
        rowData: {},
        showCategory: false,
        loading: false,
    },
    loading: true,
};

export default (state = initialState, action = {}) => {
    const payload = action.payload || {}; // TODO: take this out
    const {
        stationCategories,
        stationCategoriesPermissions,
        selectedStationId,
        rawStationCategories,
        rowData,
    } = payload;
    switch (action.type) {
        case GET_MUSIC_TRACKER_DATA:
            return { ...state, loading: payload.loading };
        case STORE_STATION_CATEGORY:
            if (stationCategories) {
                return {
                    ...state,
                    categoryDetails: {
                        ...state.categoryDetails,
                        stationCategories,
                        stationCategoriesPermissions,
                        rawStationCategories,
                        selectedStationId,
                    },
                };
            }
            return state;
        case STORE_CATEGORY_DATASET:
            return {
                ...state,
                categoryDetails: {
                    ...state.categoryDetails,
                    rowData,
                    loading: false,
                },
            };
        case LOADING_CATEGORY_DETAILS:
            return {
                ...state,
                categoryDetails: {
                    ...state.categoryDetails,
                    showCategory: true,
                    loading: true,
                },
            };
        case CLOSE_CATEGORY_DETAILS:
            return {
                ...state,
                categoryDetails: {
                    ...state.categoryDetails,
                    daypartCategories: {},
                    rowData: {},
                    showCategory: false,
                    loading: false,
                },
            };
        default:
            return state;
    }
};
