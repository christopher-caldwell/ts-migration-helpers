import React from 'react';
import { shallow } from 'enzyme';

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
