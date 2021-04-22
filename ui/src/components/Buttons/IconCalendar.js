import React from 'react';

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
