import React from 'react';
import PropTypes from 'prop-types';

const CustomCheckbox = ({ item, itemId, disabled, onCheck, checked, className }) => {
    const onChange = e => (onCheck ? onCheck({ ...item, checked: e.target.checked }) : () => {});

    return (
        <div className={`custom-checkbox ${className}`}>
            <input
                id={itemId}
                value={item}
                type="checkbox"
                disabled={disabled}
                onChange={onChange}
                checked={checked}
            />
            <label htmlFor={itemId} />
        </div>
    );
};

CustomCheckbox.propTypes = {
    item: PropTypes.shape().isRequired,
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onCheck: PropTypes.func,
};

CustomCheckbox.defaultProps = {
    checked: false,
    className: '',
    disabled: false,
    itemId: null,
    onCheck: () => {},
};

export default CustomCheckbox;
