import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchBar from '../../SearchBar/SearchBar.component';
import SearchArtistsSongs, { filterSongData } from './SearchArtistsSongs.component';

const props = {
    musicTrackerList: [`123456_891011`, '123456_45678912', '123456_12345678', '123456_7891236'],
    songs: {
        '123456_45678912': {
            songName: 'No name Song',
            artistName: 'Dua Lipa',
        },
        '123456_12345678': {
            songName: 'Test song',
            artistName: 'Test! Artist',
            version: 'Original',
        },
        '123456_7891236': {
            songName: 'duwn with it',
            artistName: 'yes',
        },
        '123456_891011': {
            songName: 'One and Done',
            artistName: 'haha',
        },
    },
    setSongOrder: ['123456_45678912', '123456_12345678'],
};

const component = mount(<SearchArtistsSongs {...props} />);

test('jsx output of searchartistsong component', () => {
    expect(component.prop('musicTrackerList')).toEqual(
        expect.arrayContaining(props.musicTrackerList)
    );
    expect(component.prop('setSongOrder')).toEqual(expect.objectContaining(props.setSongOrder));
    expect(component.prop('songs')).toEqual(expect.objectContaining(props.songs));
    expect(component.find(SearchBar)).toHaveLength(1);
});

test('test output of filterSongData component function', () => {
    expect(filterSongData('du', props.songs, props.musicTrackerList)).toEqual(
        expect.arrayContaining(['123456_45678912', '123456_7891236'])
    );
    expect(filterSongData('tes', props.songs, props.musicTrackerList)).toEqual(
        expect.arrayContaining(['123456_12345678'])
    );
    expect(filterSongData('one', props.songs, props.musicTrackerList)).toEqual(
        expect.arrayContaining(['123456_891011'])
    );
});
