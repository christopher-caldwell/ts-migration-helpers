// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'opened' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'opened' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MinusPlus = ({ opened, ...props }) => (
    <button className={classNames('minus-plus', { opened })} {...props} title="Toggle" type="button" />
);

MinusPlus.propTypes = {
    opened: PropTypes.bool.isRequired,
};

export default MinusPlus;
