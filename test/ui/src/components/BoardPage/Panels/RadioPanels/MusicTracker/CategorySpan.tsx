// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'row' implicitly has an 'any' type... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'primaryKey' implicitly has an 'an... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'row' implicitly has an 'any' type... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type '{ lastMod... Remove this comment to see the full error message
import objectGet from 'utils/objectGet';

const CategorySpan = ({ row, primaryKey, backupKey }) => {
    const category = objectGet(row, `category.${primaryKey}`) || objectGet(row, `category.${backupKey}`);
    if (category) {
        // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
        let output = utils.categoryExtractor(row.category, primaryKey, backupKey);

        if (output === '') output = '-';
        return <span>{output}</span>;
    }
    return <span>-</span>;
};

CategorySpan.propTypes = {
    // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
    backupKey: PropTypes.string.isRequired,
    primaryKey: PropTypes.string.isRequired,
    row: PropTypes.shape({
        category: PropTypes.shape({
            current: PropTypes.any,
            lastPeriod: PropTypes.any,
        }),
    }).isRequired,
};

export default CategorySpan;
