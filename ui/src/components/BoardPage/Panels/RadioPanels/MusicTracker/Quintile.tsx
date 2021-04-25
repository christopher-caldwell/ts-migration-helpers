// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dataValue' implicitly has an 'any... Remove this comment to see the full error message
import PropTypes from 'prop-types';

import { resolveQuintile } from 'utils/quintileColoring';

const Quintile = ({
    children,
    colorDetails: { dataValue, colorValue, isTAA, newData = false },
}) => {
    const quintileNumber = isTAA || newData ? colorValue : resolveQuintile(dataValue);
    const className = classNames({
        'music-tracker-quintile': children,
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
