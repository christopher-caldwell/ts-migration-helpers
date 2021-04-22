import React from 'react';
import { shallow } from 'enzyme';

import SongHeader from 'components/SongHeader';

const renderSongHeader = (options = {}) => (
    shallow(
        <SongHeader
            artistName={options.artistName || 'test artistName'}
            songName={options.songName || 'test songName'}
        />,
    )
);
describe('<SongHeader />', () => {
    it('should render component', () => {
        const component = renderSongHeader();
        expect(component.find('.header-song-name').text()).toBe('test songName');
        expect(component.find('.header-song-artist').text()).toBe('test artistName');
    });
});
