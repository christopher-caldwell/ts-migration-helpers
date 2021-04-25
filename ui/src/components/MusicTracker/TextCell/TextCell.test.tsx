import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
import { shallow, mount } from 'enzyme';

// @ts-expect-error ts-migrate(2741) FIXME: Property 'addedStyle' is missing in type '{ width:... Remove this comment to see the full error message
import TextCell from './TextCell.component';

const props = {
    width: 250,
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'addedStyle' is missing in type '{ width:... Remove this comment to see the full error message
    text: 'Original', // mocking song version
};

test('text cell output', () => {
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'addedStyle' is missing in type '{ width:... Remove this comment to see the full error message
    const component = shallow(<TextCell {...props} />);
    expect(component).toBeDefined();
    expect(component.find('div.textCell')).toHaveLength(1);
    expect(component.find('div.textCell').text()).toEqual(props.text);
});
