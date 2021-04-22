import React from 'react';
import { shallow } from 'enzyme';

import CustomCheckbox from 'components/CustomCheckbox';

const MockItem = {
    id: 1,
};

const renderCustomCheckbox = (options = {}) => (
    shallow(
        <CustomCheckbox
            item={options.item || MockItem}
            onCheck={options.onCheck || (() => { })}
            className={options.className || null}
            disabled={options.disabled || false}
        />,
    )
);

describe('<CustomCheckbox />', () => {
    it('should render component', () => {
        const component = renderCustomCheckbox();
        expect(component.find('.custom-checkbox')).toHaveLength(1);
        component.simulate('change', { target: { value: 'test' } });
    });

    it('onChange event should work', () => {
        const mockFunction = jest.fn();
        const component = renderCustomCheckbox({ onCheck: mockFunction }).find('input');
        component.simulate('change', { target: { value: 'test' } });
        expect(mockFunction).toHaveBeenCalled();
    });

    it('custom class should work', () => {
        const component = renderCustomCheckbox({
            className: 'test-custom-class',
        });
        expect(component.find('.test-custom-class')).toHaveLength(1);
    });

    it('should have default onCheck', () => {
        CustomCheckbox.defaultProps.onCheck();
        expect(CustomCheckbox.defaultProps.onCheck).toBeDefined();
    });
});
