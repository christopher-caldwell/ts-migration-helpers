import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const CategoryTab = props => {
    const { label, active, ...otherProps } = props;

    return (
        <button className={classNames('category-tab', { active })} type="button" {...otherProps}>
            {label}
        </button>
    );
};

CategoryTab.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
};

CategoryTab.defaultProps = {
    active: false,
};

export default CategoryTab;
