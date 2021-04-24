import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchBar from './SearchBar.component';

// shared props
const props = {
    placeHolder: 'Artist or Song',
    searchbarStyle: 'searchbarStyle',
};

test('jsx output of searchbar component', () => {
    const component = mount(<SearchBar {...props} />);
    expect(component).toBeDefined();

    expect(component.find('input').prop('placeholder')).toEqual(props.placeHolder);
    expect(component.find('div.searchbar')).toHaveLength(1);
    expect(component.find('div.icon')).toHaveLength(1);
});

test('resetting the search value', () => {
    const updatedProps = Object.assign(props, { handleResetSearch: jest.fn() });
    const component = mount(<SearchBar {...updatedProps} />);

    component.find('input').simulate('change', { target: { value: 'Shut Up and Dance!' } });
    component.find('input').simulate('change', { target: { value: '' } });
    component.find('input').simulate('change', { target: { value: 'Shut Up and Dance' } });
    expect(component.find('input').prop('value')).toEqual('Shut Up and Dance');
    expect(updatedProps.handleResetSearch).toHaveBeenCalledTimes(1);
});
