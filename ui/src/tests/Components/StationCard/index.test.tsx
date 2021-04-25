import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2741) FIXME: Property 'onCheck' is missing in type '{ className... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2741) FIXME: Property 'onCheck' is missing in type '{ className... Remove this comment to see the full error message
import StationCard from 'components/StationCard';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
jest.mock('components/Utilities/Image', () => <img alt="testimage" />);

const renderStationCard = (options = {}) => (
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'onCheck' is missing in type '{ className... Remove this comment to see the full error message
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
