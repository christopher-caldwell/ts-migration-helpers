import {
    REQUEST_FORMATS,
    RECEIVE_FORMATS,
    THROW_FORMATS,
    REQUEST_MARKETS,
    RECEIVE_MARKETS,
    THROW_MARKETS,
} from '../actionTypes';

const initialState = {
    fetchingFormats: false,
    formats: [],
    errorFormats: null,
    fetchingMarkets: false,
    markets: [],
    errorMarkets: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_FORMATS:
            return { ...state, fetchingFormats: true, errorFormats: null };
        case RECEIVE_FORMATS:
            return {
                ...state,
                fetchingFormats: false,
                formats: action.payload,
            };
        case THROW_FORMATS:
            return {
                ...state,
                fetchingFormats: false,
                errorFormats: action.error,
            };
        case REQUEST_MARKETS:
            return { ...state, fetchingMarkets: true, errorMarkets: null };
        case RECEIVE_MARKETS:
            return {
                ...state,
                fetchingMarkets: false,
                markets: action.payload,
            };
        case THROW_MARKETS:
            return {
                ...state,
                fetchingMarkets: false,
                errorMarkets: action.error,
            };
        default:
            return state;
    }
};
