import request from 'utils/request';

import {
    REQUEST_FORMATS,
    RECEIVE_FORMATS,
    THROW_FORMATS,
    REQUEST_MARKETS,
    RECEIVE_MARKETS,
    THROW_MARKETS,
} from '../actionTypes';

const requestFormats = () => ({ type: REQUEST_FORMATS });
const receiveFormats = payload => ({ type: RECEIVE_FORMATS, payload });
const throwFormats = error => ({ type: THROW_FORMATS, error });
const requestMarkets = () => ({ type: REQUEST_MARKETS });
const receiveMarkets = payload => ({ type: RECEIVE_MARKETS, payload });
const throwMarkets = error => ({ type: THROW_MARKETS, error });

export const fetchFormats = options => dispatch => {
    dispatch(requestFormats());
    return request('/lookups/data/formats', options)
        .then(data => {
            const formatsList = data.map(option => ({
                label: option.format_name,
                value: option.format_id,
            }));

            dispatch(receiveFormats(formatsList));
        })
        .catch(err => dispatch(throwFormats(err)));
};

export const fetchMarkets = options => dispatch => {
    dispatch(requestMarkets());
    return request('/lookups/data/markets', options)
        .then(data => {
            const marketsList = data.map(option => ({
                label: option.market_name,
                value: option.market_id,
            }));

            dispatch(receiveMarkets(marketsList));
        })
        .catch(err => dispatch(throwMarkets(err)));
};
