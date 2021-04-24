import request from 'utils/request';
import { getBoxClosed } from 'stores/box/boxActions';
import {
    successApproveOverlay,
    errorApproveOverlay,
    requestOverlay,
} from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import { PACKET_PENDING, PACKET_SUCCESS, PACKET_FAILURE, STAGE_SONGS_MEDIA } from '../actionTypes';

export const fetchStationPackets = stationId => async dispatch => {
    dispatch({ type: PACKET_PENDING });
    try {
        const packets = await request(`/scheduler/station/${stationId}/packet`);
        dispatch({ type: PACKET_SUCCESS, payload: { packets } });
    } catch (error) {
        dispatch({ type: PACKET_FAILURE, payload: { error } });
    }
};

export const createStationPacket = payload => async dispatch => {
    dispatch({ type: PACKET_PENDING });
    try {
        dispatch(requestOverlay());
        await request(`/scheduler/station/${payload.stationId}/packet`, {
            method: 'POST',
            body: { name: payload.packetName },
        });
        dispatch({ type: PACKET_SUCCESS });
        dispatch(fetchStationPackets(payload.stationId));
        dispatch(getBoxClosed(payload.stationId));
        dispatch(successApproveOverlay());
    } catch (error) {
        dispatch({ type: PACKET_FAILURE, payload: { error } });
        dispatch(errorApproveOverlay(error));
    }
};

export const updateSongsPacket = (stationId, songs) => async dispatch => {
    dispatch({ type: PACKET_PENDING });
    try {
        dispatch(requestOverlay());
        const response = await request(`/scheduler/station/${stationId}/song/packet`, {
            method: 'PUT',
            body: {
                songs: songs.map(({ media_id, packet_id }) => ({
                    media_id,
                    packet_id,
                })),
            },
        });
        dispatch({ type: PACKET_SUCCESS, payload: { response } });
        dispatch({ type: STAGE_SONGS_MEDIA, payload: { songs } });
        dispatch(successApproveOverlay());
    } catch (error) {
        dispatch({ type: PACKET_FAILURE, payload: { error } });
        dispatch(errorApproveOverlay(error));
    }
};
