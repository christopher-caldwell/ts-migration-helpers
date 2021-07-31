import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import ColumnGroups from './ColumnGroups.component';
// @ts-expect-error ts-migrate(2739) FIXME: Type '{ preferenceColGroups: string[]; preferenceC... Remove this comment to see the full error message
import SongInfo from '../SongInfo';

test('output of song info group output', () => {
    const props = {
        preferenceColGroups: ['songInfo'],
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ preferenceColGroups: string[]; preferenceC... Remove this comment to see the full error message
        preferenceColumns: ['titleArtist', 'version'],
        songOrder: ['123456_12345678', '234567_456789456'],
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ preferenceColGroups: never[]; preferenceCo... Remove this comment to see the full error message
    };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ preferenceColGroups: string[]; preferenceC... Remove this comment to see the full error message
    const component = shallow(<ColumnGroups {...props} />);
    expect(component.find('div.columnGroups')).toHaveLength(1);
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ preferenceColGroups: never[]; preferenceCo... Remove this comment to see the full error message
    expect(component.find(SongInfo)).toHaveLength(1);
});

test('displays no groups when preferences are empty', () => {
    const props = {
        preferenceColGroups: [],
        preferenceColumns: ['titleArtist', 'version'],
        songOrder: ['123456_12345678', '234567_456789456'],
    };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ preferenceColGroups: never[]; preferenceCo... Remove this comment to see the full error message
    const component = shallow(<ColumnGroups {...props} />);
    expect(component.find('div.columnGroups')).toHaveLength(1);
    expect(component.find(SongInfo)).toHaveLength(0);
});
