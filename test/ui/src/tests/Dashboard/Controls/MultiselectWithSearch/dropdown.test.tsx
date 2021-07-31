// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../../../src/components/Con... Remove this comment to see the full error message
import Dropdown from '../../../../src/components/Controls/MultiselectWithSearch/dropdown';

const renderButton = () => (
    shallow(
        <Dropdown
            contentComponent={() => {}}
            contentProps={{}}
        />,
    )
);

describe('<DropDown />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-dropdown-container')).toHaveLength(1);
    });
});
