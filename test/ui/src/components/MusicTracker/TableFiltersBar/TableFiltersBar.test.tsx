import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
import TableFiltersBar from './TableFiltersBar.component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../WeekFilter' or its correspo... Remove this comment to see the full error message
import WeekFilter from '../WeekFilter';

test('output jsx of table filters bar component', () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
    const component = shallow(<TableFiltersBar />);
    expect(component).toBeDefined();
    expect(component.find('div.tableFiltersBar')).toHaveLength(1);
    expect(component.find(WeekFilter)).toHaveLength(1);
});
