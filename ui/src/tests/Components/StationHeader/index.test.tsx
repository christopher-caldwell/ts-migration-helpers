import React from 'react';
import { shallow } from 'enzyme';

import StationHeader from 'components/StationHeader';

const mockStation = {
    name: 'Z100',
    callLetters: 'WHTZ-FM',
    market: 'New York',
    format: 'Top 40',
};

const renderStationHeader = (options = {}) => (
    shallow(
        <StationHeader
            className={options.className || ''}
            station={options.station || mockStation}
        />,
    )
);

describe('<StationHeader />', () => {
    it('should render component', () => {
        const component = renderStationHeader();
        expect(component.find('.board-header')).toHaveLength(1);
        expect(component.find('.board-header-content')).toHaveLength(1);
        expect(component.find('h3').text()).toBe('Z100');
        expect(component.find('.board-header-subtitle')).toHaveLength(1);
        expect(component.find('.radio-subtitle').at(0).text()).toBe('WHTZ-FM New York');
        expect(component.find('.radio-subtitle').at(1).text()).toBe('Top 40');
    });
});
