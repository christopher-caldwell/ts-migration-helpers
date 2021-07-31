import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
import IconCalendar from 'components/Buttons/IconCalendar';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
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
