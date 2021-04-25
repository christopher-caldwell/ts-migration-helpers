import { ON_SET_SONG_INFO_SELECTED } from '../actionTypes';

export const setSongInfoSelected = (songInfoSelected: any) => ({
    type: ON_SET_SONG_INFO_SELECTED,
    songInfoSelected
}); // TODO: remove category sidebar store, move this logic somewhere else
