// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'itemId' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'itemId' implicitly has an 'any' t... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'checked' implicitly has an 'any' ... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
const CustomCheckbox = ({ item, itemId, disabled, onCheck, checked, className }) => {
    const onChange = e => (onCheck ? onCheck({ ...item, checked: e.target.checked }) : () => {});

    return (
        <div className={`custom-checkbox ${className}`}>
            <input
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
                id={itemId}
                value={item}
                type="checkbox"
                disabled={disabled}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                onChange={onChange}
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | number | undefined' is not assignab... Remove this comment to see the full error message
                checked={checked}
            />
            <label htmlFor={itemId} />
        </div>
    );
};

CustomCheckbox.propTypes = {
    item: PropTypes.shape().isRequired,
    checked: PropTypes.bool,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | number | undefined' is not assignab... Remove this comment to see the full error message
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
