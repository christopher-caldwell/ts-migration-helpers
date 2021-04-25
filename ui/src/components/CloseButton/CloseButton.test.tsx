import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2741) FIXME: Property 'onClose' is missing in type '{}' but req... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2741) FIXME: Property 'onClose' is missing in type '{}' but req... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import CloseButton from './CloseButton.component';

test('jsx output of close button', () => {
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClose' is missing in type '{}' but req... Remove this comment to see the full error message
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
