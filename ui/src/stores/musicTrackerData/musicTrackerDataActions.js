import { setSongs } from 'stores/songs/songsActions';
import { NONE_CATEGORY, MISSING_CATEGORY } from 'utils/constants';

import { getRawStationCategories } from 'stores/categories/categoriesSelectors';
import {
    GET_MUSIC_TRACKER_DATA,
    STORE_STATION_CATEGORY,
    STORE_CATEGORY_DATASET,
    LOADING_CATEGORY_DETAILS,
    CLOSE_CATEGORY_DETAILS,
} from '../actionTypes';

const getMusicTrackerData = () => ({ type: GET_MUSIC_TRACKER_DATA });

const storeStationCategory = (payload) => ({ type: STORE_STATION_CATEGORY, payload });

const loadCategoryDetails = () => ({ type: LOADING_CATEGORY_DETAILS });

const closeCategoryDetails = () => ({ type: CLOSE_CATEGORY_DETAILS });

const storeCategoryDataset = (payload) => ({ type: STORE_CATEGORY_DATASET, payload });

const MTDataActions = {
    initializeStationCategory(boardId, stationCats) {
        return (dispatch, getState) => {
            dispatch(getMusicTrackerData());
            const {
                categoriesMetadata: { data: categoriesData },
                stationCategories: { data: stationCategoriesData },
            } = getState();

            const rawStationCategories =
                categoriesData && stationCategoriesData
                    ? getRawStationCategories(categoriesData, stationCategoriesData)
                    : [];

            const categoriesMap = {};
            const categoriesReadScopeMap = {};
            rawStationCategories.forEach(({ value, label, readOnly }) => {
                categoriesMap[value] = label;
                categoriesReadScopeMap[label] = readOnly;
            });

            categoriesMap.none = NONE_CATEGORY;
            categoriesMap.missing = MISSING_CATEGORY;

            const labeledCategories = rawStationCategories
                .concat({
                    label: NONE_CATEGORY,
                    value: '',
                    description: '',
                    limit: 0,
                })
                .concat({
                    label: MISSING_CATEGORY,
                    value: '',
                    description: '',
                    limit: 0,
                });

            dispatch(
                storeStationCategory({
                    stationCategoriesPermissions: categoriesReadScopeMap,
                    stationCategories: categoriesMap,
                    selectedStationId: boardId,
                    rawStationCategories: labeledCategories,
                })
            );
        };
    },
    loadingCategoryDetails() {
        return (dispatch) => {
            dispatch(loadCategoryDetails());
        };
    },

    closingCategoryDetails() {
        return (dispatch) => {
            dispatch(closeCategoryDetails());
        };
    },

    storingCategoryDataset(rowData) {
        return (dispatch) => {
            dispatch(storeCategoryDataset({ rowData }));
        };
    },

    filterMusicTracker(search) {
        return (dispatch, getState) => {
            const { songs } = getState();

            // Scape special characters. Ex.: \(, \{
            const scapeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(scapeSearch, 'gi');

            const songsData = songs.data.filter(
                (song) => song.metadata.aNm.match(regex) || song.metadata.sNm.match(regex)
            );
            dispatch(setSongs(songsData));
        };
    },
};

export { getMusicTrackerData };
export default MTDataActions;
