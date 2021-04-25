// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'weekday' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'weekday' implicitly has an 'any' ... Remove this comment to see the full error message
// fn changes the standard 2 character weekday abreviation to 3 characters
const ThreeCharacterAbv = ({ weekday, className, localeUtils, locale }) => {
    const weekdayName = localeUtils
        .formatWeekdayLong(weekday, locale)
        .slice(0, 3)
        .toUpperCase();

    return <div className={className}>{weekdayName}</div>;
};

export default ThreeCharacterAbv;
