import React from 'react';
import { shallow, mount } from 'enzyme';

import SyncStatus from './SyncStatus.component';

import { syncStatus } from './SyncStatus.module.scss';

const props = {
    stationId: 3322424,
    closedBox: { synchronized: true },
    closedBoxIsClosed: false,
    closedBoxTemplates: { hour_restriction: [], packet: [], daypart: [] },
    lengthOfStagedSongsArray: 2,
    lengthOfstagedRestrictionsArray: 1,
    lengthOfstagedDaypartsArray: 3,
    pollerEnabled: true,
};

test('matching props for sync status', () => {
    const component = mount(<SyncStatus {...props} />);
    expect(component).toBeDefined();

    expect(component.find(`.${syncStatus}`)).toHaveLength(1);

    expect(component.prop('stationId')).toEqual(props.stationId);
    expect(component.prop('closedBox').synchronized).toEqual(props.closedBox.synchronized);
    expect(component.prop('closedBoxIsClosed')).toEqual(props.closedBoxIsClosed);
    expect(component.prop('closedBoxTemplates')).toEqual(
        expect.objectContaining(
            props.closedBoxTemplates.daypart,
            props.closedBoxTemplates.packet,
            props.closedBoxTemplates.hour_restriction
        )
    );
    expect(component.prop('lengthOfStagedSongsArray')).toEqual(props.lengthOfStagedSongsArray);
    expect(component.prop('lengthOfstagedRestrictionsArray')).toEqual(props.lengthOfstagedRestrictionsArray);
    expect(component.prop('lengthOfstagedDaypartsArray')).toEqual(props.lengthOfstagedDaypartsArray);
});

test('jsx output of sync status component ', () => {
    const component = mount(<SyncStatus {...props} />);
    expect(component).toBeDefined();

    // testing Pending Approval status
    expect(component.find(`.${syncStatus}`).text()).toEqual('Pending Approval');

    // testing Synchonizing
    component.setProps({ closedBox: { synchronized: false }, closedBoxIsClosed: true });
    expect(component.find(`.${syncStatus}`).text()).toEqual('Synchronizing');

    // testing Synchronized
    component.setProps({
        closedBox: { synchronized: true },
        closedBoxIsClosed: false,
        lengthOfStagedSongsArray: 0,
        lengthOfstagedRestrictionsArray: 0,
        lengthOfstagedDaypartsArray: 0,
    });
    expect(component.find(`.${syncStatus}`).text()).toEqual('Synchronized');
    component.setProps({
        closedBox: { synchronized: false },
        closedBoxIsClosed: false,
        lengthOfStagedSongsArray: 0,
        lengthOfstagedRestrictionsArray: 0,
        lengthOfstagedDaypartsArray: 0,
    });
    expect(component.find(`.${syncStatus}`).text()).toEqual('Synchronized');
});
