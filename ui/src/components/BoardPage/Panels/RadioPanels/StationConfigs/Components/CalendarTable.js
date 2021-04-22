/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AsideModal from 'components/AsideModal';
import { hasAllSlotsFilled, getAllAssignedSlots, daypartsWithChanges } from 'components/AsideModal/utils';
import AsideModalPanels from 'components/AsideModal/Panels';
import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';

import { FEATURE_TITLE, FEATURES, DAYPART_WEEK_RANGE, RANGE_OF_HOURS } from 'utils/constants';

class CalendarTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asideModalVisible: false,
            beginHour: null,
            endHour: null,
            selectedHours: [],
            cancelSelection: false,
        };
    }

    getDaypartHoursByDay = (currentDaypart, row) => {
        const currentDayIntervals = DAYPART_WEEK_RANGE.find(
            (currentRange) => row >= currentRange[0] && row <= currentRange[1]
        );
        const daypartInterval = currentDaypart.hours
            .filter((hour) => hour >= currentDayIntervals[0] && hour <= currentDayIntervals[1])
            .sort((a, b) => a - b);

        let interval = [];
        const result = [];
        for (let idx = 0; idx < daypartInterval.length; idx += 1) {
            if (interval.length === 0) {
                interval.push(daypartInterval[idx]);
            } else if (daypartInterval[idx] !== daypartInterval[idx - 1] + 1) {
                result.push(interval);
                interval = [];
                interval.push(daypartInterval[idx]);
            } else {
                interval.push(daypartInterval[idx]);
            }

            if (idx === daypartInterval.length - 1) {
                result.push(interval);
            }
        }

        return result;
    };

    handleClose = () => {
        this.setState({
            asideModalVisible: false,
            beginHour: null,
            endHour: null,
            selectedHours: [],
            cancelSelection: false,
        });
    };

    buildAsideModal = () => {
        const { asideModalVisible, selectedHours } = this.state;
        const { dayparts, stagedDayparts } = this.props;

        return (
            <AsideModal
                title={FEATURE_TITLE.ASSIGN_DAYPART}
                asideModalOpened={asideModalVisible}
                handleClose={this.handleClose}
            >
                <AsideModalPanels
                    featureName={FEATURES.ASSIGN_DAYPART}
                    handleClose={this.handleClose}
                    dayparts={daypartsWithChanges(dayparts, stagedDayparts)}
                    selectedHours={selectedHours}
                />
            </AsideModal>
        );
    };

    mouseDown = (hour, currentDaypart, assignedSlots) => {
        const hasOverlap = assignedSlots.includes(hour);

        if (hasOverlap) {
            const selectedHourList = this.getDaypartHoursByDay(currentDaypart, hour).find((hours) =>
                hours.includes(hour)
            );

            this.mouseLeave();
            this.setState({
                cancelSelection: true,
                asideModalVisible: true,
                selectedHours: selectedHourList,
            });
        } else {
            this.setState({
                cancelSelection: false,
                beginHour: hour,
                endHour: null,
                selectedHours: [hour],
            });
        }
    };

    mouseUp = (hour) => {
        const { cancelSelection, selectedHours } = this.state;

        if (selectedHours.length < 1) {
            return false;
        }

        if (!cancelSelection) {
            this.setState({ endHour: hour, asideModalVisible: true });
        }
        this.setState({ cancelSelection: false });
    };

    mouseOver = (selectedHour) => {
        const { beginHour, endHour } = this.state;

        if (beginHour !== null && endHour === null) {
            const selectedHourList = [beginHour];
            let ascending = true;

            if (selectedHour > beginHour) {
                for (let hour = beginHour + 1; hour <= selectedHour; hour += 1) {
                    selectedHourList.push(hour);
                }
            } else {
                for (let hour = beginHour - 1; hour >= selectedHour; hour -= 1) {
                    selectedHourList.push(hour);
                }
                ascending = false;
            }

            if (!this.validateOverlapSlots(ascending)) {
                this.setState({
                    selectedHours: selectedHourList.sort((a, b) => a - b),
                });
                this.validateOverlapSlots(ascending);
            }
        }
    };

    mouseLeave = () => {
        const { beginHour, endHour } = this.state;

        if (beginHour !== null && endHour === null) {
            this.setState({
                beginHour: null,
                endHour: null,
                selectedHours: [],
                cancelSelection: true,
            });
        }
    };

    validateOverlapSlots = (ascending) => {
        const { selectedHours } = this.state;
        const { dayparts, stagedDayparts } = this.props;

        const assignedSlots = getAllAssignedSlots(daypartsWithChanges(dayparts, stagedDayparts));
        const hasOverlap = assignedSlots.some((hour) => selectedHours.indexOf(ascending ? hour - 1 : hour + 1) !== -1);

        if (hasOverlap) {
            this.mouseUp(selectedHours[selectedHours.length - 1]);
        }

        return hasOverlap;
    };

    buildCustomTooltip = (title, type, message) => (
        <CustomTooltip type={type || 'warning'} title={title} message={message} left={15} />
    );

    buildRowsElement = (rows, assignedSlots) =>
        rows.map((row) => {
            if (typeof row === 'number') {
                const { dayparts, stagedDayparts, disabled } = this.props;
                const { selectedHours, asideModalVisible } = this.state;

                let shouldColor = false;
                let firstOfTheDay = false;
                let lastOfTheDay = false;
                let currentDaypart;

                if (assignedSlots.includes(row)) {
                    shouldColor = true;
                    currentDaypart = daypartsWithChanges(dayparts, stagedDayparts).find((daypart) =>
                        daypart.hours.includes(row)
                    );
                    if (currentDaypart) {
                        const daypartHoursByDay = this.getDaypartHoursByDay(currentDaypart, row).find((hours) =>
                            hours.includes(row)
                        );
                        firstOfTheDay = row === daypartHoursByDay[0];
                        lastOfTheDay = row === daypartHoursByDay[daypartHoursByDay.length - 1];
                    } else {
                        firstOfTheDay = row === selectedHours[0];
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
                            type: 'synchronizing',
                            displayType: 'warning',
                        };
                    }
                }

                const buildButtonElement = () => (
                    <button
                        key={`button-${row}`}
                        className={classNames('calendar-table__btn-select', {
                            'calendar-table__btn-assigned': shouldColor,
                            'calendar-table__btn-assigned--first': firstOfTheDay,
                            'calendar-table__btn-assigned--last': lastOfTheDay,
                            [`calendar-table__btn-assigned--${status && status.type}`]: status,
                        })}
                        disabled={disabled || asideModalVisible}
                        onMouseDown={() => this.mouseDown(row, currentDaypart, assignedSlots)}
                        onMouseUp={() => this.mouseUp(row)}
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
                                placement="left"
                            >
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

    buildHeaderElement = () => {
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
