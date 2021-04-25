import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';
// @ts-expect-error ts-migrate(6133) FIXME: 'configureStore' is declared but its value is neve... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHeader/StationHeader.... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import StationHeader from './StationHeader.component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHeader/StationHeader.... Remove this comment to see the full error message
import StationInfo from '../StationInfo/StationInfo.component';
import StationHostStatus from '../StationHostStatus/StationHostStatus.component';
import SyncStatus from '../SyncStatus/SyncStatus.component';
import mockHostInfo from './mockHostInfo';
import mockBox from './mockBox';

// @ts-expect-error ts-migrate(7034) FIXME: Variable 'useEffect' implicitly has type 'any' in ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHeader/StationHeader.... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7005) FIXME: Variable 'useEffect' implicitly has an 'any' type.
import { stationHeaderContainer, radioTitle, stationInfo } from './StationHeader/StationHeader.module.scss';

const props = {
    currentStationId: '3322424',
    station: {
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ currentStationId: string; station: { summa... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'useEffect' implicitly has type 'any' in ... Remove this comment to see the full error message
        summary: { name: 'Z100', call_letters: 'WHTZ-FM', location: 'New York', format_id: 6 },
    },
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'useEffect' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2740) FIXME: Type '{ currentStationId: string; station: { summa... Remove this comment to see the full error message
    hostInfo: { pollerEnabled: true, stationHostType: 'format_center' },
    getHostInformationAction: jest.fn().mockResolvedValue(mockHostInfo),
    getBoxAction: jest.fn().mockResolvedValue(mockBox),
    // @ts-expect-error ts-migrate(2740) FIXME: Type '{ currentStationId: string; station: { summa... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ currentStationId: string; station: { summa... Remove this comment to see the full error message
        useEffect = jest.spyOn(React, 'useEffect');
        mockUseEffect();
    });

    // @ts-expect-error ts-migrate(2740) FIXME: Type '{ currentStationId: string; station: { summa... Remove this comment to see the full error message
    const component = mount(<StationHeader {...props} />);
    expect(component).toBeDefined();
    expect(component).toHaveLength(1);
    expect(component.prop('getHostInformationAction')).toHaveBeenCalledTimes(1);
    expect(component.prop('getBoxAction')).toHaveBeenCalledTimes(1);
});

test('table header component output', () => {
    // @ts-expect-error ts-migrate(2740) FIXME: Type '{ currentStationId: string; station: { summa... Remove this comment to see the full error message
    const component = shallow(<StationHeader {...props} />);
    expect(component).toBeDefined();

    expect(component.find(`.${stationHeaderContainer}`)).toHaveLength(1);
    expect(component.find(`.${radioTitle}`)).toHaveLength(1);
    expect(component.find(`.${stationInfo}`)).toHaveLength(1);
    expect(component.find(StationInfo)).toHaveLength(1);
    expect(component.find(SyncStatus)).toHaveLength(1);
    expect(component.find(StationHostStatus)).toHaveLength(1);
});
