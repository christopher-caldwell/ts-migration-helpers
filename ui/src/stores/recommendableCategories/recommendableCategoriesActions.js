import request from 'utils/request';
import { STORE_RECOMMENDABLE_CATEGORIES, HIDE_RECOMMENDABLE_CATEGORIES } from '../actionTypes';

export const storeRecommendableStationCategory = recommendableCategories => ({
    type: STORE_RECOMMENDABLE_CATEGORIES,
    payload: recommendableCategories,
});

export const hideRecommendableCategories = () => ({
    type: HIDE_RECOMMENDABLE_CATEGORIES,
});

export const getRecommendableCategories = (stationId, startDate) => async dispatch => {
    try {
        // grabbing data from recommendable categories API ending
        const response = await request(`/metadata/station/${stationId}/category/recommendable`, {
            params: { date: startDate },
        });

        return dispatch(storeRecommendableStationCategory(response));
    } catch (error) {
        console.error(error);
    }
};