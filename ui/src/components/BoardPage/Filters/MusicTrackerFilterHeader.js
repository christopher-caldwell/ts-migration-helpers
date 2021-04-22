import React from 'react';

import PropTypes from 'prop-types';

import { Navigation, Calendar } from 'components/DateRange';

const MusicTrackerFilterHeader = ({ disabled, onFilterSave }) => (
    <div className="calendar-filter">
        <div className="calendar-filter__container-range-btn">
            <Calendar onFilterSave={onFilterSave} />
        </div>
        <div className="calendar-filter__container-range">
            <Navigation disabled={disabled} onFilterSave={onFilterSave} />
        </div>
    </div>
);

export default MusicTrackerFilterHeader;

MusicTrackerFilterHeader.propTypes = {
    onFilterSave: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

MusicTrackerFilterHeader.defaultProps = { disabled: false };
