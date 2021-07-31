import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
import CustomDropdown from 'components/Buttons/CustomDropdown';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggle' does not exist on type '{}'.
const renderCustomDropdown = (options = {}) => (
    mount(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
        <CustomDropdown
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type '{}'.
            className={options.className || ''}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'iconName' does not exist on type '{}'.
            disabled={options.disabled || false}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
            onClick={options.onClick}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
            isSelected={options.isSelected || false}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isOpened' does not exist on type '{}'.
            iconName={options.iconName || 'test-name'}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggle' does not exist on type '{}'.
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
