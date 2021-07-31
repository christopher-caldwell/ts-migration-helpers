// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectionChanged' does not exist on ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../../../src/js/Dashboard/C... Remove this comment to see the full error message
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
