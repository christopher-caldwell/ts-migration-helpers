import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import StationHeader from './StationHeader.component';
import StationInfo from '../StationInfo/StationInfo.component';
import StationHostStatus from '../StationHostStatus/StationHostStatus.component';
import SyncStatus from '../SyncStatus/SyncStatus.component';
import mockHostInfo from './mockHostInfo';
import mockBox from './mockBox';

import { stationHeaderContainer, radioTitle, stationInfo } from './StationHeader/StationHeader.module.scss';

const props = {
    currentStationId: '3322424',
    station: {
        summary: { name: 'Z100', call_letters: 'WHTZ-FM', location: 'New York', format_id: 6 },
    },
    hostInfo: { pollerEnabled: true, stationHostType: 'format_center' },
    getHostInformationAction: jest.fn().mockResolvedValue(mockHostInfo),
    getBoxAction: jest.fn().mockResolvedValue(mockBox),
    lookupTables: {
        formats: [
            { value: 6, label: 'Top 40' },
            { value: 71, label: 'Adult Hits' },
        ],
    },
};

test('call of useEffect getHostInformationAction', () => {
    let useEffect;
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, 'useEffect');
        mockUseEffect();
    });

    const component = mount(<StationHeader {...props} />);
    expect(component).toBeDefined();
    expect(component).toHaveLength(1);
    expect(component.prop('getHostInformationAction')).toHaveBeenCalledTimes(1);
    expect(component.prop('getBoxAction')).toHaveBeenCalledTimes(1);
});

test('table header component output', () => {
    const component = shallow(<StationHeader {...props} />);
    expect(component).toBeDefined();

    expect(component.find(`.${stationHeaderContainer}`)).toHaveLength(1);
    expect(component.find(`.${radioTitle}`)).toHaveLength(1);
    expect(component.find(`.${stationInfo}`)).toHaveLength(1);
    expect(component.find(StationInfo)).toHaveLength(1);
    expect(component.find(SyncStatus)).toHaveLength(1);
    expect(component.find(StationHostStatus)).toHaveLength(1);
});
