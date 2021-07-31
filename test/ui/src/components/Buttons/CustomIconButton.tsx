// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'iconName' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'iconName' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CustomIconButton = ({
    iconName, className, disabled, isSelected, onClick,
}) => (
    <button
        type="button"
        className={classNames(`ml-btn-icon ${className}`, {
            'ml-btn-icon--disabled': disabled,
        })}
        disabled={disabled}
        onClick={onClick}
    >
        <i
            className={classNames(`fa ${iconName}`, {
                'ml-btn-icon-selected': isSelected,
            })}
            aria-hidden="true"
        />
    </button>
);

CustomIconButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

CustomIconButton.defaultProps = {
    className: '',
    disabled: false,
    isSelected: false,
    onClick: () => {},
};

export default CustomIconButton;
