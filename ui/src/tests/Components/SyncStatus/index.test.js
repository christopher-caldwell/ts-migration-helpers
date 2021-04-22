import React from 'react';
import { shallow } from 'enzyme';

import SyncStatus from 'components/SyncStatus';

const renderSyncStatus = (options = {}) => (
    shallow(
        <SyncStatus
            boxData={options.boxData
                || {
                    closed: true,
                    lastSyncDate: null,
                    synchronized: true,
                    templates: {
                        hour_restriction: [],
                        packet: [],
                        daypart: [],
                    },
                }}
            stagedSongs={options.stagedSongs || []}
            stagedRestrictions={options.stagedRestrictions || []}
            stagedDayparts={options.stagedDayparts || []}
        />,
    )
);

describe('<SyncStatus />', () => {
    it('should render component', () => {
        const component = renderSyncStatus();
        expect(component.find('.sync-status')).toHaveLength(1);
    });

    it('should render the synchronized status text', () => {
        const component = renderSyncStatus();
        expect(component.find('.sync-status')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronized')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronized').text()).toBe('Synchronized');
    });

    it('should render the synchronizing status text with box does not synchronized', () => {
        const component = renderSyncStatus({
            boxData: {
                closed: true,
                lastSyncDate: '2019-09-09T13:47:05.784Z',
                synchronized: false,
                templates: {
                    hour_restriction: [],
                    packet: [],
                    daypart: [],
                },
            },
        });
        expect(component.find('.sync-status')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronizing')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronizing').text()).toBe('Synchronizing');
    });

    it('should render the synchronizing status text with box synchronized, but with templates does not synchronized', () => {
        const component = renderSyncStatus({
            boxData: {
                closed: true,
                lastSyncDate: '2019-09-09T13:47:05.784Z',
                synchronized: true,
                templates: {
                    hour_restriction: [
                        {
                            id: 1724,
                            name: 'New Template',
                            hours: [0],
                        },
                    ],
                    packet: [],
                    daypart: [],
                },
            },
        });

        const lastSyncDateLabel = component.find('OverlayTrigger').props().overlay.props.children.props.children[1].props.children[0];
        expect(component.find('.sync-status')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronizing')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronizing').text()).toBe('Synchronizing');
        expect(lastSyncDateLabel).toEqual('Last Sync Date: ');
    });

    it('should render the pending approval status text', () => {
        const component = renderSyncStatus({
            stagedSongs: [
                {
                    sId: 84851502,
                    sNm: 'IN THE END',
                    aNm: 'Linkin Park',
                    media_id: 702834,
                    packet_id: null,
                    restriction_id: null,
                    version_name: '-',
                    modified_date: '2019-09-13T14:28:30.336Z',
                    category: {
                        name: 'A',
                        id: 10,
                    },
                    order_by: 10,
                },
            ],
        });
        expect(component.find('.sync-status')).toHaveLength(1);
        expect(component.find('.sync-status__info--waiting')).toHaveLength(1);
        expect(component.find('.sync-status__info--waiting').text()).toBe('Pending Approval');
    });

    it('should render the synchronizing status text when we do not have boxData', () => {
        const component = renderSyncStatus({
            boxData: {},
        });
        expect(component.find('.sync-status')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronized')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronized').text()).toBe('Synchronized');
    });

    it('should not show lastSyncDate when we do not receive this data', () => {
        const component = renderSyncStatus({
            boxData: {
                closed: true,
                lastSyncDate: null,
                synchronized: false,
                templates: {
                    hour_restriction: [],
                    packet: [],
                    daypart: [],
                },
            },
        });
        const lastSyncDate = component.find('OverlayTrigger').props().overlay.props.children.props.children[1];
        expect(component.find('.sync-status')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronizing')).toHaveLength(1);
        expect(component.find('.sync-status__info--synchronizing').text()).toBe('Synchronizing');
        expect(lastSyncDate).toEqual('');
    });
});
