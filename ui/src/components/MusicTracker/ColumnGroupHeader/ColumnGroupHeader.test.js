import React from 'react';
import { shallow, mount } from 'enzyme';

import ColumnGroupHeader from './ColumnGroupHeader.component';

test('output is corrent group name', () => {
    const props = { name: 'Test Name' };
    const component = shallow(<ColumnGroupHeader {...props} />);
    const output = component.find('div.columnGroupName');
    expect(component).toBeDefined();
    expect(output).toHaveLength(1);
    expect(output.text()).toEqual('Test Name');
});
