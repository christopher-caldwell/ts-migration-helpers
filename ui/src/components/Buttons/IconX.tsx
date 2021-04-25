// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'className' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'className' implicitly has an 'any... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'disabled' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconX = ({ className, disabled, onClick }) => (
    <button
        type="button"
        className={classNames(`ml-btn-icon ${className}`, {
            'ml-btn-icon--disabled': disabled,
        })}
        disabled={disabled}
        onClick={onClick}
    >
        <i className="x-button" />
    </button>
);

IconX.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

IconX.defaultProps = {
    className: '',
    disabled: false,
    onClick: () => {},
};

export default IconX;
