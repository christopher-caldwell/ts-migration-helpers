import React from 'react';

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
