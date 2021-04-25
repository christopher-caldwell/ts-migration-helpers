import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import moment from 'moment';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import DateRangeCycle from 'components/DateRange/Navigation';

jest.mock('utils/DateFunctions', () => ({
    getDiffInDays: () => 0,
}));

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; onFilterSave: () => voi... Remove this comment to see the full error message
const mockBoardDetails = {
    filters: {
        applied: {
            dateRange: {
                period: 'allTime',
                type: null,
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; onFilterSave: () => voi... Remove this comment to see the full error message
                startDate: moment(),
                endDate: moment(),
            },
        },
    },
};
const mockStore = configureStore();
const store = mockStore({
    boardDetails: mockBoardDetails,
});
const renderDateRangeCycle = () => (
    shallow(
        <DateRangeCycle
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean; onFilterSave: () => voi... Remove this comment to see the full error message
            disabled={false}
            onFilterSave={() => { }}
            store={store}
        />,
    ).dive()
);

describe('<DateRangeCycle />', () => {
    it('should render component', () => {
        const component = renderDateRangeCycle();
        expect(component.find('.calendar-filter__range-calendar')).toHaveLength(1);
    });
});
