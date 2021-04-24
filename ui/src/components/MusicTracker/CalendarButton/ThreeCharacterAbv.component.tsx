import React from 'react';

// fn changes the standard 2 character weekday abreviation to 3 characters
const ThreeCharacterAbv = ({ weekday, className, localeUtils, locale }) => {
    const weekdayName = localeUtils
        .formatWeekdayLong(weekday, locale)
        .slice(0, 3)
        .toUpperCase();

    return <div className={className}>{weekdayName}</div>;
};

export default ThreeCharacterAbv;
