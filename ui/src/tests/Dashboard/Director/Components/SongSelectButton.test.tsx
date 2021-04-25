import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type '{}'.
import SongSelectButton from 'components/Director/Components/SongSelectButton';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectSong' does not exist on type '{}'.
const renderSongSelectButton = (options = {}) => (
    shallow(
        <SongSelectButton
            song={options.song || 123456}
            selectSong={options.selectSong || (() => {})}
        />,
    )
);

describe('<renderSongSelectButton />', () => {
    it('should render component', () => {
        const component = renderSongSelectButton();
        expect(component.find('.song-select-link')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('button').text()).toBe('SELECT');
    });

    it('onClick should work', () => {
        const mockOnClick = jest.fn();
        const component = renderSongSelectButton({ selectSong: mockOnClick });
        component.find('button').simulate('click');
        expect(mockOnClick).toHaveBeenCalled();
    });
});
