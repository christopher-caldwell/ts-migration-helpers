import React from 'react';
import { shallow } from 'enzyme';

import StationHostStatus from './StationHostStatus';

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
