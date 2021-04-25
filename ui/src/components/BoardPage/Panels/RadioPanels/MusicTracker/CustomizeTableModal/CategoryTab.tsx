// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
