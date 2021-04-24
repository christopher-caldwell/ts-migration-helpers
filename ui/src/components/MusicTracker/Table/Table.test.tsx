import React from 'react';
import { shallow, mount } from 'enzyme';

import Table from './Table.component';
import TableFiltersBar from '../TableFiltersBar';
import ColumnGroups from '../ColumnGroups';

test('output of container, with filters bar and coloumn groups components', () => {
    const component = shallow(<Table />);
    expect(component.find(TableFiltersBar)).toHaveLength(1);
    expect(component.find(ColumnGroups)).toHaveLength(1);
});
