import React from 'react';

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
