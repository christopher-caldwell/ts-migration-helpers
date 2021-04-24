import { REQUEST_BOARD, UPDATE_BOARD, THROW_BOARD, UPDATE_OPTIONS } from '../actionTypes';

const initialState = {
    fetching: true,
    error: null,
    filters: {
        applied: {
            options: {
                sort: {
                    key: null,
                    ascending: true,
                },
            },
        },
    },
    layout: {
        board: null,
    },
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REQUEST_BOARD:
            return { ...state, fetching: true };
        case UPDATE_BOARD:
            return {
                ...state,
                fetching: false,
                filters: payload.filters,
                layout: payload.layout,
            };
        case UPDATE_OPTIONS:
            return {
                ...state,
                fetching: false,
                filters: {
                    ...state.filters,
                    applied: {
                        ...state.filters.applied,
                        options: {
                            ...state.filters.applied.options,
                            sort: payload,
                        },
                    },
                },
            };
        case THROW_BOARD:
            return {
                ...state,
                fetching: false,
                filters: null,
                layout: { ...state.layout, board: null },
                error: action.board,
            };
        default:
            return state;
    }
};
