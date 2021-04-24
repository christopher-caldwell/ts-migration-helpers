import React from 'react';
import { shallow } from 'enzyme';

import IconCalendar from 'components/Buttons/IconCalendar';

const renderIconCalendar = (options = {}) => (
    shallow(
        <IconCalendar
            disabled={options.disabled || false}
            onClick={options.onClick || (() => { })}
        />,
    )
);

describe('<IconCalendar />', () => {
    it('should render component', () => {
        const component = renderIconCalendar();
        expect(component.find('.calendar-filter__range-btn')).toHaveLength(1);
    });

    it('onClick event should work', () => {
        const spyOnClick = jest.fn();
        const component = renderIconCalendar({
            onClick: spyOnClick,
        });
        component.simulate('click');
        expect(spyOnClick).toHaveBeenCalled();
    });

    it('button should be disabled', () => {
        const component = renderIconCalendar({
            disabled: true,
        });
        expect(component.find('.calendar-filter__range-btn--disabled')).toHaveLength(1);
    });

    it('button should not be disabled', () => {
        const component = renderIconCalendar({
            disabled: false,
        });
        expect(component.find('.calendar-filter__range-btn--disabled')).toHaveLength(0);
    });

    it('should have default onClick', () => {
        IconCalendar.defaultProps.onClick();
        expect(IconCalendar.defaultProps.onClick).toBeDefined();
    });
});
