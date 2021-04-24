import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const MinusPlus = ({ opened, ...props }) => (
    <button className={classNames('minus-plus', { opened })} {...props} title="Toggle" type="button" />
);

MinusPlus.propTypes = {
    opened: PropTypes.bool.isRequired,
};

export default MinusPlus;
