// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';

const renderLoadingIndicator = () => (
    shallow(
        <LoadingIndicator />,
    )
);

describe('<LoadingIndicator />', () => {
    it('should render component', () => {
        const component = renderLoadingIndicator();
        expect(component.find('.fa-circle-notch')).toHaveLength(1);
    });
});
