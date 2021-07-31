import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import GroupSongs from 'components/AsideModal/Components/GroupSongs';

const mockSongs = [
    {
        sNm: 'YOU\'RE NOT THERE',
        aNm: 'Lukas Graham',
        media_id: 400123,
        packet_id: null,
        version_name: '-',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type '{}'... Remove this comment to see the full error message
        modified_date: '2019-07-11T20:52:18.957Z',
        dayparts: {},
        order_by: 999,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    },
];

const mockLabelToGroupSongs = {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChangePercentage' does not exist on ty... Remove this comment to see the full error message
    noSong: 'Select a song to packet with:',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type '{}'... Remove this comment to see the full error message
    withSong: 'Songs to be packeted:',
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
const renderGroupSongs = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChangePercentage' does not exist on ty... Remove this comment to see the full error message
        <GroupSongs
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{}'.
            handleClick={options.handleClick || (() => {})}
            songs={options.songs || mockSongs}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'labelToGroupSongs' does not exist on typ... Remove this comment to see the full error message
            onChangePercentage={options.onChangePercentage || (() => {})}
            icon={options.icon || 'fa-plus'}
            labelToGroupSongs={options.labelToGroupSongs || mockLabelToGroupSongs}
        />,
    )
);

describe('<GroupSongs />', () => {
    it('should render component', () => {
        const component = renderGroupSongs({ songs: [] });
        expect(component.find('.template-song__songs')).toHaveLength(1);
        expect(component.find('SongDetails')).toHaveLength(0);
    });

    it('should render song details', () => {
        const component = renderGroupSongs();
        expect(component.find('SongDetails')).toHaveLength(1);
        expect(component.find('p').text()).toBe('Songs to be packeted:');
    });

    it('should not render song details', () => {
        const component = renderGroupSongs({ songs: [] });
        expect(component.find('SongDetails')).toHaveLength(0);
        expect(component.find('p').text()).toBe('Select a song to packet with:');
    });
});
