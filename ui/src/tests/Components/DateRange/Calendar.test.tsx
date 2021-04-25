import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import moment from 'moment';

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: () => void; store: any; }' i... Remove this comment to see the full error message
import DateRange from 'components/DateRange/Calendar';

const mockBoardDetails = {
    filters: {
        applied: {
            dateRange: {
                period: 'allTime',
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: () => void; store: any; }' i... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: () => void; store: any; }' i... Remove this comment to see the full error message
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
