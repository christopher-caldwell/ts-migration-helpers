// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'text' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'text' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
