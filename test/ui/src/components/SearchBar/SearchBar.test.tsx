import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'shallow' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'shallow' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'shallow' is declared but its value is never read.
import { shallow, mount } from 'enzyme';

// @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeHolder: string; searchbarStyle: strin... Remove this comment to see the full error message
import SearchBar from './SearchBar.component';

// shared props
const props = {
    placeHolder: 'Artist or Song',
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeHolder: string; searchbarStyle: strin... Remove this comment to see the full error message
    searchbarStyle: 'searchbarStyle',
};

test('jsx output of searchbar component', () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeHolder: string; searchbarStyle: strin... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeHolder: string; searchbarStyle: strin... Remove this comment to see the full error message
    const component = mount(<SearchBar {...props} />);
    expect(component).toBeDefined();

    expect(component.find('input').prop('placeholder')).toEqual(props.placeHolder);
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeHolder: string; searchbarStyle: strin... Remove this comment to see the full error message
    expect(component.find('div.searchbar')).toHaveLength(1);
    expect(component.find('div.icon')).toHaveLength(1);
});

test('resetting the search value', () => {
    const updatedProps = Object.assign(props, { handleResetSearch: jest.fn() });
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeHolder: string; searchbarStyle: strin... Remove this comment to see the full error message
    const component = mount(<SearchBar {...updatedProps} />);

    component.find('input').simulate('change', { target: { value: 'Shut Up and Dance!' } });
    component.find('input').simulate('change', { target: { value: '' } });
    component.find('input').simulate('change', { target: { value: 'Shut Up and Dance' } });
    expect(component.find('input').prop('value')).toEqual('Shut Up and Dance');
    expect(updatedProps.handleResetSearch).toHaveBeenCalledTimes(1);
});
