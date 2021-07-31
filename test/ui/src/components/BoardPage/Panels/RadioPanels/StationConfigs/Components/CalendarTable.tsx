/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import AsideModal from 'components/AsideModal';
import { hasAllSlotsFilled, getAllAssignedSlots, daypartsWithChanges } from 'components/AsideModal/utils';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import AsideModalPanels from 'components/AsideModal/Panels';
import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
import { FEATURE_TITLE, FEATURES, DAYPART_WEEK_RANGE, RANGE_OF_HOURS } from 'utils/constants';

class CalendarTable extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
        super(props);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
        this.state = {
            asideModalVisible: false,
            beginHour: null,
            endHour: null,
            selectedHours: [],
            cancelSelection: false,
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
    getDaypartHoursByDay = (currentDaypart, row) => {
        const currentDayIntervals = DAYPART_WEEK_RANGE.find(
            (currentRange) => row >= currentRange[0] && row <= currentRange[1]
        );
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalVisible' does not exist on typ... Remove this comment to see the full error message
        const daypartInterval = currentDaypart.hours
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            .filter((hour) => hour >= currentDayIntervals[0] && hour <= currentDayIntervals[1])
            .sort((a, b) => a - b);

        let interval = [];
        const result = [];
        for (let idx = 0; idx < daypartInterval.length; idx += 1) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: () => vo... Remove this comment to see the full error message
            if (interval.length === 0) {
                interval.push(daypartInterval[idx]);
            } else if (daypartInterval[idx] !== daypartInterval[idx - 1] + 1) {
                result.push(interval);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalVisible' does not exist on typ... Remove this comment to see the full error message
                interval = [];
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
                interval.push(daypartInterval[idx]);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
            } else {
                interval.push(daypartInterval[idx]);
            }

            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            if (idx === daypartInterval.length - 1) {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                result.push(interval);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelSelection' does not exist on type ... Remove this comment to see the full error message
            }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        }

        return result;
    };

    handleClose = () => {
        this.setState({
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: () => vo... Remove this comment to see the full error message
            asideModalVisible: false,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedHour' implicitly has an 'any' t... Remove this comment to see the full error message
            beginHour: null,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'beginHour' does not exist on type 'Reado... Remove this comment to see the full error message
            endHour: null,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'endHour' does not exist on type 'Readonl... Remove this comment to see the full error message
            selectedHours: [],
            cancelSelection: false,
        });
    };

    buildAsideModal = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalVisible' does not exist on typ... Remove this comment to see the full error message
        const { asideModalVisible, selectedHours } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { dayparts, stagedDayparts } = this.props;

        return (
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            <AsideModal
                title={FEATURE_TITLE.ASSIGN_DAYPART}
                asideModalOpened={asideModalVisible}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'beginHour' does not exist on type 'Reado... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: () => vo... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ascending' implicitly has an 'any' type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelSelection' does not exist on type ... Remove this comment to see the full error message
                handleClose={this.handleClose}
            >
                <AsideModalPanels
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                    featureName={FEATURES.ASSIGN_DAYPART}
                    handleClose={this.handleClose}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedHour' implicitly has an 'any' t... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
                    dayparts={daypartsWithChanges(dayparts, stagedDayparts)}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
                    selectedHours={selectedHours}
                />
            </AsideModal>
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
    mouseDown = (hour, currentDaypart, assignedSlots) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        const hasOverlap = assignedSlots.includes(hour);

        if (hasOverlap) {
            const selectedHourList = this.getDaypartHoursByDay(currentDaypart, hour).find((hours) =>
                // @ts-expect-error ts-migrate(7034) FIXME: Variable 'currentDaypart' implicitly has type 'any... Remove this comment to see the full error message
                hours.includes(hour)
            );

            this.mouseLeave();
            this.setState({
                cancelSelection: true,
                asideModalVisible: true,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                selectedHours: selectedHourList,
            });
        } else {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'beginHour' does not exist on type 'Reado... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelSelection' does not exist on type ... Remove this comment to see the full error message
                cancelSelection: false,
                beginHour: hour,
                endHour: null,
                selectedHours: [hour],
            });
        }
    };

    mouseUp = (hour) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ascending' implicitly has an 'any' type... Remove this comment to see the full error message
        const { cancelSelection, selectedHours } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        if (selectedHours.length < 1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedHour' implicitly has an 'any' t... Remove this comment to see the full error message
            return false;
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'beginHour' does not exist on type 'Reado... Remove this comment to see the full error message
        if (!cancelSelection) {
            this.setState({ endHour: hour, asideModalVisible: true });
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
        this.setState({ cancelSelection: false });
    };

    mouseOver = (selectedHour) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
        const { beginHour, endHour } = this.state;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'assignedSlots' implicitly has an 'any' ... Remove this comment to see the full error message
        if (beginHour !== null && endHour === null) {
            const selectedHourList = [beginHour];
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'status' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            let ascending = true;

            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
            if (selectedHour > beginHour) {
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
                for (let hour = beginHour + 1; hour <= selectedHour; hour += 1) {
                    selectedHourList.push(hour);
                }
            } else {
                // @ts-expect-error ts-migrate(7034) FIXME: Variable 'currentDaypart' implicitly has type 'any... Remove this comment to see the full error message
                for (let hour = beginHour - 1; hour >= selectedHour; hour -= 1) {
                    selectedHourList.push(hour);
                }
                ascending = false;
            }

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
            if (!this.validateOverlapSlots(ascending)) {
                this.setState({
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'beginHour' does not exist on type 'Reado... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
                    selectedHours: selectedHourList.sort((a, b) => a - b),
                });
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                this.validateOverlapSlots(ascending);
            }
        }
    };

    mouseLeave = () => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const { beginHour, endHour } = this.state;

        if (beginHour !== null && endHour === null) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ascending' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
                beginHour: null,
                endHour: null,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                selectedHours: [],
                cancelSelection: true,
            });
        }
    };

    validateOverlapSlots = (ascending) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalVisible' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { selectedHours } = this.state;
        const { dayparts, stagedDayparts } = this.props;

        const assignedSlots = getAllAssignedSlots(daypartsWithChanges(dayparts, stagedDayparts));
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
        const hasOverlap = assignedSlots.some((hour) => selectedHours.indexOf(ascending ? hour - 1 : hour + 1) !== -1);

        if (hasOverlap) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
            this.mouseUp(selectedHours[selectedHours.length - 1]);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'assignedSlots' implicitly has an 'any' ... Remove this comment to see the full error message
        }

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
        return hasOverlap;
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
    buildCustomTooltip = (title, type, message) => (
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'status' implicitly has an 'any' type.
        <CustomTooltip type={type || 'warning'} title={title} message={message} left={15} />
    );

    buildRowsElement = (rows, assignedSlots) =>
        rows.map((row) => {
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
            if (typeof row === 'number') {
                // @ts-expect-error ts-migrate(7034) FIXME: Variable 'currentDaypart' implicitly has type 'any... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
                const { dayparts, stagedDayparts, disabled } = this.props;
                const { selectedHours, asideModalVisible } = this.state;

                let shouldColor = false;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                let firstOfTheDay = false;
                let lastOfTheDay = false;
                let currentDaypart;

                if (assignedSlots.includes(row)) {
                    shouldColor = true;
                    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                    currentDaypart = daypartsWithChanges(dayparts, stagedDayparts).find((daypart) =>
                        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                        daypart.hours.includes(row)
                    );
                    if (currentDaypart) {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
                        const daypartHoursByDay = this.getDaypartHoursByDay(currentDaypart, row).find((hours) =>
                            hours.includes(row)
                        );
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                        firstOfTheDay = row === daypartHoursByDay[0];
                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
                        lastOfTheDay = row === daypartHoursByDay[daypartHoursByDay.length - 1];
                    } else {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
                        firstOfTheDay = row === selectedHours[0];
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                        lastOfTheDay = row === selectedHours[selectedHours.length - 1];
                    }
                }

                const isPendingApproval =
                    currentDaypart && stagedDayparts.some((daypart) => daypart.id === currentDaypart.id);

                let status;
                if (isPendingApproval) {
                    status = {
                        title: 'Pending Approval',
                        message:
                            'This item has been modified and requires approval before it can be synced with GSelector.',
                        type: 'waiting',
                        displayType: 'info',
                    };
                } else {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalVisible' does not exist on typ... Remove this comment to see the full error message
                    if (currentDaypart && currentDaypart.synchronized) {
                        status = {
                            title: 'Synchronized',
                            message: 'This item has been successfully synced with GSelector.',
                            type: 'synchronized',
                            displayType: 'synced',
                        };
                    }
                    if (currentDaypart && !currentDaypart.synchronized) {
                        status = {
                            title: 'Synchronizing',
                            message: 'This item is being synchronized with GSelector, it will turn green eventually.',
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'status' implicitly has an 'any' type.
                            type: 'synchronizing',
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            displayType: 'warning',
                        };
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
                    }
                }

                const buildButtonElement = () => (
                    <button
                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
                        key={`button-${row}`}
                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'currentDaypart' implicitly has an 'any' ... Remove this comment to see the full error message
                        className={classNames('calendar-table__btn-select', {
                            'calendar-table__btn-assigned': shouldColor,
                            'calendar-table__btn-assigned--first': firstOfTheDay,
                            'calendar-table__btn-assigned--last': lastOfTheDay,
                            [`calendar-table__btn-assigned--${status && status.type}`]: status,
                        })}
                        disabled={disabled || asideModalVisible}
                        onMouseDown={() => this.mouseDown(row, currentDaypart, assignedSlots)}
                        onMouseUp={() => this.mouseUp(row)}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
                        onMouseOver={() => this.mouseOver(row)}
                    >
                        {firstOfTheDay && currentDaypart && currentDaypart.name}
                    </button>
                );

                return (
                    <div className="calendar-table__cell" key={`cell-${row}`}>
                        {shouldColor && status && !asideModalVisible ? (
                            <OverlayTrigger
                                overlay={this.buildCustomTooltip(status.title, status.displayType, status.message)}
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
                                placement="left"
                            >
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message */}
                                {buildButtonElement()}
                            </OverlayTrigger>
                        ) : (
                            buildButtonElement()
                        )}
                    </div>
                );
            }

            return (
                <div className="calendar-table__cell" key={`cell-${row}`}>
                    {row}
                </div>
            );
        });

    getRestrictionNumberByColumn = (col) => {
        const restrictionNumber = [];

        for (let number = (col - 1) * 24; number < col * 24; number += 1) {
            restrictionNumber.push(number);
        }

        return restrictionNumber;
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalVisible' does not exist on typ... Remove this comment to see the full error message
    buildHeaderElement = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const headerCols = ['', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

        return headerCols.map((col) => (
            <div className="calendar-table__col" key={`calendar-table__col-${col}`}>
                <div className="calendar-table__cell">{col}</div>
            </div>
        ));
    };

    buildColsElement = () => {
        const { selectedHours } = this.state;
        const { dayparts, stagedDayparts } = this.props;

        const tableCols = [];
        for (let i = 0; i <= 7; i += 1) {
            if (i === 0) {
                tableCols.push(RANGE_OF_HOURS);
            } else {
                tableCols.push(this.getRestrictionNumberByColumn(i));
            }
        }

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const assignedSlots = getAllAssignedSlots(daypartsWithChanges(dayparts, stagedDayparts));

        return tableCols.map((rows) => (
            <div className="calendar-table__col" onMouseLeave={this.mouseLeave} key={`calendar-table__col-${rows[0]}`}>
                {this.buildRowsElement(rows, [...assignedSlots, ...selectedHours])}
            </div>
        ));
    };

    render() {
        const { asideModalVisible } = this.state;
        const { dayparts, stagedDayparts } = this.props;
        const hasError = !hasAllSlotsFilled(dayparts, stagedDayparts);

        return (
            <div className="calendar-table">
                <div className="calendar-table__header">{this.buildHeaderElement()}</div>
                <div
                    className={classNames('calendar-table__content', {
                        'calendar-table__content--error': hasError,
                    })}
                >
                    {asideModalVisible && this.buildAsideModal()}
                    {this.buildColsElement()}
                </div>
            </div>
        );
    }
}

CalendarTable.defaultProps = {
    disabled: false,
};

CalendarTable.propTypes = {
    dayparts: PropTypes.arrayOf(PropTypes.object).isRequired,
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    disabled: PropTypes.bool,
};

export default CalendarTable;
