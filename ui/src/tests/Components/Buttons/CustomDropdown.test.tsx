import React from 'react';
import { mount } from 'enzyme';

import CustomDropdown from 'components/Buttons/CustomDropdown';

const renderCustomDropdown = (options = {}) => (
    mount(
        <CustomDropdown
            className={options.className || ''}
            disabled={options.disabled || false}
            onClick={options.onClick}
            isSelected={options.isSelected || false}
            iconName={options.iconName || 'test-name'}
            id={options.id || 'testId'}
            children={options.children || null}
            isOpened={options.isOpened}
            onToggle={options.onToggle || (() => { })}
        />,
    )
);

describe('<CustomDropdown />', () => {
    it('should render component', () => {
        const component = renderCustomDropdown();
        expect(component.find('.custom-dropdown')).toHaveLength(1);
        expect(component.find('.ml-btn-dropdown')).toHaveLength(4);
        expect(component.find({ id: 'testId' })).toHaveLength(7);
    });

    it('onClick event should work', () => {
        const spyOnClick = jest.fn();
        const component = renderCustomDropdown({
            onClick: spyOnClick,
        });
        component.find('button').simulate('click');
        expect(spyOnClick).toHaveBeenCalled();
    });

    it('custom class should work', () => {
        const component = renderCustomDropdown({
            className: 'test-custom-class',
        });
        expect(component.find('.test-custom-class')).toHaveLength(2);
    });

    it('check if the dropdown is open', () => {
        const component = renderCustomDropdown({
            isOpened: true,
        });
        expect(component.find('.fa-angle-down')).toHaveLength(1);
    });

    it('should have default onClick', () => {
        CustomDropdown.defaultProps.onClick();
        expect(CustomDropdown.defaultProps.onClick).toBeDefined();
    });

    it('should have default onToggle', () => {
        CustomDropdown.defaultProps.onToggle();
        expect(CustomDropdown.defaultProps.onToggle).toBeDefined();
    });
});
