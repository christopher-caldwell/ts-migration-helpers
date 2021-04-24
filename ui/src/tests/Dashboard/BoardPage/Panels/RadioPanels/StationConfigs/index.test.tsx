import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import StationConfigs from 'components/BoardPage/Panels/RadioPanels/StationConfigs';

const mockAction = jest.fn().mockReturnValue({ type: 'ACTION' });
const mockOverlayAction = jest.fn().mockReturnValue({ type: 'OVERLAY_ACTION' });
jest.mock('stores/packets/packetsActions', () => ({
    fetchStationPackets: () => mockAction,
    createStationPacket: () => mockAction,
    fetchHourRestrictions: () => mockAction,
}));

jest.mock('stores/dayparts/daypartsActions', () => ({
    fetchStationDayparts: () => mockAction,
    createDaypart: () => mockAction,
}));

jest.mock('stores/confirmationStage/confirmationStageActions', () => ({
    approveBox: mockAction,
}));

jest.mock('stores/musicTrackerOverlay/musicTrackerOverlayActions', () => ({
    closeOverlay: mockOverlayAction,
    openOverlay: mockOverlayAction,
    successCancelOverlay: mockOverlayAction,
}));

jest.mock('stores/songVersions/songVersionsActions', () => ({
    cancelCategoryChanges: mockAction,
}));

const mockBoardDetails = {
    layout: {
        board: {
            id: 3323404,
            name: 'Z100',
            type: 'RadioBoard',
            config: {
                layout: [{ id: 'playlist-overview' }, { id: 'musictracker' }],
            },
            callLetters: 'WHTZ-FM',
            format: 'Top 40',
            market: 'New York',
        },
    },
    filters: {
        checkDateIntegrity: () => {},
    },
};

const mockPackets = {
    retrieving: false,
    data: [
        {
            packet_id: '0',
            name: 'Packet ABCD',
            short_name: 'ABCD',
            type: 'share',
            synchronized: false,
            songs: [
                {
                    artist: 'JONAS BROTHERS',
                    categoryId: 18,
                    id: 84851516,
                    mediaId: '708309',
                    title: 'Sucker',
                    version: '-',
                    value: 33,
                },
                {
                    artist: 'POST MALONE',
                    categoryId: 18,
                    id: 84851516,
                    mediaId: '708309',
                    title: 'Better Now',
                    version: '-',
                    value: 33,
                },
            ],
        },
    ],
};

const mockRestrictions = {
    loading: false,
    error: null,
    data: [
        {
            id: 123,
            stationId: 3323404,
            name: 'Restriction 1',
            lastUpdate: '2019-07-26',
            restrictionHour: [
                {
                    hour: 10,
                    lastUpdate: '2019-07-26',
                },
            ],
        },
    ],
    staged: [],
};

const mockDayparts = {
    retrieving: false,
    error: null,
    data: [
        {
            id: 1,
            name: 'Daypart 1',
            synchronized: false,
            scheduling_order: 0,
            hours: [6, 7, 8, 9],
        },
    ],
    staged: [
        {
            id: 1,
            name: 'test daypart 1',
            hours: [0, 1, 2, 20, 21, 22, 23, 40],
        },
    ],
};

const mockFeatureToggle = {
    system: {
        StationConfigs: {
            FeatureName: 'StationConfigs',
            Enabled: true,
            FeatureByStation: false,
        },
        PacketSong: {
            FeatureName: 'PacketSong',
            Enabled: true,
            FeatureByStation: true,
        },
        HourRestriction: {
            FeatureName: 'HourRestriction',
            Enabled: true,
            FeatureByStation: true,
        },
        Dayparts: {
            FeatureName: 'Dayparts',
            Enabled: true,
            FeatureByStation: true,
        },
    },
    station: {
        PacketSong: {
            FeatureName: 'PacketSong',
            Enabled: true,
        },
        HourRestriction: {
            FeatureName: 'HourRestriction',
            Enabled: true,
        },
        Dayparts: {
            FeatureName: 'Dayparts',
            Enabled: true,
        },
    },
};

const mockSongVersions = {
    loading: false,
    error: null,
    data: {
        type: 'category',
        config: {
            name: 'Category',
            last_categories_updated_date: 'Thu Jul 11 2019 20:52:19 GMT+0000',
        },
        current: {
            84850785: [
                {
                    sNm: "YOU'RE NOT THERE",
                    aNm: 'Lukas Graham',
                    media_id: '400123',
                    packet_id: null,
                    version_name: '-',
                    modified_date: '2019-07-11T20:52:18.957Z',
                    dayparts: {},
                    order_by: 999,
                },
            ],
            84851502: [
                {
                    sNm: 'IN THE END',
                    aNm: 'Linkin Park',
                    media_id: '702834',
                    packet_id: null,
                    version_name: '-',
                    modified_date: '2019-07-11T20:52:18.451Z',
                    dayparts: {
                        MID: {
                            id: 31,
                            name: 'R1',
                        },
                        EVE: {
                            id: 31,
                            name: 'R1',
                        },
                        PMD: {
                            id: 31,
                            name: 'R1',
                        },
                        OVN: {
                            id: 31,
                            name: 'R1',
                        },
                    },
                    order_by: 90,
                },
            ],
            84856535: [
                {
                    sNm: 'SINCE U BEEN GONE',
                    aNm: 'Kelly Clarkson',
                    media_id: '789743',
                    packet_id: 36,
                    version_name: '-',
                    modified_date: '2019-07-11T20:52:18.098Z',
                    dayparts: {},
                    order_by: 999,
                },
            ],
        },
        staged: {
            84856535: [
                {
                    sNm: 'SINCE U BEEN GONE',
                    aNm: 'Kelly Clarkson',
                    media_id: '789743',
                    packet_id: 36,
                    version_name: '-',
                    modified_date: '2019-07-11T20:52:18.098Z',
                    dayparts: {},
                    order_by: 999,
                },
            ],
        },
        prior: {},
        recommended: {},
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
};

const mockOverlay = {
    error: null,
    loading: false,
    showConfirm: false,
    showOverlay: false,
};

const mockMusictrackerData = {
    categoryDetails: {
        rawStationCategories: [
            {
                label: 'B',
                description: 'Sub Power',
                value: 18,
                orderBy: 20,
                group: 'CURRENT',
                groupId: 1,
                limit: 3,
            },
        ],
    },
};

const mockMatch = {
    params: {
        boardId: '3323404',
        configId: 'station-packets',
    },
    url: 'urltest/station-configs',
};

const mockBox = {
    loading: false,
    error: null,
    data: {
        closed: true,
        synchronized: true,
        lastSyncDate: '2019-07-11T20:52:18.098Z',
        templates: [],
    },
};

const defaultProps = {
    boardDetails: mockBoardDetails,
    packets: mockPackets,
    dayparts: mockDayparts,
    restrictions: mockRestrictions,
    featureToggle: mockFeatureToggle,
    songVersions: mockSongVersions,
    musicTrackerOverlay: mockOverlay,
    musicTrackerData: mockMusictrackerData,
    box: mockBox,
};

const mockStore = configureStore([thunk]);
const store = mockStore({ ...defaultProps });

const renderStationConfigs = (options = {}) =>
    shallow(
        <StationConfigs
            store={options.store || store}
            successCancelOverlayAction={mockAction}
            errorCancelOverlayAction={mockAction}
            resetErrorAction={mockAction}
            closeOverlayAction={mockOverlayAction}
            openOverlayAction={mockOverlayAction}
            match={options.match || mockMatch}
        />
    ).dive();

describe('<StationConfigs />', () => {
    it('should render component', () => {
        const component = renderStationConfigs();
        expect(component.find('TabItem')).toHaveLength(3);
        expect(component.find('StationHeader')).toHaveLength(1);
    });

    it('should have board missing', () => {
        const mockTestBoard = {
            id: 3323404,
            name: 'Z100',
            type: 'RadioBoard',
            config: {
                layout: [{ id: 'playlist-overview' }],
            },
            callLetters: 'WHTZ-FM',
            format: 'Top 40',
            market: 'New York',
        };

        const newStore = mockStore({
            ...defaultProps,
            boardDetails: {
                layout: {
                    board: mockTestBoard,
                },
                filters: {
                    checkDateIntegrity: () => {},
                },
            },
        });
        const component = renderStationConfigs({ store: newStore });
        const spy = jest.spyOn(component.instance(), 'checkPermissionToAccess');
        const result = component.instance().checkPermissionToAccess(undefined);
        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalled();
        expect(component.html()).toBe(null);
    });

    it('should not have permission to see musictracker', () => {
        const mockTestBoard = {
            id: 3323404,
            name: 'Z100',
            type: 'RadioBoard',
            config: {
                layout: [{ id: 'playlist-overview' }],
            },
            callLetters: 'WHTZ-FM',
            format: 'Top 40',
            market: 'New York',
        };

        const newStore = mockStore({
            boardDetails: {
                layout: {
                    board: mockTestBoard,
                },
                filters: {
                    checkDateIntegrity: () => {},
                },
            },
            songVersions: {
                changedVersions: [],
            },
            packets: {
                data: [],
            },
            restrictions: {
                data: [],
            },
            musicTrackerOverlay: {
                showOverlay: false,
            },
            musicTrackerData: {
                categoryDetails: {
                    rawStationCategories: [],
                },
            },
            box: {
                data: [],
                loading: false,
            },
            dayparts: {
                data: [],
                retrieving: false,
            },
        });
        const component = renderStationConfigs({ store: newStore });
        const spy = jest.spyOn(component.instance(), 'checkPermissionToAccess');
        const result = component.instance().checkPermissionToAccess(mockTestBoard);
        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalled();
        expect(component.html()).toBe(null);
    });

    it('should not have rawStationCategories', () => {
        const mockTestMusictrackerData = {
            categoryDetails: {},
        };
        const newStore = mockStore({
            ...defaultProps,
            musicTrackerData: mockTestMusictrackerData,
        });
        const component = renderStationConfigs({ store: newStore });
        expect(component.html()).toBe(null);
    });

    it('should have packet, restriction and dayparts disabled by feature toggle', () => {
        const mockTestFeature = {
            system: {
                ...mockFeatureToggle.system,
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: false,
                    FeatureByStation: true,
                },
                HourRestriction: {
                    FeatureName: 'HourRestriction',
                    Enabled: false,
                    FeatureByStation: true,
                },
                Dayparts: {
                    FeatureName: 'Dayparts',
                    Enabled: false,
                    FeatureByStation: true,
                },
            },
            station: {
                ...mockFeatureToggle.station,
            },
        };
        const newStore = mockStore({
            ...defaultProps,
            featureToggle: mockTestFeature,
        });
        const component = renderStationConfigs({ store: newStore });
        expect(component.html()).toBe(null);
    });

    it('should have only restriction disabled by feature toggle', () => {
        const mockTestFeature = {
            system: {
                ...mockFeatureToggle.system,
                HourRestriction: {
                    FeatureName: 'HourRestriction',
                    Enabled: false,
                    FeatureByStation: true,
                },
            },
            station: {
                ...mockFeatureToggle.station,
            },
        };
        const mockMatchTest = {
            params: {
                boardId: '3323404',
                configId: 'hour-restrictions',
            },
            url: '/board/radio/3323404/station-configs/hour-restrictions',
        };
        const newStore = mockStore({
            ...defaultProps,
            featureToggle: mockTestFeature,
        });
        const component = renderStationConfigs({
            store: newStore,
            match: mockMatchTest,
        });
        expect(component.html()).toBe(null);
    });

    it('should have only packet disabled by feature toggle', () => {
        const mockTestFeature = {
            system: {
                ...mockFeatureToggle.system,
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: false,
                    FeatureByStation: true,
                },
            },
            station: {
                ...mockFeatureToggle.station,
            },
        };

        const mockMatchTest = {
            params: {
                boardId: '3323404',
                configId: 'station-packets',
            },
            url: '/board/radio/3323404/station-configs/station-packets',
        };
        const newStore = mockStore({
            ...defaultProps,
            featureToggle: mockTestFeature,
        });
        const component = renderStationConfigs({
            store: newStore,
            match: mockMatchTest,
        });
        expect(component.html()).toBe(null);
    });

    it('should have only dayparts disabled by feature toggle', () => {
        const mockTestFeature = {
            system: {
                ...mockFeatureToggle.system,
                Dayparts: {
                    FeatureName: 'Dayparts',
                    Enabled: false,
                    FeatureByStation: true,
                },
            },
            station: {
                ...mockFeatureToggle.station,
            },
        };

        const mockMatchTest = {
            params: {
                boardId: '3323404',
                configId: 'dayparts',
            },
            url: '/board/radio/3323404/station-configs/dayparts',
        };
        const newStore = mockStore({
            ...defaultProps,
            featureToggle: mockTestFeature,
        });
        const component = renderStationConfigs({
            store: newStore,
            match: mockMatchTest,
        });
        expect(component.html()).toBe(null);
    });

    it('should render loading component', () => {
        const mockTestPackets = {
            retrieving: true,
            data: [],
        };

        const mockTestRestrictions = {
            loading: true,
            data: [],
            staged: [],
        };

        const mockTestDayparts = {
            retrieving: true,
            data: [],
            staged: [],
        };

        const newStore = mockStore({
            ...defaultProps,
            packets: mockTestPackets,
            restrictions: mockTestRestrictions,
            dayparts: mockTestDayparts,
        });
        const component = renderStationConfigs({ store: newStore });
        expect(component.find('LoadingIndicator')).toHaveLength(1);
    });

    it('should create a new packet', () => {
        mockAction.mockClear();
        const mockTestPackets = {
            loading: false,
            retrieving: true,
            data: [
                {
                    packet_id: '0',
                    name: 'Packet ABCD',
                    short_name: 'ABCD',
                    synchronized: true,
                    songs: [
                        {
                            artist: 'JONAS BROTHERS',
                            categoryId: 18,
                            id: 84851516,
                            mediaId: '708309',
                            title: 'Sucker',
                            version: '-',
                            value: 33,
                        },
                    ],
                },
            ],
        };

        const newStore = mockStore({
            ...defaultProps,
            packets: mockTestPackets,
        });
        const component = renderStationConfigs({ store: newStore });

        component.instance().createPacket(mockTestPackets.data.name);
        expect(mockAction).toHaveBeenCalled();
    });

    it('should create a new daypart', () => {
        mockAction.mockClear();
        const mockTestDayparts = {
            loading: false,
            retrieving: true,
            data: [
                {
                    id: -1,
                    name: 'Daypart 1',
                    synchronized: false,
                },
            ],
            staged: [],
        };

        const newStore = mockStore({
            ...defaultProps,
            dayparts: mockTestDayparts,
        });
        const component = renderStationConfigs({ store: newStore });

        component.instance().createDaypart(mockTestDayparts.data.name);
        expect(mockAction).toHaveBeenCalled();
    });

    it('should open Review page overlay', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
        });
        const component = renderStationConfigs({ store: newStore });

        const reviewFooterComponent = component.shallow();
        expect(reviewFooterComponent.find('button.bottom-bar-save')).toBeDefined();
    });

    it('should close Review page overlay', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
            approveBoxAction: () => {},
        });
        const component = renderStationConfigs({ store: newStore });
        component.instance().setState({ openReviewPage: true });
        component.instance().closeConfirmChanges();
        expect(component.instance().state.openReviewPage).toBe(false);
    });

    it('should approve changes', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
        });

        const component = renderStationConfigs({
            store: newStore,
            props: {
                approveBoxAction: (changes, boardId) => mockAction(changes, boardId),
            },
        });

        const reviewFooterComponent = component.shallow();
        expect(reviewFooterComponent.find('button.bottom-bar-save')).toBeDefined();
        component.setState({ openReviewPage: true });
        expect(component.instance().state.openReviewPage).toBe(true);
    });

    it('should render overlay', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
            musicTrackerOverlay: {
                ...mockOverlay,
                showOverlay: true,
            },
        });

        const component = renderStationConfigs({ store: newStore });
        const spyRenderOverlay = jest.spyOn(component.instance(), 'renderOverlay');
        component.instance().renderOverlay();
        expect(spyRenderOverlay).toHaveBeenCalled();
    });

    it('should handle cancel and approve on overlay', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
        });

        const component = renderStationConfigs({
            store: newStore,
            props: {
                successCancelOverlayAction: mockAction,
                errorCancelOverlayAction: mockAction,
                closeOverlayAction: mockOverlayAction,
                resetErrorAction: mockOverlayAction,
            },
        });

        mockAction.mockClear();
        component.instance().overlayApproveCancel(false, 'musictracker');
        component.instance().overlayApproveCancel(true, 'musictracker');
        component.instance().overlaySucessClose();
        component.instance().overlayFailClose(true);
        component.instance().overlayFailClose(false);
        expect(mockAction).toHaveBeenCalledTimes(2);
    });

    it('should overlay confirm action', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
            musicTrackerOverlay: {
                ...mockOverlay,
                showOverlay: true,
                showConfirm: 'true',
            },
        });

        const component = renderStationConfigs({
            store: newStore,
            props: {
                errorCancelOverlayAction: mockAction,
                resetErrorAction: mockAction,
            },
        });

        const spyOnOverlaySucessClose = jest.spyOn(component.instance(), 'overlaySucessClose');
        component.instance().overlaySucessClose();
        expect(spyOnOverlaySucessClose).toHaveBeenCalled();
    });

    it('should close overlay error', () => {
        const stagedVersions = {
            ...mockSongVersions,
            data: {
                ...mockSongVersions.data,
                staged: {
                    ...mockSongVersions.data.current,
                },
            },
        };

        const newStore = mockStore({
            ...defaultProps,
            songVersions: stagedVersions,
            musicTrackerOverlay: {
                ...mockOverlay,
                showOverlay: true,
                error: { error: 'error message' },
            },
        });

        const component = renderStationConfigs({
            store: newStore,
            props: {
                closeOverlayAction: mockOverlayAction,
            },
        });

        const spyOnCloseFailOverlay = jest.spyOn(component.instance(), 'onCloseFailOverlay');
        component.instance().onCloseFailOverlay();
        expect(spyOnCloseFailOverlay).toHaveBeenCalled();
    });
});
