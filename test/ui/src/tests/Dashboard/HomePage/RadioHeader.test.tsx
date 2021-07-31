// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import RadioHeader from 'components/HomePage/RadioHeader';

const renderRadioHeader = () => (
    shallow(
        <RadioHeader />,
    )
);

describe('<RadioHeader />', () => {
    it('should render component', () => {
        const component = renderRadioHeader();
        expect(component.find('.dashboard-header')).toHaveLength(1);
    });
});
