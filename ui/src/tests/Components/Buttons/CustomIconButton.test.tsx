import React from 'react';
import { shallow } from 'enzyme';

import CustomIconButton from 'components/Buttons/CustomIconButton';

const renderCustomIconButton = (options = {}) => (
    shallow(
        <CustomIconButton
            className={options.className || ''}
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
