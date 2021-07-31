// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ArrowWeekPicker.module.scss'... Remove this comment to see the full error message
import React from 'react';
import moment from 'moment';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'currentWeek' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ArrowWeekPicker.module.scss'... Remove this comment to see the full error message
import { arrowPicker, arrowButton, arrowIcon, dateText } from './ArrowWeekPicker.module.scss';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'currentWeek' implicitly has an 'a... Remove this comment to see the full error message
const ArrowWeekPicker = ({ currentWeek, startDate, endDate }) => {
    const onPreviousDate = () => {
        const results = cyclePeriod(-1);
        currentWeek(results.startDate, results.endDate);
    };

    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
    const onNextDate = () => {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'endDate' implicitly has an 'any' ... Remove this comment to see the full error message
        const results = cyclePeriod(1);
        currentWeek(results.startDate, results.endDate);
    };

    const cyclePeriod = (direction = 1) => {
        const { startDate, endDate } = addDays(range, 7 * direction);
        return {
            startDate: startDate.format('YYYY-MM-DD'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
            endDate: endDate.format('YYYY-MM-DD'),
        };
    };

    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
    const addDays = ({ startDate, endDate }, days) => {
        return {
            startDate: moment.utc(startDate).add(days, 'days'),
            endDate: moment.utc(endDate).add(days, 'days'),
        };
    };

    const range = {
        startDate: moment.utc(startDate),
        endDate: moment.utc(endDate),
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'direction' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
    const renderDate = ({ startDate, endDate }) => {
        if (startDate.year() !== endDate.year()) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
            return `${startDate.format('MMM D, YYYY')} - ${endDate.format('MMM D, YYYY')}`;
        }

        if (startDate.month() !== endDate.month()) {
            return `${startDate.format('MMM D')} - ${endDate.format('MMM D, YYYY')}`;
        }

        if (startDate.date() !== endDate.date()) {
            return `${startDate.format('MMMM D')} - ${endDate.format('D, YYYY')}`;
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
        return `${startDate.format('MMMM D, YYYY')}`;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'direction' implicitly has an 'any' type... Remove this comment to see the full error message
    const renderButton = (direction, onClick, disabled) => (
        <button className={arrowButton} onClick={onClick} disabled={disabled}>
            <i className={`fa fa-chevron-${direction} ${arrowIcon}`} />
        </button>
    );

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
    const renderPreviousArrow = range => {
        const nextDate = moment.utc(range.startDate).subtract(7, 'day');
        // Momemnt uses Unix Epoch as its lower date limit which Jan 1 1970
        const nextDateAllowed = nextDate.diff(moment.utc('1970-01-01').startOf('day'), 'days') >= 6;

        return renderButton('left', onPreviousDate, !nextDateAllowed);
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'range' implicitly has an 'any' type.
    const renderNextArrow = range => {
        const nextDate = moment.utc(range.endDate).add(7, 'day');
        // Allow us to go to the next period so long as it does not go beyond the period of PAST week's date.
        // The diff in days of TODAY and the LAST day of the current week.
        // Now we can only access a specific week if the diff between today and the last day of the current week is
        // already a passed week.
        const nextDateAllowed = nextDate.diff(moment.utc().startOf('day'), 'days') <= 0;

        return renderButton('right', onNextDate, !nextDateAllowed);
    };

    return (
        <div className={arrowPicker}>
            {renderPreviousArrow(range)}
            <span className={dateText}>{renderDate(range)}</span>
            {renderNextArrow(range)}
        </div>
    );
};

export default ArrowWeekPicker;
