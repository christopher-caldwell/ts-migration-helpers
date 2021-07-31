// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import DefaulItemRenderer from './default-item-renderer';

const renderButton = (options = {}) => shallow(<DefaulItemRenderer checked={false} onClick={options.onClick || (() => {})} />);

describe('<DefaulItemRenderer />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-option-label')).toHaveLength(1);
    });
});
