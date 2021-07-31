import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
import { shallow, mount } from 'enzyme';

// @ts-expect-error ts-migrate(2741) FIXME: Property 'currentWeek' is missing in type '{ start... Remove this comment to see the full error message
import CalendarButton, { handleDateChange } from './CalendarButton.component';

// @ts-expect-error ts-migrate(2741) FIXME: Property 'currentWeek' is missing in type '{ start... Remove this comment to see the full error message
test('jsx output of calendar button', () => {
    const props = {
        startDate: '2020-05-31',
    };
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'currentWeek' is missing in type '{ start... Remove this comment to see the full error message
    const component = shallow(<CalendarButton {...props} />);
    expect(component.find('button.calendarButton')).toHaveLength(1);
    expect(component.find('i.fa-calendar-alt')).toHaveLength(1);

    // displaying of calendar
    component.find('button.calendarButton').simulate('click');
    expect(component.find('.calendarPopOut')).toHaveLength(1);
    component.find('button.calendarButton').simulate('click');
    expect(component.find('.calendarPopOut')).toHaveLength(0);
});

test('test output of filterSongData component function', () => {
    expect(handleDateChange('2020-05-31')).toEqual(
        expect.objectContaining({ startDate: '2020-05-31', endDate: '2020-06-06' })
    );
    expect(handleDateChange('2020-05-24')).toEqual(
        expect.objectContaining({ startDate: '2020-05-24', endDate: '2020-05-30' })
    );
    expect(handleDateChange('2020-03-29')).toEqual(
        expect.objectContaining({ startDate: '2020-03-29', endDate: '2020-04-04' })
    );
});
