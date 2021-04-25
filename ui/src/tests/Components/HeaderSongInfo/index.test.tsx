// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import moment from 'moment';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import HeaderSongInfo from 'components/HeaderSongInfo/index';

jest.mock('components/Visualizations/DateSeriesChart', () => ({
    Chart: () => <div />,
}));
jest.mock('utils/colors', () => ({
    makeColorRange: () => true,
}));
jest.mock('components/BoardPage/Panels/RadioPanels/MusicTracker/utils', () => ({
    categoryText: () => { },
}));

const mockBoardDetails = {
    filters: {
        applied: {
            dateRange: {
                period: 'allTime',
                type: null,
                startDate: moment(),
                endDate: moment(),
            },
            options: {
                hasTAA: false,
            },
        },
    },
};
const mockStore = configureStore();
const store = mockStore({
    musicTrackerData: {
        categoryDetails: {},
    },
    boardDetails: mockBoardDetails,
});
const mockDateRange = {
    period: 'allTime',
    type: null,
    startDate: moment(),
    endDate: moment(),
};
const MockSongInfo = {
    id: 1,
    title: 'test title',
    songCycle: {
        0: {
            taa: 'test taa 0',
            total_station_spins_24h: 0,
            total_pop: 0,
        },
        1: {
            taa: 'test taa 1',
            total_station_spins_24h: 1,
            total_pop: 1,
        },
    },
};
const renderHeaderSongInfo = () => (
    shallow(
        <HeaderSongInfo
            dateRange={mockDateRange}
            songInfo={MockSongInfo}
            handleClose={() => { }}
            store={store}
        />,
    ).dive()
);

describe('<HeaderSongInfo />', () => {
    it('should render component', () => {
        const component = renderHeaderSongInfo();
        expect(component.find('.header-song__container')).toHaveLength(1);
    });
});
