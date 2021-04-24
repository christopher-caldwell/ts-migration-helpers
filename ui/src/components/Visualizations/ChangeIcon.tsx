import React from 'react';

import classNames from 'classnames';

const ChangeIcon = ({ value }) => {
    const rawValue = typeof value === 'number' ? value : value.thisPeriod - value.lastPeriod;

    const className = classNames('fa', {
        'fa-caret-up': rawValue > 0,
        'fa-caret-down': rawValue < 0,
        'change-icon-positive': rawValue > 0,
        'change-icon-negative': rawValue < 0,
    });

    return <i className={className} />;
};

export default ChangeIcon;
