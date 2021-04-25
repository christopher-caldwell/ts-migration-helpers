import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
import { shallow, mount } from 'enzyme';

import Table from './Table.component';
// @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
import TableFiltersBar from '../TableFiltersBar';
import ColumnGroups from '../ColumnGroups';

// @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
test('output of container, with filters bar and coloumn groups components', () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
    const component = shallow(<Table />);
    expect(component.find(TableFiltersBar)).toHaveLength(1);
    expect(component.find(ColumnGroups)).toHaveLength(1);
});
