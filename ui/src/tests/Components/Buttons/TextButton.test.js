import React from 'react';
import { shallow } from 'enzyme';

import TextButton from 'components/Buttons/TextButton';

const renderTextButton = (options = {}) => (
    shallow(
        <TextButton
            className={options.className || ''}
            disabled={options.disabled || false}
            onClick={options.onClick || (() => { })}
            text={options.text || 'test text'}
        />,
    )
);

describe('<TextButton />', () => {
    it('should render component', () => {
        const component = renderTextButton();
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('button').text()).toBe('test text');
    });

    it('onClick event should work', () => {
        const spyOnClick = jest.fn();
        const component = renderTextButton({
            onClick: spyOnClick,
        });
        component.simulate('click');
        expect(spyOnClick).toHaveBeenCalled();
    });

    it('custom class should work', () => {
        const component = renderTextButton({
            className: 'test-custom-class',
        });
        expect(component.find('.test-custom-class')).toHaveLength(1);
    });

    it('button should be disabled', () => {
        const component = renderTextButton({
            disabled: true,
        });
        expect(component.find('.btn-text--disabled')).toHaveLength(1);
    });

    it('button should not be disabled', () => {
        const component = renderTextButton({
            disabled: false,
        });
        expect(component.find('.btn-text--disabled')).toHaveLength(0);
    });

    it('should have default onClick', () => {
        TextButton.defaultProps.onClick();
        expect(TextButton.defaultProps.onClick).toBeDefined();
    });
});
