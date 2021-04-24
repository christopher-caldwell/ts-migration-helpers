import React from 'react';

import PropTypes from 'prop-types';

import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import objectGet from 'utils/objectGet';

const CategorySpan = ({ row, primaryKey, backupKey }) => {
    const category = objectGet(row, `category.${primaryKey}`) || objectGet(row, `category.${backupKey}`);
    if (category) {
        let output = utils.categoryExtractor(row.category, primaryKey, backupKey);

        if (output === '') output = '-';
        return <span>{output}</span>;
    }
    return <span>-</span>;
};

CategorySpan.propTypes = {
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
