import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'iconName' does not exist on type '{}'.
import CustomIconButton from 'components/Buttons/CustomIconButton';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
const renderCustomIconButton = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
        <CustomIconButton
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type '{}'.
            className={options.className || ''}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'iconName' does not exist on type '{}'.
            disabled={options.disabled || false}
            onClick={options.onClick || (() => { })}
            isSelected={options.isSelected || false}
            iconName={options.iconName || 'test-name'}
        />,
    )
);

describe('<CustomIconButton />', () => {
    it('should render component', () => {
        const component = renderCustomIconButton();
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('.ml-btn-icon')).toHaveLength(1);
        expect(component.find('.test-name')).toHaveLength(1);
    });

    it('onClick event should work', () => {
        const spyOnClick = jest.fn();
        const component = renderCustomIconButton({
            onClick: spyOnClick,
        });
        component.simulate('click');
        expect(spyOnClick).toHaveBeenCalled();
    });

    it('custom class should work', () => {
        const component = renderCustomIconButton({
            className: 'test-custom-class',
        });
        expect(component.find('.test-custom-class')).toHaveLength(1);
    });

    it('button should be disabled', () => {
        const component = renderCustomIconButton({
            disabled: true,
        });
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(1);
    });

    it('button should not be disabled', () => {
        const component = renderCustomIconButton({
            disabled: false,
        });
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(0);
    });

    it('should have default onClick', () => {
        CustomIconButton.defaultProps.onClick();
        expect(CustomIconButton.defaultProps.onClick).toBeDefined();
    });
});
