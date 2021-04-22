import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Select from 'react-select';

import { updateSongsRestriction } from 'stores/restrictions/restrictionsActions';
import SongDetails from '../Components/SongDetails';
import AsideModalControls from '../Components/AsideModalControls';

class RestrictionSingleSong extends React.Component {
    constructor(props) {
        super(props);
        const {
            selectedSong: { restriction_id: restrictionId },
            restrictions,
        } = props;
        const initialSelection = () => {
            if (restrictionId) {
                const { id, name, restrictionHour } = restrictions.find(
                    ({ id: restId }) => restId === restrictionId
                );
                return {
                    value: id,
                    label: name,
                    hours: restrictionHour.map(({ hour }) => hour),
                };
            }
            return { value: undefined, label: 'Choose restriction', hours: [] };
        };
        this.state = { selectedRestriction: initialSelection() };
    }

    handleSave = () => {
        const { selectedSong, boardId, handleUpdateSongsRestriction, handleClose } = this.props;
        const {
            selectedRestriction: { value },
        } = this.state;
        const newRestrictionId = value === 'Remove restriction' ? null : value;

        const addedSong = [{ ...selectedSong, restriction_id: newRestrictionId }];
        handleUpdateSongsRestriction(boardId, addedSong);
        handleClose();
    };

    selectRestriction = restriction => this.setState({ selectedRestriction: restriction });

    convertRestrictionHours = (restrictionHours, daysOfWeek) => {
        const intervals = [24, 48, 72, 96, 120, 144, 168]; // last hour of each day
        const dayBreaks = intervals.map(intNum =>
            restrictionHours.filter(hour => hour < intNum && hour > intNum - 24)
        ); // break the numbers into days
        const militaryHours = dayBreaks.map((day, index) =>
            day.map(hour => {
                const subtractAmount = index < 1 ? index : 24 * index;
                return hour - subtractAmount;
            })
        ); // converts day hours into 24 hour groups
        return daysOfWeek.map((day, index) => {
            const dayHours = militaryHours[index];
            const amHours = dayHours.filter(hour => hour <= 12);
            const pmHours = dayHours.filter(hour => hour > 12).map(hour => hour - 12);
            return { amHours, pmHours };
        }); // convert hours from 24 hour format to am/pm format
    };

    render() {
        const { restrictions, selectedSong, handleClose, bottomBarOpen } = this.props;
        const { selectedRestriction } = this.state;

        const selectedRestUnlessNull = selectedRestriction || {
            value: undefined,
            hours: [],
        };
        const restrictionsMinusUnsynced = restrictions.filter(rest => rest.synchronized);
        const saveButtonDisabled =
            selectedSong.restriction_id === selectedRestriction.value || !selectedRestriction.value;

        const removeSelection = {
            value: 'Remove restriction',
            label: 'Remove restriction',
        };
        const restrictionSelections = restrictionsMinusUnsynced
            .map(({ id, name, restrictionHour }) => ({
                value: id,
                label: name,
                hours: restrictionHour.map(({ hour }) => hour),
            }))
            .sort((restA, restB) => restA.label.localeCompare(restB.label));
        const dropdownSelections = selectedSong.restriction_id
            ? [removeSelection, ...restrictionSelections]
            : restrictionSelections;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const displayHours =
            selectedRestUnlessNull.value && selectedRestUnlessNull.value !== 'Remove restriction'
                ? this.convertRestrictionHours(selectedRestUnlessNull.hours, days)
                : [];

        return (
            <div className="template-song mt-restriction-container">
                <SongDetails song={selectedSong} musicTracker />
                <div className="template-song__header">
                    <p className="template-song__label">Restriction name:</p>
                </div>
                <Select
                    name="react-select-container"
                    className="react-select-container restriction-aside"
                    clearable={false}
                    value={selectedRestUnlessNull}
                    options={dropdownSelections}
                    onChange={this.selectRestriction}
                />
                <div className="restriction-hours-container">
                    {displayHours.map((dayObj, index) => (
                        <div className="restriction-modal-days" key={days[index]}>
                            <h4>{days[index]}</h4>
                            <p>{`AM - ${dayObj.amHours}`}</p>
                            <p>{`PM - ${dayObj.pmHours}`}</p>
                        </div>
                    ))}
                </div>
                <AsideModalControls
                    handleCancel={handleClose}
                    handleSave={this.handleSave}
                    saveLabel="Save"
                    cancelLabel="Close"
                    disabled={saveButtonDisabled}
                    bottomBarOpen={bottomBarOpen}
                />
            </div>
        );
    }
}

RestrictionSingleSong.propTypes = {
    boardId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateSongsRestriction: PropTypes.func.isRequired,
    restrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    selectedSong: PropTypes.shape().isRequired,
    bottomBarOpen: PropTypes.bool,
};

RestrictionSingleSong.defaultProps = {
    bottomBarOpen: false,
};

const mapStateToProps = ({ restrictions, songVersions }) => ({
    restrictions: restrictions.data,
    songs: Object.values(songVersions.data.current).map(songArr => songArr[0]),
});

const mapDispatchToProps = {
    handleUpdateSongsRestriction: updateSongsRestriction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestrictionSingleSong);
