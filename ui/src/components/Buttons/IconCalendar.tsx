// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onClick' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onClick' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconCalendar = ({ onClick, disabled }) => (
    <button
        type="button"
        className={classNames('calendar-filter__range-btn', {
            'calendar-filter__range-btn--disabled': disabled,
        })}
        disabled={disabled}
        onClick={onClick}
    >
        <i className="fa fa-calendar-alt" />
    </button>
);

export default IconCalendar;

IconCalendar.propTypes = { disabled: PropTypes.bool, onClick: PropTypes.func };

IconCalendar.defaultProps = { disabled: false, onClick: () => {} };
