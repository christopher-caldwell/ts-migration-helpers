import { ON_SET_SONG_INFO_SELECTED } from '../actionTypes';

const defaultStage = {
    songInfoSelected: {},
};

export default (state = defaultStage, { type, songInfoSelected }) => {
    switch (type) {
        case ON_SET_SONG_INFO_SELECTED:
            return { ...state, songInfoSelected };
        default:
            return state;
    }
};
