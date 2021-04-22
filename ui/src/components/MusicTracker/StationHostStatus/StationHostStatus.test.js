import React from 'react';
import { mount } from 'enzyme';

import StationHostStatus from './StationHostStatus.component';
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
