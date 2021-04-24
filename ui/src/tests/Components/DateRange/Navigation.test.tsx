import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import configureStore from 'redux-mock-store';

import DateRangeCycle from 'components/DateRange/Navigation';

jest.mock('utils/DateFunctions', () => ({
    getDiffInDays: () => 0,
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
