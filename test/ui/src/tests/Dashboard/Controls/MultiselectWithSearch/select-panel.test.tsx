// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../../../src/components/Con... Remove this comment to see the full error message
import SelectPanel from '../../../../src/components/Controls/MultiselectWithSearch/select-panel';

const renderButton = () => (
    shallow(
        <SelectPanel
            ItemRenderer={() => {}}
            onSelectedChanged={() => {}}
            options={[]}
            selected={[]}
        />,
    )
);

describe('<SelectPanel />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-panel')).toHaveLength(1);
    });

    it('onKeyDown should work', () => {
        const keyDownEvent = {
            which: 0,
            stopPropagation: () => {},
            preventDefault: () => {},
        };
        const component = renderButton();
        component.simulate('keyDown', keyDownEvent);
        keyDownEvent.which = 38;
        component.simulate('keyDown', keyDownEvent);
        keyDownEvent.which = 40;
        component.simulate('keyDown', keyDownEvent);
    });
});
