import React from 'react';
import PropTypes from 'prop-types';
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
