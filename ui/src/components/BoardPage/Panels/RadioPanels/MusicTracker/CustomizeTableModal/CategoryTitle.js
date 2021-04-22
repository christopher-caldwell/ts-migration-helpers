import React from 'react';

import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const CategoryTitle = ({ title, checked, disabled, onClick, beChecked, anchor, plusMinus }) => (
    <div className="category-title">
        {beChecked ? (
            <Checkbox
                checked={checked}
                className="category-title-label p3"
                disabled={disabled}
                readOnly
                onClick={onClick}
            >
                {title}
            </Checkbox>
        ) : (
            <div className="category-title-label p3">{title}</div>
        )}
        {plusMinus}
        {anchor}
    </div>
);

CategoryTitle.propTypes = {
    beChecked: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

    anchor: PropTypes.element,
    disabled: PropTypes.bool,
    plusMinus: PropTypes.element,
};

CategoryTitle.defaultProps = {
    anchor: null,
    disabled: false,
    plusMinus: null,
};

export default CategoryTitle;
