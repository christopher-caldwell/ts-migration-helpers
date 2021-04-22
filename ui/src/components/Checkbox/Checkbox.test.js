import React from 'react';
import { shallow, mount } from 'enzyme';

import Checkbox from './Checkbox.component';

const props = {
    id: '123456_12345678',
    isChecked: false,
    handleCheck: jest.fn(),
};

test('checkbox component initial output', () => {
    const component = mount(<Checkbox {...props} />);
    expect(component).toBeDefined();
    expect(component.find('div.customCheckbox')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
});

test('handle check of checkbox', () => {
    const component = mount(<Checkbox {...props} />);
    expect(component.prop('handleCheck')).toBeDefined();
    component.prop('handleCheck')();
    component.setProps({ isChecked: true });
    expect(props.handleCheck).toHaveBeenCalled();
    expect(component.prop('isChecked')).toBeTruthy();
});
