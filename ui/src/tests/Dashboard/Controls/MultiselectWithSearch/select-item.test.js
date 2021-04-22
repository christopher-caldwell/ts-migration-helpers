import React from 'react';
import { shallow } from 'enzyme';

import SelectItem from '../../../../src/js/Dashboard/Controls/MultiselectWithSearch/select-item';

const renderButton = (options = {}) => (
    shallow(
        <SelectItem
            checked={false}
            onClick={options.onClick || (() => {})}
            onSelectionChanged={options.onSelectionChanged || undefined}
        />,
    )
);

describe('<SelectItem />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-item-container')).toHaveLength(1);
    });

    it('onClick should trigger onSelectionChanged', () => {
        const onSelectionChanged = jest.fn();
        const component = renderButton({
            onSelectionChanged,
        });
        component.simulate('click', {
            preventDefault: () => {},
        });
        expect(onSelectionChanged).toHaveBeenCalled();
    });

    it('onKeyDown 32 should trigger onSelectionChanged', () => {
        const onSelectionChanged = jest.fn();
        const component = renderButton({
            onSelectionChanged,
        });
        component.simulate('keyDown', {
            preventDefault: () => {},
            which: 32,
        });
        expect(onSelectionChanged).toHaveBeenCalled();
    });
});
