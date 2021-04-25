import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hourFrom' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hourTo' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'weekDay' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hourFrom' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type '{}'... Remove this comment to see the full error message
import DaypartHourRangeSelector from 'components/AsideModal/Components/DaypartHourRangeSelector';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'hourTo' does not exist on type '{}'.
const renderDaypartHourRangeSelector = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'weekDay' does not exist on type '{}'.
        <DaypartHourRangeSelector
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type '{}'.
            hourFrom={options.hourFrom || {}}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type '{}'... Remove this comment to see the full error message
            hourTo={options.hourTo || {}}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'clickAction' does not exist on type '{}'... Remove this comment to see the full error message
            weekDay={options.weekDay || {}}
            onChange={options.onChange || null}
            handleClick={options.handleClick || null}
            clickAction={options.clickAction || null}
        />,
    )
);

describe('<DaypartHourRangeSelector />', () => {
    it('should render component', () => {
        const component = renderDaypartHourRangeSelector();
        expect(component.find('.hours')).toHaveLength(1);
    });

    it('should select a weekday', () => {
        const onChange = jest.fn();
        const component = renderDaypartHourRangeSelector({ onChange });
        component.find('Select').at(0).simulate('change', { value: 1, label: 'MON' });
        expect(onChange).toHaveBeenCalledWith({ value: 1, label: 'MON' }, {}, {}, '');
    });

    it('should select an hour from', () => {
        const onChange = jest.fn();
        const component = renderDaypartHourRangeSelector({ onChange });
        component.find('Select').at(1).simulate('change', { value: 8, label: '8' });
        expect(onChange).toHaveBeenCalledWith({}, { hour: 8 }, {}, '');
    });

    it('should select an period from', () => {
        const onChange = jest.fn();
        const component = renderDaypartHourRangeSelector({ onChange });
        component.find('Select').at(2).simulate('change', { value: 0, label: 'AM' });
        expect(onChange).toHaveBeenCalledWith({}, { period: 0 }, {}, '');
    });

    it('should select an hour to', () => {
        const onChange = jest.fn();
        const component = renderDaypartHourRangeSelector({ onChange });
        component.find('Select').at(3).simulate('change', { value: 8, label: '8' });
        expect(onChange).toHaveBeenCalledWith({}, {}, { hour: 8 }, '');
    });

    it('should select an period to', () => {
        const onChange = jest.fn();
        const component = renderDaypartHourRangeSelector({ onChange });
        component.find('Select').at(4).simulate('change', { value: 0, label: 'AM' });
        expect(onChange).toHaveBeenCalledWith({}, {}, { period: 0 }, '');
    });

    it('button should trigger handleClick', () => {
        const handleClick = jest.fn();
        const component = renderDaypartHourRangeSelector({
            handleClick,
            clickAction: 'add',
            hourFrom: { hour: 3, period: 0 },
            hourTo: { hour: 1, period: 1 },
            weekDay: { value: 1, label: 'AM' },
        });
        component.find('button').at(0).simulate('click');
        expect(handleClick).toHaveBeenCalledWith(
            { value: 1, label: 'AM' },
            { hour: 3, period: 0 },
            { hour: 1, period: 1 },
        );
    });
});
