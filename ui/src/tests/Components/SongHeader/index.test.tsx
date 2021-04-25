import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'artistName' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'artistName' does not exist on type '{}'.
import SongHeader from 'components/SongHeader';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'songName' does not exist on type '{}'.
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
