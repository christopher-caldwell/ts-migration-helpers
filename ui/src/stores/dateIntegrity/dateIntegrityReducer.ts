import moment from 'moment';

import { STORE_BOARD_METADATA, RECEIVE_BOARD_METADATA } from '../actionTypes';

const initialState = {
    dateRange: {
        startDate: moment
            .utc()
            .subtract(1, 'weeks')
            .day(0)
            .format('YYYY-MM-DD'),
        endDate: moment
            .utc()
            .subtract(1, 'weeks')
            .day(6)
            .format('YYYY-MM-DD'),
        period: 'weekly',
        type: 'airplay',
    },
    persist: false,
    updating: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RECEIVE_BOARD_METADATA:
            return { ...state, updating: true };
        case STORE_BOARD_METADATA: {
            const { persist, savedDate } = payload;
            if (savedDate) return savedDate; // replacing entire state
            return {
                ...state,
                updating: false,
                persist: persist || state.persist,
            };
        }
        default:
            return state;
    }
};
