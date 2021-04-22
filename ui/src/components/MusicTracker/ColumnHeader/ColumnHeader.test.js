import React from 'react';
import { shallow, mount } from 'enzyme';

import ColumnHeader from './ColumnHeader.component';

const props = {
    addedStyle: 'cssClassString',
    name: 'Title/Artist',
    width: 200,
};

test('component output', () => {
    const component = shallow(<ColumnHeader {...props} />);
    expect(component.find('button.columnHeaderButton')).toHaveLength(1);
    expect(component.find('button.columnHeaderButton').text()).toEqual(props.name);
});

test('should render ExpandButton component when required', () => {
    const options = { ...props, expandButton: true };
    const component = shallow(<ColumnHeader {...options} />);
    expect(component.find('ExpandButton')).toHaveLength(1);
});
