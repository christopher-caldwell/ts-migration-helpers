import request from 'utils/request';
import {
    CLEAR_STAGED_CHANGES,
    CLEAR_VERSION_CATEGORIES,
    CLEAR_VERSION_CATEGORIES_SUCCESS,
    CLEAR_VERSION_CATEGORIES_FAILURE,
    CLEAR_CHANGES_UNDONE,
    STAGE_SONGS_MEDIA,
} from '../actionTypes';
import {
    requestOverlay,
    successCancelOverlay,
    errorCancelOverlay,
    successRequestOverlay,
    errorRequestOverlay,
} from '../musicTrackerOverlay/musicTrackerOverlayActions';

export const clearStagedChanges = () => ({ type: CLEAR_STAGED_CHANGES });

export const cancelCategoryChanges = boardId => async dispatch => {
    dispatch(requestOverlay());
    try {
        const response = await request(`/board/RadioBoard/${boardId}/panel/MusicTracker/categories/cancel`, {
            method: 'PUT',
            body: { stationId: boardId },
        });

        if (response.success) {
            dispatch(clearStagedChanges());
            dispatch(successCancelOverlay());
        }

        if (response.errorMessage) throw Error(response.errorMessage);
    } catch (error) {
        dispatch(errorCancelOverlay(error));
    }
};

export const deleteStagedCategories = (stationId, boxId, songs) => async dispatch => {
    try {
        dispatch(requestOverlay());
        dispatch({ type: CLEAR_VERSION_CATEGORIES });
        await request(`/scheduler/station/${stationId}/song/category/${boxId}`, {
            method: 'DELETE',
            body: { songs: songs.map(i => ({ media_id: i.media_id })) },
        });
        dispatch({ type: CLEAR_VERSION_CATEGORIES_SUCCESS });
        dispatch({ type: STAGE_SONGS_MEDIA, payload: { songs } });

        dispatch(successRequestOverlay());
    } catch (error) {
        dispatch({
            type: CLEAR_VERSION_CATEGORIES_FAILURE,
            payload: { error },
        });
        dispatch(errorRequestOverlay(error));
    }
};

export const clearChangesUndone = () => async dispatch => {
    dispatch({ type: CLEAR_CHANGES_UNDONE });
};
