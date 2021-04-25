import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {
    ON_SET_DATE,
    UPDATE_COMPARE_OPTIONS,
    ON_SET_FILTER,
    ON_RESET_FILTER,
    REMOVE_READ_ONLY_CATEGORIES,
} from '../actionTypes';

const initialState = {
    filter: {
        changed: false,
        search: '',
        crg: ['C', 'R', 'G'],
        category: {
            prior: [],
            current: [],
            new: [],
            recommendable: [],
        },
    },
    compare: {
        // this is to identify if the user is comparing songs at the moment
        isCompareEnabled: false,
        // this is to hold the list of songs selected to be compared
        selectedSongs: [],
        // this is identify whether user change the sort option while doing a compare
        sortOptionChanged: false,
    },
    startDate: moment.utc().subtract(1, 'weeks').day(0).format('YYYY-MM-DD'),
};

export default (state = initialState, action: any) => {
    const { type, payload, date } = action;
    switch (type) {
        case UPDATE_COMPARE_OPTIONS:
            return { ...state, compare: payload };
        case ON_SET_DATE:
            return { ...state, startDate: date };
        case ON_SET_FILTER: {
            // TODO: separate the logic for search and dropdown filters
            const baseFilter = !payload ? { ...initialState.filter } : { ...state.filter };
            const updatedFilter = !payload ? baseFilter : { ...baseFilter, ...payload };
            const changedFilter =
                !isEmpty(updatedFilter.search) ||
                updatedFilter.crg.length < 3 ||
                updatedFilter.category.prior.length > 0 ||
                updatedFilter.category.current.length > 0 ||
                updatedFilter.category.new.length > 0 ||
                updatedFilter.category.recommendable.length > 0;

            // TODO: You should never need a boolean to track changes. investigate.
            return {
                ...state,
                filter: { ...updatedFilter, changed: changedFilter },
            };
        }
        // TODO: import types
        case ON_RESET_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    changed: false,
                    crg: ['C', 'R', 'G'],
                    category: { prior: [], current: [], new: [], recommendable: [] },
                },
            };
        case REMOVE_READ_ONLY_CATEGORIES:
            return {
                ...state,
                filter: { ...payload },
            };
        default:
            return state;
    }
};
