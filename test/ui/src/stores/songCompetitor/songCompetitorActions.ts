import request from 'utils/request';
import uniq from 'lodash/uniq';

import {
    SONG_COMPETITOR_SPINS_PENDING,
    SONG_COMPETITOR_SPINS_SUCCESS,
    SONG_COMPETITOR_SPINS_FAILURE,
} from '../actionTypes';

export const competitorsPending = () => ({
    type: SONG_COMPETITOR_SPINS_PENDING,
});

export const getCompetitors = (competitorSpins: any) => async (dispatch: any, getState: any) => {
    try {
        const { boardDetails } = getState();
        const {
            filters,
            layout: { board },
        } = boardDetails;
        const applied = filters.getTabFilters(board);
        const competitorsList = uniq([...competitorSpins.map((item: any) => parseInt(item.value, 10))]);
        dispatch(competitorsPending());
        const competitors = await request(`/board/${board.type}/${board.id}/panel/competitor`, {
            params: {
                filters: JSON.stringify({
                    ...applied,
                    competitors: competitorsList,
                }),
            },
        });
        dispatch({
            type: SONG_COMPETITOR_SPINS_SUCCESS,
            payload: { competitors },
        });
    } catch (error) {
        dispatch({ type: SONG_COMPETITOR_SPINS_FAILURE, payload: { error } });
    }
};
