import React, { useState } from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';

import ThreeCharacterAbv from './ThreeCharacterAbv.component';

import { calendarButton, calendarIcon, dayPicker, calendarPopOut, dayPickerParent } from './CalendarButton.module.scss';

const CalendarButton = ({ currentWeek, startDate }) => {
    const [calendarVisible, setCalendar] = useState(false);

    const toggleCalendar = () => {
        setCalendar(!calendarVisible);
    };

    // this is to disable dates after the end of the previous week
    const thisPastSunday = moment.utc().startOf('week').toDate();
    const currentCalendarWeek = [{ after: thisPastSunday }];

    // sets initial month to current month
    const currentMonth = moment.utc().toDate();

    const handleChange = (e) => {
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
                    <div className={calendarPopOut} onClick={(e) => e.stopPropagation()}>
                        <DayPicker
                            disabledDays={currentCalendarWeek}
                            className={dayPicker}
                            showOutsideDays
                            month={currentSelectedMonth}
                            toMonth={currentMonth}
                            weekdayElement={<ThreeCharacterAbv />}
                            onDayClick={handleChange}
                        />
                    </div>
                </button>
            ) : null}
        </>
    );
};

const handleDateChange = (date) => {
    const startDate = moment.utc(date).startOf('week').format('YYYY-MM-DD');
    const endDate = moment.utc(date).endOf('week').format('YYYY-MM-DD');
    return {
        startDate,
        endDate,
    };
};

export { CalendarButton as default, handleDateChange };
