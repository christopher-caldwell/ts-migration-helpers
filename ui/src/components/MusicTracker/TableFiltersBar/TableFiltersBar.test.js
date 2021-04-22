import React from 'react';
import { shallow } from 'enzyme';

import TableFiltersBar from './TableFiltersBar.component';
import WeekFilter from '../WeekFilter';

test('output jsx of table filters bar component', () => {
    const component = shallow(<TableFiltersBar />);
    expect(component).toBeDefined();
    expect(component.find('div.tableFiltersBar')).toHaveLength(1);
    expect(component.find(WeekFilter)).toHaveLength(1);
});
