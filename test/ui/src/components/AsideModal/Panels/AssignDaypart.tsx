import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const ADD_INPUT_LIST = 'addInputList';
const REMOVE_INPUT_LIST = 'removeInputList';
const INVALID_ADD_INPUT_LIST = 'invalidAddInputs';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const INVALID_REMOVE_INPUT_LIST = 'invalidRemoveInputs';
const MSG_INVALID_TIME = 'Please select a valid time range.';

class AssignDaypart extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.state = this.loadInitialState();
    }

    isDelete = true;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
    weekDayOptions = [
        { value: 0, label: 'SUN' },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        { value: 1, label: 'MON' },
        { value: 2, label: 'TUE' },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        { value: 3, label: 'WED' },
        { value: 4, label: 'THU' },
        { value: 5, label: 'FRI' },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
        { value: 6, label: 'SAT' },
    ];

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
    daypartOptions = () => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number[] | undefined' is not ass... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { dayparts } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        return dayparts.map(daypart => ({
            value: daypart.id,
            label: daypart.name,
        }));
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
    getRangeChunk = weekDay => {
        if (weekDay) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'begin' implicitly has an 'any' type.
            const daypartWeekRange = DAYPART_WEEK_RANGE[weekDay.value];
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rangeOfHours' implicitly has an 'any' t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number[] | undefined' is not ass... Remove this comment to see the full error message
            const rangeOfHours = this.getWeekDayRange(daypartWeekRange[0], daypartWeekRange[1]);

            return chunk(rangeOfHours, 12);
        }

        return [];
    };

    getWeekRangeSelected = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rangeChunk' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { selectedHours } = this.props;

        return DAYPART_WEEK_RANGE.find(
            currentRange =>
                selectedHours[0] >= currentRange[0] &&
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                selectedHours[selectedHours.length - 1] <= currentRange[1]
        );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
    };

    getWeekDaySelected = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'begin' implicitly has an 'any' type.
        const { selectedHours } = this.props;

        return {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rangeOfHours' implicitly has an 'any' t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number[] | undefined' is not ass... Remove this comment to see the full error message
            weekDaySelected: this.weekDayOptions.find(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dp' implicitly has an 'any' type.
                day => day.value === DAYPART_WEEK_RANGE.indexOf(this.getWeekRangeSelected())
            ),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rangeChunk' implicitly has an 'any' typ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
            newSelectedHours: selectedHours,
        };
    };

    getDaypartSelected = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        const { selectedHours, dayparts } = this.props;
        const daypartObjSelected = dayparts.find(daypart =>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
            selectedHours.some(hour => daypart.hours.indexOf(hour) !== -1)
        );

        if (daypartObjSelected) {
            return {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sequentialHours' implicitly has an 'any... Remove this comment to see the full error message
                daypartEditId: daypartObjSelected.id,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'total' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartSelected' implicitly has an 'any... Remove this comment to see the full error message
                daypartSelected: {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                    value: daypartObjSelected.id,
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                    label: daypartObjSelected.name,
                },
            };
        }

        return {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'begin' implicitly has an 'any' type.
            daypartEditId: null,
            daypartSelected: null,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rangeOfHours' implicitly has an 'any' t... Remove this comment to see the full error message
        };
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputList' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
    getWeekDayRange = (begin, end) => range(begin, end + 1);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartEditId' does not exist on type 'R... Remove this comment to see the full error message
    getRangeOfHoursSelected = rangeOfHours => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
        const { selectedHours } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'invalidAddInputs' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dp' implicitly has an 'any' type.
        const hourFrom = selectedHours[0];
        const hourTo = selectedHours[selectedHours.length - 1];
        const rangeChunk = chunk(rangeOfHours, 12);

        return {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rangeChunk' implicitly has an 'any' typ... Remove this comment to see the full error message
            hourFromSelected: this.getHourSelected(rangeChunk, hourFrom),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sequentialHours' implicitly has an 'any... Remove this comment to see the full error message
            hour: rangeChunk[1].indexOf(hour),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'total' implicitly has an 'any' type.
            period: 1, // PM
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'current' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'idx' implicitly has an 'any' type.
    };

    loadInitialState = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartSelected' implicitly has an 'any... Remove this comment to see the full error message
        const { dayparts } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        const daypartWeekRange = this.getWeekRangeSelected();
        const rangeOfHours = this.getRangeOfHoursSelected(
            this.getWeekDayRange(daypartWeekRange[0], daypartWeekRange[1])
        );
        const daypart = this.getDaypartSelected();
        const weekDay = this.getWeekDaySelected();
        const hourFromSelected = !daypart.daypartEditId ? rangeOfHours.hourFromSelected : null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputList' implicitly has an 'any' type... Remove this comment to see the full error message
        const hourToSelected = !daypart.daypartEditId ? rangeOfHours.hourToSelected : null;
        const weekDaySelected = !daypart.daypartEditId ? weekDay.weekDaySelected : null;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDelete' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        // input for assigning new hours
        let inputDefaultValue = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartEditId' does not exist on type 'R... Remove this comment to see the full error message
        if (hourFromSelected) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
            const hourObj = this.getRange(weekDaySelected, hourFromSelected, hourToSelected);
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'invalidRemoveInputs' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dp' implicitly has an 'any' type.
            inputDefaultValue = range(hourObj.newHourFrom, hourObj.newHourTo + 1);
        }

        // inputs for already assigned hours
        const { daypartSelected } = daypart;
        const currentDaypart = dayparts.find(
            dp => daypartSelected && dp.name === daypartSelected.label
        );
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDelete' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            invalidAddInputs: [],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
            invalidRemoveInputs: [],
            incompleteAddInputs: inputDefaultValue ? [] : ['0'],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sequentialHours' implicitly has an 'any... Remove this comment to see the full error message
            fromEmptySlot: !isEmpty(inputDefaultValue),
        };
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputIsValid' implicitly has an 'any' t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'total' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'incompleteAddInputs' does not exist on t... Remove this comment to see the full error message
    getSequencialHours = currentDaypart =>
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartSelected' implicitly has an 'any... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        currentDaypart ? groupSequentialHours(currentDaypart.hours) : [];

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
    getRemoveInputList = sequentialHours =>
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        sequentialHours.reduce((total, current, idx) => ({ ...total, [idx]: current }), {});

    onDaypartSelected = daypartSelected => {
        const { dayparts } = this.props;
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const currentDaypart = dayparts.find(
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            daypart => daypartSelected && daypart.name === daypartSelected.label
        );
        const sequentialHours = this.getSequencialHours(currentDaypart);
        const removeInputList = this.getRemoveInputList(sequentialHours);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputList' implicitly has an 'any' type... Remove this comment to see the full error message
        this.setState({
            daypartSelected,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
            daypartEditId: daypartSelected.value,
            removeInputList,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            sequentialHours,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDelete' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputKey' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartEditId' does not exist on type 'R... Remove this comment to see the full error message
            invalidRemoveInputs: [],
        });
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputList' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeInputList' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartEditId' does not exist on type 'R... Remove this comment to see the full error message
    reduceInputList = inputList => reduce(inputList, (result, value) => union(result, value));

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourToSelected' does not exist on type '... Remove this comment to see the full error message
    validateChanges = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'weekDaySelected' does not exist on type ... Remove this comment to see the full error message
        const { dayparts } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmOverlayOpened' does not exist on ... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmMessage' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incompleteAddInputs' does not exist on t... Remove this comment to see the full error message
            daypartEditId,
            daypartSelected,
            addInputList,
            removeInputList,
            invalidAddInputs,
            invalidRemoveInputs,
        } = this.state;

        // Validate if has a daypart selected
        const hasDaypartSelected = daypartSelected || false;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        if (!hasDaypartSelected) {
            return {
                errorMessage: 'Please select a daypart to complete the assignment.',
                hasError: true,
            };
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDelete' implicitly has an 'any' type.
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

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // Validate hours interval
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
        if (invalidAddInputs.length || invalidRemoveInputs.length) {
            return {
                errorMessage: MSG_INVALID_TIME,
                hasError: true,
            };
        }

        // Validate if there are changes
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
        const hasHoursChanged = !isEqual(daypartObjSelected.hours, assignments);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        const hasDaypartChanged = daypartObjSelected.id !== daypartEditId;
        if (!hasHoursChanged && !hasDaypartChanged) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputIsValid' implicitly has an 'any' t... Remove this comment to see the full error message
            return {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'typeIsAdd' implicitly has an 'any' type... Remove this comment to see the full error message
                errorMessage: 'There are no changes to save.',
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                hasError: true,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
                canDelete: assignments.length > 0,
            };
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
        const filteredDayparts = dayparts.filter(daypart => daypart.id !== daypartObjSelected.id);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputType' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // Validate if there are overlaps
        const assignedSlots = getAllAssignedSlots(filteredDayparts);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        const hasOverlap = assignedSlots.some(hour => assignments.indexOf(hour) !== -1);

        if (hasOverlap) {
            // validate if there are overlaps over unsynchronized dayparts
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const unsynchronizedDayparts = filteredDayparts.filter(
                daypart => daypart.synchronized === false
            );
            const unsynchronizedOverlap = getAllAssignedSlots(unsynchronizedDayparts).some(
                hour => assignments.indexOf(hour) !== -1
            );
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            if (unsynchronizedOverlap) {
                return {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDelete' implicitly has an 'any' type.
            hasError: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputKey' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputListKey' implicitly has an 'any' t... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    handleClose = () => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        const { handleClose } = this.props;

        this.setState({
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartSelected' does not exist on type ... Remove this comment to see the full error message
            daypartEditId: null,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputList' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeInputList' does not exist on type ... Remove this comment to see the full error message
            daypartSelected: null,
            hourFromSelected: {},
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourFromSelected' does not exist on type... Remove this comment to see the full error message
            hourToSelected: {},
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourToSelected' does not exist on type '... Remove this comment to see the full error message
            weekDaySelected: null,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'weekDaySelected' does not exist on type ... Remove this comment to see the full error message
            newSelectedHours: [],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmOverlayOpened' does not exist on ... Remove this comment to see the full error message
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmMessage' does not exist on type '... Remove this comment to see the full error message
        handleClose();
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
    handleSave = isDelete => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeInputList' does not exist on type ... Remove this comment to see the full error message
        const {
            dayparts,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incompleteAddInputs' does not exist on t... Remove this comment to see the full error message
            boardDetails: {
                layout: { board },
            },
            handleClose,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDelete' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            this.setState({
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
                confirmOverlayOpened: true,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hourFrom' implicitly has an 'any' type.
                confirmMessage: 'Are you sure you want to delete this assignment?',
            });
        } else if (validateChanges.hasOverwrite) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
            const message = `Some Daypart Assignments will be overwritten with these changes. Are you sure you want to
                proceed?`;
            this.setState({ confirmOverlayOpened: true, confirmMessage: message });
        } else {
            this.handleSave();
        }
    };

    inputIsValid = (weekDay, hourFrom, hourTo) =>
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputIsValid' implicitly has an 'any' t... Remove this comment to see the full error message
        has(weekDay, 'label') &&
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputKey' implicitly has an 'any' type.
        has(weekDay, 'value') &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'incompleteAddInputs' does not exist on t... Remove this comment to see the full error message
        has(hourFrom, 'hour') &&
        has(hourTo, 'hour') &&
        has(hourFrom, 'period') &&
        has(hourTo, 'period');

    getRange = (weekDay, hourFrom, hourTo) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
        const rangeChunk = this.getRangeChunk(weekDay);
        return {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDay' implicitly has an 'any' type.
            newHourFrom: rangeChunk[hourFrom.period][hourFrom.hour],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hourTo' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const inputListKey = inputType === INPUT_TYPE_ADD ? ADD_INPUT_LIST : REMOVE_INPUT_LIST;
        const invalidInputListKey =
            inputType === INPUT_TYPE_ADD ? INVALID_ADD_INPUT_LIST : INVALID_REMOVE_INPUT_LIST;

        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        let inputIsValid = this.inputIsValid(weekDay, hourFrom, hourTo);
        let hourObj;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (inputIsValid) {
            hourObj = this.getRange(weekDay, hourFrom, hourTo);
            inputIsValid = hourObj.newHourFrom <= hourObj.newHourTo;
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
        const invalidInputsList = this.state[invalidInputListKey];
        const newIncompleteAddInputs = this.buildIncompleteInputsList(
            inputIsValid,
            inputType === INPUT_TYPE_ADD,
            inputKey
        );

        if (inputIsValid) {
            const newSelectedHours = range(hourObj.newHourFrom, hourObj.newHourTo + 1);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'addInputList' does not exist on type 'Re... Remove this comment to see the full error message
            const inputList = this.state[inputListKey];

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incompleteAddInputs' does not exist on t... Remove this comment to see the full error message
            this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromEmptySlot' does not exist on type 'R... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                [inputListKey]: { ...inputList, [inputKey]: newSelectedHours },
                [invalidInputListKey]: invalidInputsList.filter(input => input !== inputKey),
                incompleteAddInputs: newIncompleteAddInputs,
            });
        } else {
            this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                [invalidInputListKey]: [...invalidInputsList, inputKey],
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputKey' implicitly has an 'any' type.
                incompleteAddInputs: newIncompleteAddInputs,
            });
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        }
    };

    addNewAssignment = () => {
        const { addInputList, incompleteAddInputs, fromEmptySlot } = this.state;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const inputKey = parseInt(this.getLastInputkey(addInputList)) + 1;
        this.setState({
            addInputList: { ...addInputList, [inputKey]: [] },
            incompleteAddInputs: fromEmptySlot
                ? incompleteAddInputs
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputList' implicitly has an 'any' type... Remove this comment to see the full error message
                : [...incompleteAddInputs, inputKey.toString()],
        });
    };

    // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    removeAssignment = (inputKey, inputListKey) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        const inputList = { ...this.state[inputListKey] };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartEditId' does not exist on type 'R... Remove this comment to see the full error message
        const newInputList = reduce(
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartSelected' does not exist on type ... Remove this comment to see the full error message
            inputList,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourFromSelected' does not exist on type... Remove this comment to see the full error message
            (accumulator, content, currentKey) => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmOverlayOpened' does not exist on ... Remove this comment to see the full error message
                if (currentKey !== inputKey) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeInputList' does not exist on type ... Remove this comment to see the full error message
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
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    onChange={(weekDay, hourFrom, hourTo, inputKey) =>
                                        this.onAssignmentChanged(
                                            weekDay,
                                            hourFrom,
                                            hourTo,
                                            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
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
