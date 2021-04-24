import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import Select from 'react-select';
import range from 'lodash/range';
import chunk from 'lodash/chunk';
import last from 'lodash/last';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import union from 'lodash/union';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import { updateDaypart } from 'stores/dayparts/daypartsActions';
import { DAYPART_WEEK_RANGE } from 'utils/constants';
import { groupSequentialHours, convertHourOfWeekToHourOfDay } from 'utils/Daypart';
import ConfirmOverlay from 'components/ConfirmOverlay';
import { getAllAssignedSlots } from 'components/AsideModal/utils';
import AsideModalControls from '../Components/AsideModalControls';
import DaypartHourRangeSelector from '../Components/DaypartHourRangeSelector';

const INPUT_TYPE_REMOVE = 'remove';
const INPUT_TYPE_ADD = 'add';
const ADD_INPUT_LIST = 'addInputList';
const REMOVE_INPUT_LIST = 'removeInputList';
const INVALID_ADD_INPUT_LIST = 'invalidAddInputs';
const INVALID_REMOVE_INPUT_LIST = 'invalidRemoveInputs';
const MSG_INVALID_TIME = 'Please select a valid time range.';

class AssignDaypart extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.loadInitialState();
    }

    isDelete = true;

    weekDayOptions = [
        { value: 0, label: 'SUN' },
        { value: 1, label: 'MON' },
        { value: 2, label: 'TUE' },
        { value: 3, label: 'WED' },
        { value: 4, label: 'THU' },
        { value: 5, label: 'FRI' },
        { value: 6, label: 'SAT' },
    ];

    daypartOptions = () => {
        const { dayparts } = this.props;

        return dayparts.map(daypart => ({
            value: daypart.id,
            label: daypart.name,
        }));
    };

    getRangeChunk = weekDay => {
        if (weekDay) {
            const daypartWeekRange = DAYPART_WEEK_RANGE[weekDay.value];
            const rangeOfHours = this.getWeekDayRange(daypartWeekRange[0], daypartWeekRange[1]);

            return chunk(rangeOfHours, 12);
        }

        return [];
    };

    getWeekRangeSelected = () => {
        const { selectedHours } = this.props;

        return DAYPART_WEEK_RANGE.find(
            currentRange =>
                selectedHours[0] >= currentRange[0] &&
                selectedHours[selectedHours.length - 1] <= currentRange[1]
        );
    };

    getWeekDaySelected = () => {
        const { selectedHours } = this.props;

        return {
            weekDaySelected: this.weekDayOptions.find(
                day => day.value === DAYPART_WEEK_RANGE.indexOf(this.getWeekRangeSelected())
            ),
            newSelectedHours: selectedHours,
        };
    };

    getDaypartSelected = () => {
        const { selectedHours, dayparts } = this.props;
        const daypartObjSelected = dayparts.find(daypart =>
            selectedHours.some(hour => daypart.hours.indexOf(hour) !== -1)
        );

        if (daypartObjSelected) {
            return {
                daypartEditId: daypartObjSelected.id,
                daypartSelected: {
                    value: daypartObjSelected.id,
                    label: daypartObjSelected.name,
                },
            };
        }

        return {
            daypartEditId: null,
            daypartSelected: null,
        };
    };

    getWeekDayRange = (begin, end) => range(begin, end + 1);

    getRangeOfHoursSelected = rangeOfHours => {
        const { selectedHours } = this.props;

        const hourFrom = selectedHours[0];
        const hourTo = selectedHours[selectedHours.length - 1];
        const rangeChunk = chunk(rangeOfHours, 12);

        return {
            hourFromSelected: this.getHourSelected(rangeChunk, hourFrom),
            hourToSelected: this.getHourSelected(rangeChunk, hourTo),
        };
    };

    getHourSelected = (rangeChunk, hour) => {
        if (rangeChunk[0].includes(hour)) {
            return {
                hour: rangeChunk[0].indexOf(hour),
                period: 0, // AM
            };
        }

        return {
            hour: rangeChunk[1].indexOf(hour),
            period: 1, // PM
        };
    };

    loadInitialState = () => {
        const { dayparts } = this.props;
        const daypartWeekRange = this.getWeekRangeSelected();
        const rangeOfHours = this.getRangeOfHoursSelected(
            this.getWeekDayRange(daypartWeekRange[0], daypartWeekRange[1])
        );
        const daypart = this.getDaypartSelected();
        const weekDay = this.getWeekDaySelected();
        const hourFromSelected = !daypart.daypartEditId ? rangeOfHours.hourFromSelected : null;
        const hourToSelected = !daypart.daypartEditId ? rangeOfHours.hourToSelected : null;
        const weekDaySelected = !daypart.daypartEditId ? weekDay.weekDaySelected : null;

        // input for assigning new hours
        let inputDefaultValue = null;
        if (hourFromSelected) {
            const hourObj = this.getRange(weekDaySelected, hourFromSelected, hourToSelected);
            inputDefaultValue = range(hourObj.newHourFrom, hourObj.newHourTo + 1);
        }

        // inputs for already assigned hours
        const { daypartSelected } = daypart;
        const currentDaypart = dayparts.find(
            dp => daypartSelected && dp.name === daypartSelected.label
        );
        const sequentialHours = this.getSequencialHours(currentDaypart);
        const removeInputList = this.getRemoveInputList(sequentialHours);

        return {
            daypartEditId: daypart.daypartEditId,
            daypartSelected: daypart.daypartSelected,
            hourFromSelected,
            hourToSelected,
            weekDaySelected,
            newSelectedHours: weekDay.newSelectedHours,
            confirmMessage: '',
            addInputList: { 0: inputDefaultValue || [] },
            removeInputList,
            sequentialHours,
            invalidAddInputs: [],
            invalidRemoveInputs: [],
            incompleteAddInputs: inputDefaultValue ? [] : ['0'],
            fromEmptySlot: !isEmpty(inputDefaultValue),
        };
    };

    getSequencialHours = currentDaypart =>
        currentDaypart ? groupSequentialHours(currentDaypart.hours) : [];

    getRemoveInputList = sequentialHours =>
        sequentialHours.reduce((total, current, idx) => ({ ...total, [idx]: current }), {});

    onDaypartSelected = daypartSelected => {
        const { dayparts } = this.props;
        const currentDaypart = dayparts.find(
            daypart => daypartSelected && daypart.name === daypartSelected.label
        );
        const sequentialHours = this.getSequencialHours(currentDaypart);
        const removeInputList = this.getRemoveInputList(sequentialHours);

        this.setState({
            daypartSelected,
            daypartEditId: daypartSelected.value,
            removeInputList,
            sequentialHours,
            invalidRemoveInputs: [],
        });
    };

    reduceInputList = inputList => reduce(inputList, (result, value) => union(result, value));

    validateChanges = () => {
        const { dayparts } = this.props;
        const {
            daypartEditId,
            daypartSelected,
            addInputList,
            removeInputList,
            invalidAddInputs,
            invalidRemoveInputs,
        } = this.state;

        // Validate if has a daypart selected
        const hasDaypartSelected = daypartSelected || false;
        if (!hasDaypartSelected) {
            return {
                errorMessage: 'Please select a daypart to complete the assignment.',
                hasError: true,
            };
        }

        // Validate if the daypart selected is synchronized
        const daypartObjSelected = dayparts.find(item => item.id === daypartSelected.value);
        if (!daypartObjSelected.synchronized) {
            return {
                errorMessage: 'Only dayarts synchronized with GSelector can be changed.',
                hasError: true,
            };
        }

        // Get all assigned slots for current daypart
        const assignments = union(
            this.reduceInputList(addInputList),
            this.reduceInputList(removeInputList)
        );

        // Validate hours interval
        if (invalidAddInputs.length || invalidRemoveInputs.length) {
            return {
                errorMessage: MSG_INVALID_TIME,
                hasError: true,
            };
        }

        // Validate if there are changes
        const hasHoursChanged = !isEqual(daypartObjSelected.hours, assignments);
        const hasDaypartChanged = daypartObjSelected.id !== daypartEditId;
        if (!hasHoursChanged && !hasDaypartChanged) {
            return {
                errorMessage: 'There are no changes to save.',
                hasError: true,
                canDelete: assignments.length > 0,
            };
        }

        const filteredDayparts = dayparts.filter(daypart => daypart.id !== daypartObjSelected.id);

        // Validate if there are overlaps
        const assignedSlots = getAllAssignedSlots(filteredDayparts);
        const hasOverlap = assignedSlots.some(hour => assignments.indexOf(hour) !== -1);

        if (hasOverlap) {
            // validate if there are overlaps over unsynchronized dayparts
            const unsynchronizedDayparts = filteredDayparts.filter(
                daypart => daypart.synchronized === false
            );
            const unsynchronizedOverlap = getAllAssignedSlots(unsynchronizedDayparts).some(
                hour => assignments.indexOf(hour) !== -1
            );
            if (unsynchronizedOverlap) {
                return {
                    errorMessage: "It's not possible to overlap unsynchronized dayparts.",
                    hasError: true,
                };
            }
            return {
                errorMessage: '',
                hasError: false,
                hasOverwrite: true,
            };
        }

        // If there are no errors
        return {
            errorMessage: '',
            hasError: false,
        };
    };

    handleClose = () => {
        const { handleClose } = this.props;

        this.setState({
            daypartEditId: null,
            daypartSelected: null,
            hourFromSelected: {},
            hourToSelected: {},
            weekDaySelected: null,
            newSelectedHours: [],
        });

        handleClose();
    };

    handleSave = isDelete => {
        const {
            dayparts,
            boardDetails: {
                layout: { board },
            },
            handleClose,
            updateDaypartAction,
        } = this.props;
        const { daypartSelected, addInputList, removeInputList, newSelectedHours } = this.state;
        const daypartObjSelected = dayparts.find(item => item.id === daypartSelected.value);

        // Get all assigned slots for current daypart
        let assignments = this.reduceInputList(removeInputList);

        if (isDelete) {
            // if deleting, remove selected interval from array
            assignments = assignments.filter(hour => !newSelectedHours.includes(hour));
        } else {
            // if modifying, concatenate all input fields
            assignments = union(assignments, this.reduceInputList(addInputList));
        }

        const daypartToBeSaved = {
            ...daypartObjSelected,
            hours: assignments,
            stationId: board.id,
        };

        updateDaypartAction(daypartToBeSaved);

        handleClose();

        return daypartToBeSaved;
    };

    cancelAction = () => {
        this.setState({ confirmOverlayOpened: false });
    };

    handleAction = isDelete => {
        const validateChanges = this.validateChanges();

        if (isDelete) {
            this.setState({
                confirmOverlayOpened: true,
                confirmMessage: 'Are you sure you want to delete this assignment?',
            });
        } else if (validateChanges.hasOverwrite) {
            const message = `Some Daypart Assignments will be overwritten with these changes. Are you sure you want to
                proceed?`;
            this.setState({ confirmOverlayOpened: true, confirmMessage: message });
        } else {
            this.handleSave();
        }
    };

    inputIsValid = (weekDay, hourFrom, hourTo) =>
        has(weekDay, 'label') &&
        has(weekDay, 'value') &&
        has(hourFrom, 'hour') &&
        has(hourTo, 'hour') &&
        has(hourFrom, 'period') &&
        has(hourTo, 'period');

    getRange = (weekDay, hourFrom, hourTo) => {
        const rangeChunk = this.getRangeChunk(weekDay);
        return {
            newHourFrom: rangeChunk[hourFrom.period][hourFrom.hour],
            newHourTo: rangeChunk[hourTo.period][hourTo.hour],
        };
    };

    buildIncompleteInputsList = (inputIsValid, typeIsAdd, inputKey) => {
        const { incompleteAddInputs } = this.state;
        if (!typeIsAdd) {
            return incompleteAddInputs;
        }
        return inputIsValid
            ? incompleteAddInputs.filter(input => input !== inputKey)
            : incompleteAddInputs.concat(inputKey);
    };

    onAssignmentChanged = (weekDay, hourFrom, hourTo, inputKey, inputType) => {
        const inputListKey = inputType === INPUT_TYPE_ADD ? ADD_INPUT_LIST : REMOVE_INPUT_LIST;
        const invalidInputListKey =
            inputType === INPUT_TYPE_ADD ? INVALID_ADD_INPUT_LIST : INVALID_REMOVE_INPUT_LIST;

        let inputIsValid = this.inputIsValid(weekDay, hourFrom, hourTo);
        let hourObj;
        if (inputIsValid) {
            hourObj = this.getRange(weekDay, hourFrom, hourTo);
            inputIsValid = hourObj.newHourFrom <= hourObj.newHourTo;
        }

        const invalidInputsList = this.state[invalidInputListKey];
        const newIncompleteAddInputs = this.buildIncompleteInputsList(
            inputIsValid,
            inputType === INPUT_TYPE_ADD,
            inputKey
        );

        if (inputIsValid) {
            const newSelectedHours = range(hourObj.newHourFrom, hourObj.newHourTo + 1);
            const inputList = this.state[inputListKey];

            this.setState({
                [inputListKey]: { ...inputList, [inputKey]: newSelectedHours },
                [invalidInputListKey]: invalidInputsList.filter(input => input !== inputKey),
                incompleteAddInputs: newIncompleteAddInputs,
            });
        } else {
            this.setState({
                [invalidInputListKey]: [...invalidInputsList, inputKey],
                incompleteAddInputs: newIncompleteAddInputs,
            });
        }
    };

    addNewAssignment = () => {
        const { addInputList, incompleteAddInputs, fromEmptySlot } = this.state;
        const inputKey = parseInt(this.getLastInputkey(addInputList)) + 1;
        this.setState({
            addInputList: { ...addInputList, [inputKey]: [] },
            incompleteAddInputs: fromEmptySlot
                ? incompleteAddInputs
                : [...incompleteAddInputs, inputKey.toString()],
        });
    };

    removeAssignment = (inputKey, inputListKey) => {
        const inputList = { ...this.state[inputListKey] };
        const newInputList = reduce(
            inputList,
            (accumulator, content, currentKey) => {
                if (currentKey !== inputKey) {
                    accumulator[currentKey] = content;
                }
                return accumulator;
            },
            {}
        );
        this.setState({
            [inputListKey]: newInputList,
        });
    };

    getLastInputkey = inputList => {
        const orderedInputs = Object.keys(inputList).sort((a, b) => a - b);
        return orderedInputs[orderedInputs.length - 1];
    };

    render() {
        const { handleClose } = this.props;

        const {
            daypartEditId,
            daypartSelected,
            hourFromSelected,
            hourToSelected,
            weekDaySelected,
            confirmOverlayOpened,
            confirmMessage,
            addInputList,
            removeInputList,
            incompleteAddInputs,
        } = this.state;

        const validateChanges = this.validateChanges();
        const lastInputKey = this.getLastInputkey(addInputList);

        return (
            <div className="assign-daypart">
                {confirmOverlayOpened && (
                    <ConfirmOverlay
                        confirmAction={() => this.handleSave(this.isDelete)}
                        cancelAction={this.cancelAction}
                        confirmMessage={confirmMessage}
                    />
                )}
                <div className="assign-daypart__choose">
                    <label
                        className="assign-daypart__label"
                        htmlFor="react-select-container-daypart"
                    >
                        Select a Daypart:
                    </label>
                    <Select
                        name="react-select-container-daypart"
                        className="react-select-container"
                        clearable={false}
                        value={daypartSelected}
                        options={this.daypartOptions()}
                        placeholder="Select a Daypart"
                        onChange={this.onDaypartSelected}
                    />
                </div>
                {!isEmpty(removeInputList) && (
                    <div className="assign-daypart__content">
                        {map(removeInputList, (hoursArray, value) => {
                            const weekDay = this.weekDayOptions.find(
                                day =>
                                    day.value ===
                                    convertHourOfWeekToHourOfDay(hoursArray[0]).weekDay
                            );

                            return (
                                <DaypartHourRangeSelector
                                    key={value}
                                    inputKey={value}
                                    hourFrom={
                                        convertHourOfWeekToHourOfDay(hoursArray[0]).hourPeriod
                                    }
                                    hourTo={
                                        convertHourOfWeekToHourOfDay(last(hoursArray)).hourPeriod
                                    }
                                    weekDay={weekDay}
                                    clickAction={INPUT_TYPE_REMOVE}
                                    handleClick={() =>
                                        this.removeAssignment(value, REMOVE_INPUT_LIST)}
                                    onChange={(weekDay, hourFrom, hourTo, inputKey) =>
                                        this.onAssignmentChanged(
                                            weekDay,
                                            hourFrom,
                                            hourTo,
                                            inputKey,
                                            INPUT_TYPE_REMOVE
                                        )}
                                    daypartId={daypartEditId}
                                />
                            );
                        })}
                    </div>
                )}
                <div className="assign-daypart__content">
                    {map(addInputList, (hoursArray, value) => {
                        const isLast = value === lastInputKey;
                        const isIncomplete = incompleteAddInputs.includes(value);
                        return (
                            <DaypartHourRangeSelector
                                key={value}
                                inputKey={value}
                                hourFrom={hourFromSelected}
                                hourTo={hourToSelected}
                                weekDay={weekDaySelected}
                                clickAction={isLast ? INPUT_TYPE_ADD : INPUT_TYPE_REMOVE}
                                handleClick={
                                    isLast
                                        ? this.addNewAssignment
                                        : () => this.removeAssignment(value, ADD_INPUT_LIST)
                                }
                                onChange={(weekDay, hourFrom, hourTo, inputKey) =>
                                    this.onAssignmentChanged(
                                        weekDay,
                                        hourFrom,
                                        hourTo,
                                        inputKey,
                                        INPUT_TYPE_ADD
                                    )}
                                iconDisabled={isLast && isIncomplete}
                                tooltipMessage={isIncomplete ? MSG_INVALID_TIME : null}
                                daypartId={daypartEditId}
                            />
                        );
                    })}
                </div>
                <div className="assign-daypart__bottom-actions">
                    {daypartEditId && validateChanges.canDelete && (
                        <button
                            className="btn btn-primary assign-daypart__btn-delete"
                            type="button"
                            onClick={() => this.handleAction((this.isDelete = true))}
                        >
                            Delete
                        </button>
                    )}
                    <AsideModalControls
                        handleCancel={() => handleClose()}
                        handleSave={() => this.handleAction((this.isDelete = false))}
                        saveLabel="Save"
                        cancelLabel="Close"
                        disabled={validateChanges.hasError}
                        showTooltip
                        tooltipMessage={validateChanges.errorMessage}
                    />
                </div>
            </div>
        );
    }
}

AssignDaypart.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    dayparts: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleClose: PropTypes.func.isRequired,
    updateDaypartAction: PropTypes.func.isRequired,
    selectedHours: PropTypes.arrayOf(PropTypes.number),
};

AssignDaypart.defaultProps = {
    selectedHours: [],
};

const mapStateToProps = ({ boardDetails }) => ({ boardDetails });

const mapDispatchToProps = {
    updateDaypartAction: updateDaypart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignDaypart);
