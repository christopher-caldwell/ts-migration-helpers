import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Select from 'react-select';

import { updateSongsRestriction } from 'stores/restrictions/restrictionsActions';
import SongDetails from '../Components/SongDetails';
import AsideModalControls from '../Components/AsideModalControls';

class RestrictionSingleSong extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        const {
            selectedSong: { restriction_id: restrictionId },
            restrictions,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restId' implicitly has an 'any' t... Remove this comment to see the full error message
        } = props;
        const initialSelection = () => {
            if (restrictionId) {
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hour' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restId' implicitly has an 'any' t... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restId' implicitly has an 'any' t... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hour' implicitly has an 'any' typ... Remove this comment to see the full error message
                const { id, name, restrictionHour } = restrictions.find(
                    ({ id: restId }) => restId === restrictionId
                );
                return {
                    value: id,
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restriction' implicitly has an 'any' ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restrictionHours' implicitly has an 'an... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hour' implicitly has an 'any' typ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedRestriction' does not exist on t... Remove this comment to see the full error message
                    label: name,
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                    hours: restrictionHour.map(({ hour }) => hour),
                };
            }
            return { value: undefined, label: 'Choose restriction', hours: [] };
        };
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restriction' implicitly has an 'any' ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
        this.state = { selectedRestriction: initialSelection() };
    }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restrictionHours' implicitly has an 'an... Remove this comment to see the full error message

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daysOfWeek' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rest' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    handleSave = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedRestriction' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hour' implicitly has an 'any' typ... Remove this comment to see the full error message
        const { selectedSong, boardId, handleUpdateSongsRestriction, handleClose } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restB' implicitly has an 'any' type.
        const {
            selectedRestriction: { value },
        } = this.state;
        const newRestrictionId = value === 'Remove restriction' ? null : value;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type.
        const addedSong = [{ ...selectedSong, restriction_id: newRestrictionId }];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restriction' implicitly has an 'any' ty... Remove this comment to see the full error message
        handleUpdateSongsRestriction(boardId, addedSong);
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        handleClose();
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restrictionHours' implicitly has an 'an... Remove this comment to see the full error message
    selectRestriction = restriction => this.setState({ selectedRestriction: restriction });

    convertRestrictionHours = (restrictionHours, daysOfWeek) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rest' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayObj' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        const intervals = [24, 48, 72, 96, 120, 144, 168]; // last hour of each day
        const dayBreaks = intervals.map(intNum =>
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            restrictionHours.filter(hour => hour < intNum && hour > intNum - 24)
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
        ); // break the numbers into days
        const militaryHours = dayBreaks.map((day, index) =>
            day.map(hour => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hour' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type.
                const subtractAmount = index < 1 ? index : 24 * index;
                return hour - subtractAmount;
            })
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        ); // converts day hours into 24 hour groups
        return daysOfWeek.map((day, index) => {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictions' implicitly has an '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            const dayHours = militaryHours[index];
            const amHours = dayHours.filter(hour => hour <= 12);
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type 'Re... Remove this comment to see the full error message
            const pmHours = dayHours.filter(hour => hour > 12).map(hour => hour - 12);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
            return { amHours, pmHours };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedRestriction' does not exist on t... Remove this comment to see the full error message
        }); // convert hours from 24 hour format to am/pm format
    };

    render() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayObj' implicitly has an 'any' type.
        const { restrictions, selectedSong, handleClose, bottomBarOpen } = this.props;
        const { selectedRestriction } = this.state;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rest' implicitly has an 'any' type.
        const selectedRestUnlessNull = selectedRestriction || {
            value: undefined,
            hours: [],
        };
        const restrictionsMinusUnsynced = restrictions.filter(rest => rest.synchronized);
        const saveButtonDisabled =
            selectedSong.restriction_id === selectedRestriction.value || !selectedRestriction.value;

        const removeSelection = {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            value: 'Remove restriction',
            label: 'Remove restriction',
        };
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hour' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const restrictionSelections = restrictionsMinusUnsynced
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restA' implicitly has an 'any' type.
            .map(({ id, name, restrictionHour }) => ({
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictions' implicitly has an '... Remove this comment to see the full error message
                value: id,
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songVersions' implicitly has an '... Remove this comment to see the full error message
                label: name,
                hours: restrictionHour.map(({ hour }) => hour),
            }))
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            .sort((restA, restB) => restA.label.localeCompare(restB.label));
        const dropdownSelections = selectedSong.restriction_id
            ? [removeSelection, ...restrictionSelections]
            : restrictionSelections;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const displayHours =
            selectedRestUnlessNull.value && selectedRestUnlessNull.value !== 'Remove restriction'
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayObj' implicitly has an 'any' type.
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
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    handleSave={this.handleSave}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    saveLabel="Save"
                    cancelLabel="Close"
                    disabled={saveButtonDisabled}
                    bottomBarOpen={bottomBarOpen}
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictions' implicitly has an '... Remove this comment to see the full error message
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
