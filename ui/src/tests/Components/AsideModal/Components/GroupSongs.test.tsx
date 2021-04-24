import React from 'react';
import { shallow } from 'enzyme';

import GroupSongs from 'components/AsideModal/Components/GroupSongs';

const mockSongs = [
    {
        sNm: 'YOU\'RE NOT THERE',
        aNm: 'Lukas Graham',
        media_id: 400123,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-07-11T20:52:18.957Z',
        dayparts: {},
        order_by: 999,
    },
];

const mockLabelToGroupSongs = {
    noSong: 'Select a song to packet with:',
    withSong: 'Songs to be packeted:',
};

const renderGroupSongs = (options = {}) => (
    shallow(
        <GroupSongs
            handleClick={options.handleClick || (() => {})}
            songs={options.songs || mockSongs}
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
