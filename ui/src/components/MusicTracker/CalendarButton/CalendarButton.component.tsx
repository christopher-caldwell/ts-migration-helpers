import React, { useState } from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';

import ThreeCharacterAbv from './ThreeCharacterAbv.component';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CalendarButton.module.scss' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CalendarButton.module.scss' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'currentWeek' implicitly has an 'a... Remove this comment to see the full error message
import { calendarButton, calendarIcon, dayPicker, calendarPopOut, dayPickerParent } from './CalendarButton.module.scss';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'currentWeek' implicitly has an 'a... Remove this comment to see the full error message
const CalendarButton = ({ currentWeek, startDate }) => {
    const [calendarVisible, setCalendar] = useState(false);

    const toggleCalendar = () => {
        setCalendar(!calendarVisible);
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // this is to disable dates after the end of the previous week
    const thisPastSunday = moment.utc().startOf('week').toDate();
    const currentCalendarWeek = [{ after: thisPastSunday }];

    // sets initial month to current month
    const currentMonth = moment.utc().toDate();

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    const handleChange = e => {
        const results = handleDateChange(e);
        currentWeek(results.startDate, results.endDate);
        setCalendar(false);
    };

    // sets month title to the month of the startDate i.e. Mar 29 - Apr 2 2020 would March 2020
    const currentSelectedMonth = moment.utc(startDate).toDate();

    const handleClickOutside = () => {
        setCalendar(false);
    };

    return (
        <>
            <button className={calendarButton} onClick={toggleCalendar}>
                <i className={`fa fa-calendar-alt ${calendarIcon}`} />
            </button>
            {calendarVisible ? (
                <button className={dayPickerParent} onClick={handleClickOutside}>
                    {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message */}
                    <div className={calendarPopOut} onClick={e => e.stopPropagation()}>
                        <DayPicker
                            disabledDays={currentCalendarWeek}
                            className={dayPicker}
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
                            showOutsideDays
                            month={currentSelectedMonth}
                            toMonth={currentMonth}
                            // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
                            weekdayElement={<ThreeCharacterAbv />}
                            onDayClick={handleChange}
                        />
                    </div>
                </button>
            ) : null}
        </>
    );
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
const handleDateChange = date => {
    const startDate = moment.utc(date).startOf('week').format('YYYY-MM-DD');
    const endDate = moment.utc(date).endOf('week').format('YYYY-MM-DD');
    return {
        startDate,
        endDate,
    };
};

export { CalendarButton as default, handleDateChange };
