import request from 'utils/request';
import { getBoxClosed } from 'stores/box/boxActions';
import {
    successApproveOverlay,
    errorApproveOverlay,
    requestOverlay,
} from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import {
    DAYPART_PENDING,
    DAYPART_SUCCESS,
    DAYPART_FAILURE,
    CREATE_DAYPART_SUCCESS,
    EDIT_DAYPART_SUCCESS,
    STAGE_SONGS_MEDIA,
} from '../actionTypes';

export const fetchStationDayparts = (stationId: any) => async (dispatch: any) => {
    try {
        dispatch({ type: DAYPART_PENDING });
        const dayparts = await request(`/scheduler/station/${stationId}/daypart`);
        dispatch({ type: DAYPART_SUCCESS, payload: { dayparts } });
    } catch (error) {
        dispatch({
            type: DAYPART_FAILURE,
            payload: { error },
        });
    }
};

export const createDaypart = (payload: any) => async (dispatch: any) => {
    try {
        dispatch({ type: DAYPART_PENDING });
        dispatch(requestOverlay());
        await request(`/scheduler/station/${payload.stationId}/daypart`, {
            method: 'POST',
            body: { name: payload.daypartName },
        });
        dispatch({ type: CREATE_DAYPART_SUCCESS, payload });
        dispatch(getBoxClosed(payload.stationId));
        dispatch(successApproveOverlay());
    } catch (error) {
        dispatch({
            type: DAYPART_FAILURE,
            payload: { error },
        });
        dispatch(errorApproveOverlay(error));
    }
};

export const updateDaypart = (payload: any) => async (dispatch: any) => {
    try {
        dispatch({ type: DAYPART_PENDING });
        dispatch(requestOverlay());
        const stagedDayparts = await request(
            `/scheduler/station/${payload.stationId}/daypart/${payload.id}/stage`,
            {
                method: 'PUT',
                body: { hours: payload.hours },
            }
        );
        dispatch({ type: EDIT_DAYPART_SUCCESS, payload: { stagedDayparts } });
        dispatch(successApproveOverlay());
    } catch (error) {
        dispatch({
            type: DAYPART_FAILURE,
            payload: { error },
        });
        dispatch(errorApproveOverlay(error));
    }
};

export const updateSongsAlternateCategory = ({
    stationId,
    songs
}: any) => async (dispatch: any) => {
    try {
        dispatch(requestOverlay());

        await request(`/scheduler/station/${stationId}/song/daypart`, {
            method: 'PUT',
            body: {
                songs: songs.map(({
                    media_id,
                    alternate
                }: any) => ({
                    media_id,
                    alternate,
                })),
            },
        });

        dispatch({ type: STAGE_SONGS_MEDIA, payload: { songs } });
        dispatch(successApproveOverlay());
    } catch (error) {
        dispatch(errorApproveOverlay(error));
    }
};
