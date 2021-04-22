import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextButton = ({
    text, className, disabled, onClick,
}) => (
    <button
        type="button"
        className={classNames(`btn-text ${className}`, {
            'btn-text--disabled': disabled,
        })}
        disabled={disabled}
        onClick={onClick}
        title={text}
    >
        {text}
    </button>
);

TextButton.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

TextButton.defaultProps = {
    className: '',
    disabled: false,
    onClick: () => {},
};

export default TextButton;
