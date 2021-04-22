import { STORE_RADIOBOARD_FILTERS } from 'stores/actionTypes';

const initialState = {
    savedHomeFilters: {
        filters: {
            domain: 'iheart',
            sort: { field: 'market_rank', ascending: true },
            formats: [],
            markets: [],
        },
        options: {},
    },
};

export default (state = initialState, action) => {
    // TODO: move this to another reducer
    const { type, payload } = action;
    switch (type) {
        case STORE_RADIOBOARD_FILTERS:
            return payload.savedHomeFilters
                ? { ...state, savedHomeFilters: payload.savedHomeFilters }
                : state;
        default:
            return state;
    }
};
