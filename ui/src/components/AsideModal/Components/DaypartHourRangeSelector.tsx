import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';
import style from './daypart-hour-range-selector.module.scss';

const DaypartHourRangeSelector = ({
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
    const [hourFrom, setHourFrom] = useState(hourFromInput);
    const [hourTo, setHourTo] = useState(hourToInput);
    const [daypartId, setDaypartId] = useState(daypartIdInput); // eslint-disable-line
    // TODO: daypartId isn't being used, so how is this working?

    useEffect(() => {
        setWeekDay(weekDayInput);
        setHourFrom(hourFromInput);
        setHourTo(hourToInput);
        setDaypartId(daypartIdInput);
    }, [daypartIdInput, weekDayInput, hourFromInput, hourToInput]);

    const weekDayOptions = [
        { value: 0, label: 'SUN' },
        { value: 1, label: 'MON' },
        { value: 2, label: 'TUE' },
        { value: 3, label: 'WED' },
        { value: 4, label: 'THU' },
        { value: 5, label: 'FRI' },
        { value: 6, label: 'SAT' },
    ];

    const hourPeriodOptions = [
        { value: 0, label: 'AM' },
        { value: 1, label: 'PM' },
    ];

    const hoursOptions = [
        { value: 0, label: '12' },
        { value: 1, label: '1' },
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
            ...(type === 'periodFrom' && { period: e.value }),
        };

        const hourToSelected = {
            ...hourTo,
            ...(type === 'hourTo' && { hour: e.value }),
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
            />
        );
        if (!tooltipMessage) {
            return button;
        }
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
                    clearable={false}
                    value={get(hourFrom, 'period', null)}
                    options={hourPeriodOptions}
                    placeholder="-"
                    onChange={e => onHourSelected(e, 'periodFrom')}
                />
            </div>
            <div className={style.hoursGroup}>
                <label className={style.labelSmall} htmlFor="react-select-container-to-hour">
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
