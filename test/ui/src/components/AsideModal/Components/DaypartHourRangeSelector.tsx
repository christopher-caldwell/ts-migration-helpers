// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-hour-range-selector.... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hourToInput' implicitly has an 'a... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'weekDayInput' implicitly has an '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-hour-range-selector.... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import Select from 'react-select';
// @ts-expect-error ts-migrate(6133) FIXME: 'daypartId' is declared but its value is never rea... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hourFromInput' implicitly has an ... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hourToInput' implicitly has an 'a... Remove this comment to see the full error message
import { OverlayTrigger } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'handleClick' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-hour-range-selector.... Remove this comment to see the full error message
import CustomTooltip from 'components/CustomTooltip';
import style from './daypart-hour-range-selector.module.scss';

const DaypartHourRangeSelector = ({
    // @ts-expect-error ts-migrate(6133) FIXME: 'daypartId' is declared but its value is never rea... Remove this comment to see the full error message
    hourFrom: hourFromInput,
    hourTo: hourToInput,
    weekDay: weekDayInput,
    clickAction,
    handleClick,
    onChange,
    inputKey,
    iconDisabled,
    tooltipMessage,
    daypartId: daypartIdInput,
}) => {
    const [weekDay, setWeekDay] = useState(weekDayInput);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDaySelected' implicitly has an 'any... Remove this comment to see the full error message
    const [hourFrom, setHourFrom] = useState(hourFromInput);
    const [hourTo, setHourTo] = useState(hourToInput);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    const [daypartId, setDaypartId] = useState(daypartIdInput); // eslint-disable-line
    // TODO: daypartId isn't being used, so how is this working?

    useEffect(() => {
        setWeekDay(weekDayInput);
        setHourFrom(hourFromInput);
        setHourTo(hourToInput);
        setDaypartId(daypartIdInput);
    }, [daypartIdInput, weekDayInput, hourFromInput, hourToInput]);

    // @ts-expect-error ts-migrate(6133) FIXME: 'daypartId' is declared but its value is never rea... Remove this comment to see the full error message
    const weekDayOptions = [
        { value: 0, label: 'SUN' },
        { value: 1, label: 'MON' },
        { value: 2, label: 'TUE' },
        { value: 3, label: 'WED' },
        { value: 4, label: 'THU' },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tooltipMessage' implicitly has an 'any'... Remove this comment to see the full error message
        { value: 5, label: 'FRI' },
        { value: 6, label: 'SAT' },
    ];

    const hourPeriodOptions = [
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDaySelected' implicitly has an 'any... Remove this comment to see the full error message
        { value: 0, label: 'AM' },
        { value: 1, label: 'PM' },
    ];

    const hoursOptions = [
        { value: 0, label: '12' },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: any;... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        { value: 1, label: '1' },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
        { value: 11, label: '11' },
    ];

    const onWeekdaySelected = weekDaySelected => {
        setWeekDay(weekDaySelected);
        onChange(weekDaySelected, hourFrom, hourTo, inputKey);
    };

    const onHourSelected = (e, type) => {
        const hourFromSelected = {
            ...hourFrom,
            ...(type === 'hourFrom' && { hour: e.value }),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tooltipMessage' implicitly has an 'any'... Remove this comment to see the full error message
            ...(type === 'periodFrom' && { period: e.value }),
        };

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'weekDaySelected' implicitly has an 'any... Remove this comment to see the full error message
        const hourToSelected = {
            ...hourTo,
            // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: any;... Remove this comment to see the full error message
            ...(type === 'hourTo' && { hour: e.value }),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            ...(type === 'periodTo' && { period: e.value }),
        };

        if (type === 'hourFrom' || type === 'periodFrom') {
            setHourFrom(hourFromSelected);
        }

        if (type === 'hourTo' || type === 'periodTo') {
            setHourTo(hourToSelected);
        }

        onChange(weekDay, hourFromSelected, hourToSelected, inputKey);
    };

    const buildActionButton = tooltipMessage => {
        const button = (
            <i
                className={classNames(
                    { [style.disabledButton]: iconDisabled },
                    `azure fa ${clickAction === 'add' ? 'fa-plus' : 'fa-minus'}`
                )}
            // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            />
        );
        if (!tooltipMessage) {
            return button;
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tooltipMessage' implicitly has an 'any'... Remove this comment to see the full error message
        const tooltip = (
            <CustomTooltip type="warning" title="WARNING" message={tooltipMessage} left={-20} />
        );
        return (
            <OverlayTrigger overlay={tooltip} placement="top">
                {button}
            </OverlayTrigger>
        );
    };

    return (
        <div className={style.hours}>
            <div className={style.hoursGroup}>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: any;... Remove this comment to see the full error message */}
                <label className={style.labelSmall} htmlFor="react-select-container-weekday">
                    Day:
                </label>
                <Select
                    name="react-select-container-weekday"
                    className="react-select-container-small"
                    clearable={false}
                    value={weekDay}
                    options={weekDayOptions}
                    placeholder="Select a Weekday"
                    onChange={e => onWeekdaySelected(e)}
                />
            </div>
            <div className={style.hoursGroup}>
                <label className={style.labelSmall} htmlFor="react-select-container-from-hour">
                    From:
                </label>
                <Select
                    name="react-select-container-from-hour"
                    className="react-select-container-small"
                    clearable={false}
                    value={get(hourFrom, 'hour', null)}
                    options={hoursOptions}
                    placeholder="-"
                    onChange={e => onHourSelected(e, 'hourFrom')}
                />
                <Select
                    name="react-select-container-from-period"
                    className="react-select-container-small"
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    clearable={false}
                    value={get(hourFrom, 'period', null)}
                    options={hourPeriodOptions}
                    placeholder="-"
                    onChange={e => onHourSelected(e, 'periodFrom')}
                />
            </div>
            <div className={style.hoursGroup}>
                <label className={style.labelSmall} htmlFor="react-select-container-to-hour">
                    {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                    To:
                </label>
                <Select
                    name="react-select-container-to-hour"
                    className="react-select-container-small"
                    clearable={false}
                    value={get(hourTo, 'hour', null)}
                    options={hoursOptions}
                    placeholder="-"
                    onChange={e => onHourSelected(e, 'hourTo')}
                />
                <Select
                    name="react-select-container-to-period"
                    className="react-select-container-small"
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    clearable={false}
                    value={get(hourTo, 'period', null)}
                    options={hourPeriodOptions}
                    placeholder="-"
                    onChange={e => onHourSelected(e, 'periodTo')}
                />
            </div>
            <div>
                {clickAction && (
                    <button
                        type="button"
                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                        className={`${style.actionButton} ml-btn-icon`}
                        onClick={
                            iconDisabled ? () => {} : () => handleClick(weekDay, hourFrom, hourTo)
                        }
                    >
                        {buildActionButton(tooltipMessage)}
                    </button>
                )}
            </div>
        </div>
    );
};

DaypartHourRangeSelector.propTypes = {
    hourFrom: PropTypes.shape({
        hour: PropTypes.number,
        // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        period: PropTypes.number,
    }).isRequired,
    hourTo: PropTypes.shape({
        hour: PropTypes.number,
        period: PropTypes.number,
    }).isRequired,
    weekDay: PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
    }),
    clickAction: PropTypes.string,
    daypartId: PropTypes.string,
    iconDisabled: PropTypes.bool,
    inputKey: PropTypes.string,
    handleClick: PropTypes.func,
    onChange: PropTypes.func,
    tooltipMessage: PropTypes.string,
};

DaypartHourRangeSelector.defaultProps = {
    clickAction: null,
    daypartId: '',
    iconDisabled: false,
    inputKey: '',
    handleClick: () => {},
    onChange: () => {},
    tooltipMessage: null,
};

export default DaypartHourRangeSelector;
