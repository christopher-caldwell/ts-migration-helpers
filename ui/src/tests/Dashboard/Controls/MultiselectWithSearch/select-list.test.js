import React from 'react';
import { shallow } from 'enzyme';

import SelectList from '../../../../src/components/Controls/MultiselectWithSearch/select-list';

const renderButton = (options = {}) => (
    shallow(
        <SelectList
            onClick={options.onClick || (() => {})}
            onSelectedChanged={() => {}}
            options={[]}
        />,
    )
);

describe('<SelectList />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-list')).toHaveLength(1);
    });
});
