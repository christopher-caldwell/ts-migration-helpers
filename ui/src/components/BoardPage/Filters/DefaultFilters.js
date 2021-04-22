import React from 'react';

import PropTypes from 'prop-types';

import { Navigation } from 'components/DateRange';

const OverviewFilters = ({ disabled, onFilterSave }) => (
    <div className="board-filters">
        <Navigation disabled={disabled} onFilterSave={onFilterSave} />
    </div>
);

export default OverviewFilters;

OverviewFilters.propTypes = {
    onFilterSave: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

OverviewFilters.defaultProps = { disabled: false };
