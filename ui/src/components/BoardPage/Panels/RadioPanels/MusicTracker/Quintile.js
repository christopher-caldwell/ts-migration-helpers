import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { resolveQuintile } from 'utils/quintileColoring';

const Quintile = ({
    children,
    colorDetails: { dataValue, colorValue, isTAA, newData = false },
}) => {
    const quintileNumber = isTAA || newData ? colorValue : resolveQuintile(dataValue);
    const className = classNames({
        'music-tracker-quintile': children,
        [`music-tracker-quintile-${quintileNumber}`]: children,
    });

    return <span className={className}>{children || '-'}</span>;
};

Quintile.propTypes = {
    colorDetails: PropTypes.shape().isRequired,
    children: PropTypes.node,
};

Quintile.defaultProps = { children: undefined };

export default Quintile;
