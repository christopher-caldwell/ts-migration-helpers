// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Index from 'components/Controls/MultiselectWithSearch/index';

const renderButton = () => (
    shallow(
        <Index
            options={[]}
            selected={[]}
        />,
    )
);

describe('<Index />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-container')).toHaveLength(1);
    });
});
