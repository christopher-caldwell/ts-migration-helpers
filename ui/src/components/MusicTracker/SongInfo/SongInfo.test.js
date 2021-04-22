import React from 'react';
import { shallow, mount } from 'enzyme';

import SongInfo from './SongInfo.component';
import ColumnGroupHeader from '../ColumnGroupHeader/ColumnGroupHeader.component';
import ColumnHeaders from '../ColumnHeaders/ColumnHeaders.component';
import Row from '../Row/Row.component';

test('jsx output of song info component', () => {
    const props = {
        songOrder: ['123456_45678912', '123456_12345678'],
        songMetadata: {
            '123456_45678912': {
                songName: 'No name Song',
                artistName: 'Dua Lipa',
            },
            '123456_12345678': {
                songName: 'Test song',
                artistName: 'Test! Artist',
                version: 'Original',
            },
        },
        columnKeys: ['titleArtist', 'version'],
    };
    const component = mount(<SongInfo {...props} />);
    expect(component.prop('songOrder')).toEqual(expect.arrayContaining(props.songOrder));
    expect(component.find('div.columnGroup')).toHaveLength(1);
    expect(component.find(ColumnGroupHeader)).toHaveLength(1);
    expect(component.find(ColumnHeaders)).toHaveLength(1);
    expect(component.find(Row)).toHaveLength(props.songOrder.length);
});
