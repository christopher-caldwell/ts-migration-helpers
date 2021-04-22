import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconEdit = ({ className, disabled, onClick }) => (
    <button
        type="button"
        className={classNames(`ml-btn-icon ${className}`, {
            'ml-btn-icon--disabled': disabled,
        })}
        disabled={disabled}
        onClick={onClick}
    >
        <i className="fa fa-pencil" />
    </button>
);

IconEdit.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

IconEdit.defaultProps = {
    className: '',
    disabled: false,
    onClick: () => {},
};

export default IconEdit;
