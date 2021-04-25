import isEmpty from 'lodash/isEmpty';

import request from 'utils/request';
import { loadVersions } from 'stores/songs/songsActions';
import { fetchStationPackets } from 'stores/packets/packetsActions';
import { fetchHourRestrictions } from 'stores/restrictions/restrictionsActions';
import { fetchStationDayparts } from 'stores/dayparts/daypartsActions';
import {
    requestOverlay,
    successRequestOverlay,
    errorRequestOverlay,
    successApproveOverlay,
    errorApproveOverlay,
} from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import { clearStagedChanges } from 'stores/songVersions/songVersionsActions';
import { getBoxClosed, getBox } from 'stores/box/boxActions';

import {
    CLEAR_STAGED_RESTRICTION_CHANGES,
    CLEAR_STAGED_DAYPART_CHANGES,
    STAGE_SONGS_MEDIA,
} from '../actionTypes';

// TODO: no reducer with these actions => move to better place
export const saveChanges = (changedSongs: any, id: any) => async (dispatch: any) => {
    if (changedSongs && Object.keys(changedSongs).length < 1) return;
    dispatch(requestOverlay());

    try {
        const saveCategoryChanges = changedSongs
            .map((version: any) => ({
            song_id: version.sId,
            category_id: !isEmpty(version.category) ? version.category.id : 'None',
            category_name: !isEmpty(version.category) ? version.category.name : 'None',
            media_id: version.media_id,
            version_name: version.version_name || ''
        }))
            .filter((song: any) => song.category_id !== 'None');
        const response = await request(
            `/board/RadioBoard/${id}/panel/MusicTracker/categories/update`,
            {
                method: 'PUT',
                body: { stationId: id, entries: saveCategoryChanges },
            }
        );

        if (!response.success) throw Error(response.errorMessage || response.error);

        dispatch({ type: STAGE_SONGS_MEDIA, payload: { songs: changedSongs } });
        dispatch(getBox(id));
        dispatch(successRequestOverlay());
    } catch (error) {
        console.error(error);
        dispatch(errorRequestOverlay(error));
    }
};

export const approveBox = (id: any) => async (dispatch: any, getState: any) => {
    dispatch(requestOverlay());
    const {
        boardDetails: { filters },
    } = getState();
    try {
        const response = await request(`/board/RadioBoard/${id}/panel/MusicTracker/box/approve`, {
            method: 'PUT',
        });

        if (!response.success) throw Error(response.errorMessage || response.error);

        dispatch({ type: CLEAR_STAGED_RESTRICTION_CHANGES }); // resets staged restrictions
        dispatch({ type: CLEAR_STAGED_DAYPART_CHANGES }); // resets staged dayparts
        dispatch(clearStagedChanges()); // resets staged songs in redux
        dispatch(fetchStationPackets(id));
        dispatch(fetchHourRestrictions(id));
        dispatch(fetchStationDayparts(id));
        dispatch(loadVersions(filters, id));
        dispatch(getBoxClosed(id));
        dispatch(successApproveOverlay());
    } catch (error) {
        console.error(error);
        dispatch(errorApproveOverlay(error));
    }
};
