// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import moment from 'moment';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import BoardView from 'components/BoardPage/BoardView';

jest.mock('components/Utilities/Image', () => <img alt="testimage" />);
jest.mock('images/packet-ab-white.png', () => <div className="mock-img-class" />);
jest.mock('images/packet-ab-blue.png', () => <div className="mock-img-class" />);
jest.mock('images/clock-regular-white.png', () => <div className="mock-img-class" />);
jest.mock('images/clock-regular-blue.png', () => <div className="mock-img-class" />);
jest.mock('images/pie-chart.png', () => <div className="mock-img-class" />);
jest.mock('images/pie-chart-blue.png', () => <div className="mock-img-class" />);

const mockOwnProps = {
    pathname: '/board/radio/3323404/musictracker',
};
const mockMatch = {
    params: {
        boardId: '3323404',
        tabId: 'musictracker',
        typeKey: 'musictracker',
    },
};
const mockDateIntegrity = {
    savedDate: {
        persist: false,
    },
};
const mockBoardDetails = {
    filters: {
        applied: {
            dateRange: {
                period: 'allTime',
                type: null,
                startDate: moment(),
                endDate: moment(),
            },
        },
    },
    layout: {
        board: {
            id: 3323404,
            type: 'RadioBoard',
            tabId: 'categories',
        },
    },
};

jest.mock('stores/boardDetails/boardDetailsActions', () => ({
    fetchPanel: () => ({ type: 'test action' }),
    fetchBoard: () => ({ type: 'test action' }),
}));

jest.mock('stores/features/featuresActions', () => ({
    getStationFeatures: () => ({ type: 'test action' }),
    getSystemFeatures: () => ({ type: 'test action' }),
}));

const mockStore = configureStore([thunk]);

const store = mockStore({
    boardDetails: mockBoardDetails,
    songVersions: {
        data: {
            current: {
                84851516: [
                    {
                        sNm: 'SO FAR AWAY',
                        aNm: 'Dire Straits',
                        media_id: 708309,
                        version_name: '-',
                        modified_date: '2019-05-13T11:44:36.809Z',
                        dayparts: {
                            OVN: {
                                id: 18,
                                name: 'B',
                            },
                            PMD: {
                                id: 18,
                                name: 'B',
                            },
                            MID: {
                                id: 18,
                                name: 'B',
                            },
                            EVE: {
                                id: 18,
                                name: 'B',
                            },
                        },
                        order_by: 20,
                    },
                ],
            },
            prior: {
                84851516: [
                    {
                        sNm: 'SO FAR AWAY',
                        aNm: 'Dire Straits',
                        media_id: 708309,
                        version_name: '-',
                        modified_date: '2019-05-13T11:44:36.809Z',
                        dayparts: {
                            OVN: {
                                id: 18,
                                name: 'B',
                            },
                            PMD: {
                                id: 18,
                                name: 'B',
                            },
                            MID: {
                                id: 18,
                                name: 'B',
                            },
                            EVE: {
                                id: 18,
                                name: 'B',
                            },
                        },
                        order_by: 20,
                    },
                ],
            },
            staged: {},
            recommended: {},
        },
    },
    songs: {
        data: [
            {
                sId: 84882476,
            },
        ],
    },
    categorySidebar: {
        songInfoSelected: {},
    },
    musicTrackerData: {
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
    },
    musicTrackerOverlay: {
        opened: false,
    },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'store' does not exist on type '{}'.
    dateIntegrity: mockDateIntegrity,
    similarStations: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type '{}'.
        open: false,
    },
    box: {
        loading: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{}'.
        error: null,
        data: {
            closed: true,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type '{... Remove this comment to see the full error message
            lastSyncDate: '2019-09-09T13:47:05.784Z',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isMusicTracker' does not exist on type '... Remove this comment to see the full error message
            synchronized: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'store' does not exist on type '{}'.
        },
    },
    restrictions: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type '{}'.
        loading: false,
        error: null,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{}'.
        data: [],
        staged: [],
    },
    dayparts: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type '{... Remove this comment to see the full error message
        loading: false,
        error: null,
        data: [],
        staged: [],
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isMusicTracker' does not exist on type '... Remove this comment to see the full error message
    },
    categoryHighlight: {
        data: {},
    },
});

const renderBoardView = (options = {}) =>
    shallow(
        <BoardView
            store={options.store || store}
            location={options.location || mockOwnProps}
            match={options.match || mockMatch}
            dateIntegrity={options.dateIntegrity || mockDateIntegrity}
            isMusicTracker={options.isMusicTracker || false}
        />
    ).dive();

describe('<BoardView />', () => {
    it('should render component with correct structure', () => {
        const component = renderBoardView();
        expect(component.find('.content-container')).toHaveLength(1);
        expect(component.find('.container-musictracker')).toHaveLength(1);
        expect(component.find('SyncStatus')).toHaveLength(1);
    });

    it('should render SyncStatus component when we are on Overview page', () => {
        const component = renderBoardView({
            location: {
                pathname: '/board/radio/3323404/playlist-overview',
            },
        });
        expect(component.find('SyncStatus')).toHaveLength(0);
    });
});
