import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

import StationHostStatus from './StationHostStatus.component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHostStatus.module.scs... Remove this comment to see the full error message
import { stationStatus } from './StationHostStatus.module.scss';

const props = {
    stationId: 3322424,
    pollerEnabled: true,
    stationHostType: 'format_center',
};

test('jsx output of for station host status', () => {
    const component = mount(<StationHostStatus {...props} />);

    // CSS classes and stationID check
    expect(component.find(`.${stationStatus}`)).toHaveLength(1);
    expect(component.prop('stationId')).toEqual(props.stationId);

    // a format center, connected to gselector
    expect(component.find(`.${stationStatus}`).text()).toEqual('Connected to GSelector *');

    // not a format center, not connected to gselector
    component.setProps({
        pollerEnabled: false,
        stationHostType: '',
    });
    expect(component.find(`.${stationStatus}`).text()).toEqual('Not Connected to GSelector ');

    // a format center, not connected to gselector
    component.setProps({
        pollerEnabled: false,
        stationHostType: 'format_center',
    });
    expect(component.find(`.${stationStatus}`).text()).toEqual('Not Connected to GSelector *');

    // not a format center, connected to gselector
    component.setProps({
        pollerEnabled: true,
        stationHostType: '',
    });
    expect(component.find(`.${stationStatus}`).text()).toEqual('Connected to GSelector ');
});
