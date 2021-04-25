import { SUCCESS_SONG_METADATA } from '../actionTypes';

const initialState = {};

export default (state = initialState, {
    type,
    payload
}: any) => {
    switch (type) {
        case SUCCESS_SONG_METADATA:
            return payload;
        default:
            return state;
    }
};
