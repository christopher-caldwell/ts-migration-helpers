// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'test' does not exist on type '{}'.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'test' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import If from 'components/Utilities/If';

const renderIf = (options = {}) => (
    shallow(
        <If
            test={options.test || false}
            children={<div />}
        />,
    )
);

describe('<If />', () => {
    it('should not render children', () => {
        const component = renderIf();
        expect(component.find('div')).toHaveLength(0);
    });

    it('should render children', () => {
        const component = renderIf({ test: true });
        expect(component.find('div')).toHaveLength(1);
    });
});
