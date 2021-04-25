import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
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
