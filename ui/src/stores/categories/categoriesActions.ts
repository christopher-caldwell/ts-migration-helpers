import request from 'utils/request';
import MTDataActions from 'stores/musicTrackerData/musicTrackerDataActions';
import {
    CATEGORIES_METADATA_PENDING,
    CATEGORIES_METADATA_SUCCESS,
    CATEGORIES_METADATA_FAILURE,
    STATION_CATEGORIES_PENDING,
    STATION_CATEGORIES_SUCCESS,
    STATION_CATEGORIES_FAILURE,
} from '../actionTypes';

export const getCategoriesMetadata = () => async (dispatch) => {
    dispatch({ type: CATEGORIES_METADATA_PENDING });
    try {
        const categoriesMetadata = await request(`/metadata/category`);
        dispatch({ type: CATEGORIES_METADATA_SUCCESS, payload: { data: categoriesMetadata } });
    } catch (error) {
        dispatch({ type: CATEGORIES_METADATA_FAILURE, payload: { error } });
    }
};

export const getStationCategories = (stationId) => async (dispatch) => {
    dispatch({ type: STATION_CATEGORIES_PENDING });
    try {
        const stationCategories = await request(`/metadata/station/${stationId}/category`);
        dispatch({ type: STATION_CATEGORIES_SUCCESS, payload: { data: stationCategories } });
        dispatch(MTDataActions.initializeStationCategory(stationId, stationCategories));
    } catch (error) {
        dispatch({ type: STATION_CATEGORIES_FAILURE, payload: { error } });
    }
};

export const updateStationCategories = (stationId, categories) => async (dispatch, getState) => {
    dispatch({ type: STATION_CATEGORIES_PENDING });
    try {
        await request(`/metadata/station/${stationId}/category`, {
            method: 'PATCH',
            body: {
                categories,
            },
        });
        const {
            stationCategories: { data: stationCategoriesData },
        } = getState();

        const stationCategoriesListUpdated = {};
        Object.keys(stationCategoriesData || {}).forEach((categoryId) => {
            const categoryChanged = categories.find((item) => Number(item.categoryId) === Number(categoryId));
            stationCategoriesListUpdated[categoryId] = {
                ...stationCategoriesData[categoryId],
                limit: categoryChanged ? categoryChanged.limit : stationCategoriesData[categoryId].limit,
            };
        });

        dispatch({
            type: STATION_CATEGORIES_SUCCESS,
            payload: { data: stationCategoriesListUpdated },
        });
        dispatch(MTDataActions.initializeStationCategory(stationId));
    } catch (error) {
        dispatch({ type: STATION_CATEGORIES_FAILURE, payload: { error } });
    }
};
