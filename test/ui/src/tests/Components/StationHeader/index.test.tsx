import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type '{}'.
import StationHeader from 'components/StationHeader';

const mockStation = {
    name: 'Z100',
    callLetters: 'WHTZ-FM',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
    market: 'New York',
    format: 'Top 40',
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type '{}'.
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
