import React from 'react';
import { shallow, mount } from 'enzyme';

import TextCell from './TextCell.component';

const props = {
    width: 250,
    text: 'Original', // mocking song version
};

test('text cell output', () => {
    const component = shallow(<TextCell {...props} />);
    expect(component).toBeDefined();
    expect(component.find('div.textCell')).toHaveLength(1);
    expect(component.find('div.textCell').text()).toEqual(props.text);
});
