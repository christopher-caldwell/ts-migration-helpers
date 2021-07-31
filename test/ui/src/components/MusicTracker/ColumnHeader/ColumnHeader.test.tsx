import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
import { shallow, mount } from 'enzyme';

// @ts-expect-error ts-migrate(2739) FIXME: Type '{ addedStyle: string; name: string; width: n... Remove this comment to see the full error message
import ColumnHeader from './ColumnHeader.component';

const props = {
    addedStyle: 'cssClassString',
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ addedStyle: string; name: string; width: n... Remove this comment to see the full error message
    name: 'Title/Artist',
    width: 200,
};

test('component output', () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ expandButton: boolean; addedStyle: string;... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ addedStyle: string; name: string; width: n... Remove this comment to see the full error message
    const component = shallow(<ColumnHeader {...props} />);
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ expandButton: boolean; addedStyle: string;... Remove this comment to see the full error message
    expect(component.find('button.columnHeaderButton')).toHaveLength(1);
    expect(component.find('button.columnHeaderButton').text()).toEqual(props.name);
});

test('should render ExpandButton component when required', () => {
    const options = { ...props, expandButton: true };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ expandButton: boolean; addedStyle: string;... Remove this comment to see the full error message
    const component = shallow(<ColumnHeader {...options} />);
    expect(component.find('ExpandButton')).toHaveLength(1);
});
