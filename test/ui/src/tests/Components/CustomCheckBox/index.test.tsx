import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type '{}'.
import CustomCheckbox from 'components/CustomCheckbox';

const MockItem = {
    id: 1,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onCheck' does not exist on type '{}'.
const renderCustomCheckbox = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
        <CustomCheckbox
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
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
