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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
export const getCategoriesMetadata = () => async dispatch => {
    dispatch({ type: CATEGORIES_METADATA_PENDING });
    try {
        const categoriesMetadata = await request(`/metadata/category`);
        dispatch({ type: CATEGORIES_METADATA_SUCCESS, payload: { data: categoriesMetadata } });
    } catch (error) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
        dispatch({ type: CATEGORIES_METADATA_FAILURE, payload: { error } });
    }
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
export const getStationCategories = stationId => async dispatch => {
    dispatch({ type: STATION_CATEGORIES_PENDING });
    try {
        const stationCategories = await request(`/metadata/station/${stationId}/category`);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
        dispatch({ type: STATION_CATEGORIES_SUCCESS, payload: { data: stationCategories } });
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
        dispatch(MTDataActions.initializeStationCategory(stationId, stationCategories));
    } catch (error) {
        dispatch({ type: STATION_CATEGORIES_FAILURE, payload: { error } });
    }
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationId' implicitly has an 'any' type... Remove this comment to see the full error message
export const updateStationCategories = (stationId, categories) => async (dispatch, getState) => {
    dispatch({ type: STATION_CATEGORIES_PENDING });
    try {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        await request(`/metadata/station/${stationId}/category`, {
            method: 'PATCH',
            body: {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                categories,
            },
        });
        const {
            stationCategories: { data: stationCategoriesData },
        } = getState();

        const stationCategoriesListUpdated = {};
        Object.keys(stationCategoriesData || {}).forEach(categoryId => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            const categoryChanged = categories.find(item => Number(item.categoryId) === Number(categoryId));
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            stationCategoriesListUpdated[categoryId] = {
                ...stationCategoriesData[categoryId],
                limit: categoryChanged ? categoryChanged.limit : stationCategoriesData[categoryId].limit,
            };
        });

        dispatch({
            type: STATION_CATEGORIES_SUCCESS,
            payload: { data: stationCategoriesListUpdated },
        });
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        dispatch(MTDataActions.initializeStationCategory(stationId));
    } catch (error) {
        dispatch({ type: STATION_CATEGORIES_FAILURE, payload: { error } });
    }
};
