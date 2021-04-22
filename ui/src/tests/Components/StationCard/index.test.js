import React from 'react';
import { shallow } from 'enzyme';

import StationCard from 'components/StationCard';

jest.mock('components/Utilities/Image', () => <img alt="testimage" />);

const renderStationCard = (options = {}) => (
    shallow(
        <StationCard
            className={options.className || ''}
            station={{
                id: 1,
                call_letters: 'test name',
                image_url: 'test image_url',
                location: 'test location',
                owner: 'test owner',
            }}
        />,
    )
);

describe('<StationCard />', () => {
    it('should render component', () => {
        const component = renderStationCard();
        expect(component.find('.station-card')).toHaveLength(1);
        expect(component.find('.station-card-name').text()).toBe('test name');
        expect(component.find('.station-card-location').text()).toBe('test location');
        expect(component.find('.station-card-owner').text()).toBe('test owner');
    });

    it('custom class should work', () => {
        const component = renderStationCard({
            className: 'test-custom-class',
        });
        expect(component.find('.test-custom-class')).toHaveLength(1);
    });
});
