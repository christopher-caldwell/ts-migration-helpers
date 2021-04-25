import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'shallow' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'shallow' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SyncStatus.module.scss' or i... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'shallow' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SyncStatus.module.scss' or i... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';

import SyncStatus from './SyncStatus.component';

// @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SyncStatus.module.scss' or i... Remove this comment to see the full error message
import { syncStatus } from './SyncStatus.module.scss';

const props = {
    stationId: 3322424,
    closedBox: { synchronized: true },
    closedBoxIsClosed: false,
    // @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
    closedBoxTemplates: { hour_restriction: [], packet: [], daypart: [] },
    lengthOfStagedSongsArray: 2,
    lengthOfstagedRestrictionsArray: 1,
    lengthOfstagedDaypartsArray: 3,
    pollerEnabled: true,
};

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 3.
test('matching props for sync status', () => {
    // @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
    const component = mount(<SyncStatus {...props} />);
    expect(component).toBeDefined();

    expect(component.find(`.${syncStatus}`)).toHaveLength(1);

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 3.
    expect(component.prop('stationId')).toEqual(props.stationId);
    // @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
    expect(component.prop('closedBox').synchronized).toEqual(props.closedBox.synchronized);
    expect(component.prop('closedBoxIsClosed')).toEqual(props.closedBoxIsClosed);
    expect(component.prop('closedBoxTemplates')).toEqual(
        expect.objectContaining(
            props.closedBoxTemplates.daypart,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 3.
            props.closedBoxTemplates.packet,
            // @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
            props.closedBoxTemplates.hour_restriction
        )
    );
    expect(component.prop('lengthOfStagedSongsArray')).toEqual(props.lengthOfStagedSongsArray);
    expect(component.prop('lengthOfstagedRestrictionsArray')).toEqual(props.lengthOfstagedRestrictionsArray);
    expect(component.prop('lengthOfstagedDaypartsArray')).toEqual(props.lengthOfstagedDaypartsArray);
});

test('jsx output of sync status component ', () => {
    // @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
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
