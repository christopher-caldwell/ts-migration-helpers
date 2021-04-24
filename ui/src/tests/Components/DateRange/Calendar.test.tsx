import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';

import DateRange from 'components/DateRange/Calendar';

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
const renderDateRange = () => (
    shallow(
        <DateRange
            onFilterSave={() => { }}
            store={store}
        />,
    ).dive()
);

describe('<DateRange />', () => {
    it('should render component', () => {
        const component = renderDateRange();
        expect(component.find('.mt-calendar-modal')).toHaveLength(1);
    });
});
