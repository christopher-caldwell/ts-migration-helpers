import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import classNames from 'classnames';
import Image from 'components/Utilities/Image';
import CustomCheckbox from 'components/CustomCheckbox';

const StationCard = props => {
    const {
        onCheck, checked, station, className,
    } = props;

    return (
        <div
            className={classNames({
                [className]: true,
                'station-card-selected': checked,
            })}
        >
            <div className="station-card">
                {/* @ts-expect-error ts-migrate(2464) FIXME: A computed property name must be of type 'string',... Remove this comment to see the full error message */}
                <Image className="station-card-logo" alt="station logo" src={station.image_url} />
                <h5 className="station-card-name">{station.call_letters}</h5>
                <div className="station-card-location">{station.location}</div>
            </div>
            <div className="station-card-footer">
                <div className="station-card-owner">{station.owner}</div>
            </div>
            <div className="station-card-select-area">
                <CustomCheckbox item={station} className="station-card-checkbox" onCheck={onCheck} checked={checked} />
            </div>
        </div>
    );
};

StationCard.propTypes = {
    station: PropTypes.shape({
        id: PropTypes.number.isRequired,
        call_letters: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
    }).isRequired,
    onCheck: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    className: PropTypes.string,
};

StationCard.defaultProps = {
    checked: false,
    className: '',
};

export default StationCard;
