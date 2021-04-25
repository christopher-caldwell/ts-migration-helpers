// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
import { shallow } from 'enzyme';

import ButtonLoadingIndicator from 'components/Utilities/ButtonLoadingIndicator';

const renderButtonLoadingIndicator = (options = {}) => (
    shallow(
        <ButtonLoadingIndicator
            loading={options.loading || true}
        />,
    )
);

describe('<ButtonLoadingIndicator />', () => {
    it('Should component render', () => {
        const component = renderButtonLoadingIndicator();
        expect(component.find('.fa-circle-notch')).toHaveLength(1);
    });
});
