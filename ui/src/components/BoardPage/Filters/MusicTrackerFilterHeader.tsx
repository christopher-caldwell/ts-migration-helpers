import React from 'react';

import PropTypes from 'prop-types';

import { Navigation, Calendar } from 'components/DateRange';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'disabled' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'disabled' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: any; }' is not assignable to... Remove this comment to see the full error message
const MusicTrackerFilterHeader = ({ disabled, onFilterSave }) => (
    <div className="calendar-filter">
        <div className="calendar-filter__container-range-btn">
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: any; onFilterSave: any; }' is no... Remove this comment to see the full error message */}
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: any; }' is not assignable to... Remove this comment to see the full error message */}
            <Calendar onFilterSave={onFilterSave} />
        </div>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: any; onFilterSave: any; }' is no... Remove this comment to see the full error message */}
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: (...args: any[]) => any; }' ... Remove this comment to see the full error message */}
        <div className="calendar-filter__container-range">
            <Navigation disabled={disabled} onFilterSave={onFilterSave} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ disabled: boolean | undefined; onFilterSav... Remove this comment to see the full error message */}
        </div>
    </div>
);

export default MusicTrackerFilterHeader;

MusicTrackerFilterHeader.propTypes = {
    onFilterSave: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

MusicTrackerFilterHeader.defaultProps = { disabled: false };
