import React from 'react';
import { shallow } from 'enzyme';

import SelectPanel from './select-panel';

const renderButton = () => shallow(<SelectPanel ItemRenderer={() => {}} onSelectedChanged={() => {}} options={[]} selected={[]} />);

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
    // expect(component.find('.multiselect-panel')).toHaveLength(1);
    });
});
