import React from 'react';
import { shallow } from 'enzyme';
import ColumnGroups from './ColumnGroups.component';
import SongInfo from '../SongInfo';

test('output of song info group output', () => {
    const props = {
        preferenceColGroups: ['songInfo'],
        preferenceColumns: ['titleArtist', 'version'],
        songOrder: ['123456_12345678', '234567_456789456'],
    };
    const component = shallow(<ColumnGroups {...props} />);
    expect(component.find('div.columnGroups')).toHaveLength(1);
    expect(component.find(SongInfo)).toHaveLength(1);
});

test('displays no groups when preferences are empty', () => {
    const props = {
        preferenceColGroups: [],
        preferenceColumns: ['titleArtist', 'version'],
        songOrder: ['123456_12345678', '234567_456789456'],
    };
    const component = shallow(<ColumnGroups {...props} />);
    expect(component.find('div.columnGroups')).toHaveLength(1);
    expect(component.find(SongInfo)).toHaveLength(0);
});
