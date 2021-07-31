import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pollerEnabled' does not exist on type '{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'pollerEnabled' does not exist on type '{... Remove this comment to see the full error message
import StationHostStatus from './StationHostStatus';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'stationHostType' does not exist on type ... Remove this comment to see the full error message
const renderStationHostStatus = (options = {}) => (
    shallow(
        <StationHostStatus
            pollerEnabled={options.pollerEnabled || false}
            stationHostType={options.stationHostType || 'format_center'}
        />,
    )
);

describe('<StationHostStatus />', () => {
    it('should render component', () => {
        const component = renderStationHostStatus();
        expect(component.find('.station-status')).toHaveLength(1);
    });

    it('should show connected message', () => {
        const component = renderStationHostStatus({ pollerEnabled: true });
        expect(component.text()).toBe('Connected to GSelector *');
    });

    it('should show not connected message', () => {
        const component = renderStationHostStatus({ pollerEnabled: false, stationHostType: 'local' });
        expect(component.text()).toBe('Not Connected to GSelector ');
    });
});
