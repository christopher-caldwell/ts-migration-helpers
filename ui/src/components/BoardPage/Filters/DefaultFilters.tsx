import React from 'react';

import PropTypes from 'prop-types';

import { Navigation } from 'components/DateRange';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'disabled' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'disabled' implicitly has an 'any'... Remove this comment to see the full error message
const OverviewFilters = ({ disabled, onFilterSave }) => (
    <div className="board-filters">
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: any; onFilterSave: any; }' is no... Remove this comment to see the full error message */}
        <Navigation disabled={disabled} onFilterSave={onFilterSave} />
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean | undefined; onFilterSav... Remove this comment to see the full error message */}
    </div>
);

export default OverviewFilters;

OverviewFilters.propTypes = {
    onFilterSave: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

OverviewFilters.defaultProps = { disabled: false };
