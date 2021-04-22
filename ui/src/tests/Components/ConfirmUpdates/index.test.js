import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConfirmUpdates from 'components/ConfirmUpdates';

jest.mock('stores/box/boxActions', () => ({
    getBox: () => ({ type: 'test' }),
}));

const mockStore = configureStore([thunk]);
const newStore = {
    restrictions: {
        data: [],
        staged: [],
    },
    dayparts: {
        data: [
            {
                id: 1,
                name: 'Daypart 1',
                synchronized: true,
                scheduling_order: 1,
                hours: [0, 1, 2, 8, 9],
            },
            {
                id: 2,
                name: 'Daypart 2',
                synchronized: true,
                scheduling_order: 2,
                hours: [99, 100, 101, 107, 108, 109],
            },
            {
                id: 3,
                name: 'Daypart 3',
                synchronized: false,
                scheduling_order: 3,
                hours: [],
            },
        ],
        staged: [],
    },
    categoriesList: [],
    musicTrackerData: {
        categoryDetails: {
            rawStationCategories: [],
        },
    },
    songVersions: {
        data: {
            current: {
                84853818: [
                    {
                        sId: '84853818',
                        sNm: 'ONE LAST TIME',
                        aNm: 'Ariana Grande',
                        media_id: '879380',
                        packet_id: 3433,
                        restriction_id: 1986,
                        version_name: '-',
                        modified_date: '2019-10-18T11:33:26.931Z',
                        category: {
                            id: 17,
                            name: 'A',
                        },
                        alternate: {},
                        order_by: 10,
                    },
                ],
                93231496: [
                    {
                        sId: '93231496',
                        sNm: 'UNFORGETTABLE',
                        aNm: 'French Montana / Swae Lee',
                        media_id: '402380',
                        packet_id: null,
                        restriction_id: null,
                        version_name: '-',
                        modified_date: '2019-09-26T11:46:38.934Z',
                        category: {
                            id: 18,
                            name: 'B',
                        },
                        alternate: {},
                        order_by: 20,
                    },
                ],
            },
        },
        changedVersions: {
            402380: {
                sId: '93231496',
                sNm: 'UNFORGETTABLE',
                aNm: 'French Montana / Swae Lee',
                media_id: '402380',
                packet_id: null,
                restriction_id: null,
                version_name: '-',
                modified_date: '2019-09-26T11:46:38.934Z',
                category: {
                    id: 19,
                    name: 'C',
                },
                alternate: {},
                order_by: 20,
                getChanges: {
                    actualChanges: {
                        category: {
                            id: 19,
                            name: 'C',
                        },
                    },
                    previousChanges: {
                        packet_id: null,
                        restriction_id: null,
                        category: {
                            id: 18,
                            name: 'B',
                        },
                    },
                    undoneChanges: {},
                    isEqualMedia: false,
                },
            },
            879380: {
                sId: '84853818',
                sNm: 'ONE LAST TIME',
                aNm: 'Ariana Grande',
                media_id: '879380',
                packet_id: null,
                version_name: '-',
                modified_date: '2019-10-18T11:33:26.931Z',
                category: {
                    id: 17,
                    name: 'A',
                },
                order_by: 10,
                getChanges: {
                    actualChanges: {
                        packet_id: null,
                    },
                    previousChanges: {
                        packet_id: 3433,
                        restriction_id: 1986,
                        category: {
                            id: 17,
                            name: 'A',
                        },
                    },
                    undoneChanges: {},
                    isEqualMedia: false,
                },
            },
        },
    },
    packets: {
        data: [
            {
                packet_id: 3433,
                name: 'BBBBB',
                short_name: 'BBBB',
                synchronized: true,
                packet_type: 'SHARE',
                modified_date: '2019-10-18T13:47:29.421Z',
            },
        ],
    },
};
const store = mockStore(newStore);

const mockStagedSongs = [
    {
        sId: '84853818',
        sNm: 'ONE LAST TIME',
        aNm: 'Ariana Grande',
        media_id: '879380',
        packet_id: null,
        version_name: '-',
        modified_date: '2019-10-18T11:33:26.931Z',
        category: {
            id: 17,
            name: 'A',
        },
        order_by: 10,
        currentPacketId: 3433,
        currentPacket: 'BBBBB',
        packetName: null,
        currentRestrictionId: 1986,
    },
    {
        sId: '93231496',
        sNm: 'UNFORGETTABLE',
        aNm: 'French Montana / Swae Lee',
        media_id: '402380',
        packet_id: null,
        restriction_id: null,
        version_name: '-',
        modified_date: '2019-09-26T11:46:38.934Z',
        category: {
            id: 19,
            name: 'C',
        },
        alternate: {},
        order_by: 20,
        currentPacketId: null,
        currentPacket: null,
        packetName: null,
        currentRestrictionId: null,
    },
];

const mockCategoryGroups = [
    {
        label: 'A',
        description: 'Power',
        value: 17,
        orderBy: 10,
        group: 'CURRENT',
        groupId: 1,
        limit: 5,
        songs: [
            {
                media_id: '702834',
                sNm: 'IN THE END',
                aNm: 'Linkin Park',
                version_name: '-',
                dayparts: {},
            },
        ],
    },
    {
        label: 'B',
        description: 'Sub Power',
        value: 18,
        orderBy: 20,
        group: 'CURRENT',
        groupId: 1,
        limit: 7,
        songs: [],
    },
    {
        label: 'N',
        description: 'New',
        value: 30,
        orderBy: 50,
        group: 'CURRENT',
        groupId: 1,
        limit: 5,
        songs: [],
    },
];

const renderConfirmUpdates = (options = {}) =>
    shallow(
        <ConfirmUpdates
            categoryGroups={options.categoryGroups || mockCategoryGroups}
            closeConfirmUpdates={options.closeConfirmUpdates || (() => {})}
            stagedSongs={options.stagedSongs || mockStagedSongs}
            daypartUpdates={options.daypartUpdates || []}
            store={options.store || store}
        />
    ).dive();

describe('<ConfirmUpdates />', () => {
    it('should render component', () => {
        const component = renderConfirmUpdates({ stagedSongs: [] });
        expect(component.find('.confirm-updates')).toHaveLength(1);
        expect(component.find('.confirm-updates__container')).toHaveLength(1);
        expect(component.find('IconX')).toHaveLength(1);
    });

    it('should render only category updates', () => {
        const mockStoreToCategories = mockStore({
            ...newStore,
            songVersions: {
                data: {
                    current: {},
                },
                changedVersions: {
                    879380: {
                        sId: '84853818',
                        sNm: 'ONE LAST TIME',
                        aNm: 'Ariana Grande',
                        media_id: '879380',
                        packet_id: null,
                        version_name: '-',
                        modified_date: '2019-10-18T11:33:26.931Z',
                        category: {
                            id: 17,
                            name: 'A',
                        },
                        order_by: 10,
                        getChanges: {
                            actualChanges: {
                                category: {
                                    id: 17,
                                    name: 'A',
                                },
                            },
                            previousChanges: {
                                packet_id: 3433,
                                restriction_id: 1986,
                                category: {
                                    id: 18,
                                    name: 'B',
                                },
                            },
                            undoneChanges: {},
                            isEqualMedia: false,
                        },
                    },
                },
            },
        });

        const component = renderConfirmUpdates({ store: mockStoreToCategories });
        expect(component.find('.confirm-updates__content')).toHaveLength(1);
        expect(component.find('h4').text()).toBe('Confirm Category Updates');
        expect(component.find('table')).toHaveLength(1);
    });

    it('should render only packet updates', () => {
        const mockStoreToPacket = {
            ...newStore,
            changedVersions: {
                402380: {
                    sId: '93231496',
                    sNm: 'UNFORGETTABLE',
                    aNm: 'French Montana / Swae Lee',
                    media_id: '402380',
                    packet_id: null,
                    restriction_id: null,
                    version_name: '-',
                    modified_date: '2019-09-26T11:46:38.934Z',
                    category: {},
                    alternate: {},
                    order_by: 20,
                    getChanges: {
                        actualChanges: {
                            packet_id: 3433,
                        },
                        previousChanges: {
                            packet_id: null,
                            restriction_id: null,
                            category: {},
                        },
                        undoneChanges: {},
                        isEqualMedia: false,
                    },
                },
            },
        };
        const component = renderConfirmUpdates({ store: mockStore(mockStoreToPacket) });
        expect(component.find('.confirm-updates__content')).toHaveLength(2);
        expect(component.find('table')).toHaveLength(2);
    });

    it('should render category and packet updates', () => {
        const component = renderConfirmUpdates();
        expect(component.find('.confirm-updates__content')).toHaveLength(2);
        expect(component.find('table')).toHaveLength(2);
    });

    it('IconX should trigger closeConfirmUpdates', () => {
        const mockCloseConfirmUpdates = jest.fn();
        const component = renderConfirmUpdates({
            closeConfirmUpdates: mockCloseConfirmUpdates,
        });
        component.find('IconX').simulate('click');
        expect(mockCloseConfirmUpdates).toHaveBeenCalled();
    });
});
