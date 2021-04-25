// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
