import React from 'react';
import { shallow } from 'enzyme';
import SongSelectButton from 'components/Director/Components/SongSelectButton';

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
