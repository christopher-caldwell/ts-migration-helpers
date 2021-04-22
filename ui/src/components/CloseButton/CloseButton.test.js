import React from 'react';
import { shallow } from 'enzyme';

import CloseButton from './CloseButton.component';

test('jsx output of close button', () => {
    const component = shallow(<CloseButton />);
    expect(component).toBeDefined();
    expect(component.find('button.closeButton')).toHaveLength(1);
    expect(component.find('i.xIcon')).toHaveLength(1);
});

test('onClose runs on click', () => {
    const props = { onClose: jest.fn() };
    const component = shallow(<CloseButton {...props} />);
    component.find('button').simulate('click');
    expect(props.onClose).toHaveBeenCalled();
});
