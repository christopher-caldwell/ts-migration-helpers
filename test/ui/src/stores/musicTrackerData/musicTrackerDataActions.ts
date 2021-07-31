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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
const storeStationCategory = payload => ({ type: STORE_STATION_CATEGORY, payload });

const loadCategoryDetails = () => ({ type: LOADING_CATEGORY_DETAILS });

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
const closeCategoryDetails = () => ({ type: CLOSE_CATEGORY_DETAILS });

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardId' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'getState' implicitly has an 'any' type.
const storeCategoryDataset = payload => ({ type: STORE_CATEGORY_DATASET, payload });

const MTDataActions = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardId' implicitly has an 'any' type.
    initializeStationCategory(boardId, stationCats) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        return (dispatch, getState) => {
            dispatch(getMusicTrackerData());
            const {
                categoriesMetadata: { data: categoriesData },
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
                stationCategories: { data: stationCategoriesData },
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            } = getState();

            const rawStationCategories =
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                categoriesData && stationCategoriesData
                    ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'none' does not exist on type '{}'.
                      getRawStationCategories(categoriesData, stationCategoriesData)
                    : [];

            const categoriesMap = {};
            const categoriesReadScopeMap = {};
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
            rawStationCategories.forEach(({ value, label, readOnly }) => {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                categoriesMap[value] = label;
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                categoriesReadScopeMap[label] = readOnly;
            });

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'none' does not exist on type '{}'.
            categoriesMap.none = NONE_CATEGORY;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'missing' does not exist on type '{}'.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rowData' implicitly has an 'any' type.
            categoriesMap.missing = MISSING_CATEGORY;

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
            const labeledCategories = rawStationCategories
                .concat({
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'search' implicitly has an 'any' type.
                    label: NONE_CATEGORY,
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
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
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        return dispatch => {
            dispatch(loadCategoryDetails());
        };
    },

    closingCategoryDetails() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        return dispatch => {
            dispatch(closeCategoryDetails());
        };
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rowData' implicitly has an 'any' type.
    storingCategoryDataset(rowData) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        return dispatch => {
            dispatch(storeCategoryDataset({ rowData }));
        };
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'search' implicitly has an 'any' type.
    filterMusicTracker(search) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        return (dispatch, getState) => {
            const { songs } = getState();

            // Scape special characters. Ex.: \(, \{
            const scapeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(scapeSearch, 'gi');

            const songsData = songs.data.filter(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                song => song.metadata.aNm.match(regex) || song.metadata.sNm.match(regex)
            );
            dispatch(setSongs(songsData));
        };
    },
};

export { getMusicTrackerData };
export default MTDataActions;
