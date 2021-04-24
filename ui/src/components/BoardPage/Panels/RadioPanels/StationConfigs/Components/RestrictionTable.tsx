import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { RANGE_OF_HOURS } from 'utils/constants';

const RestrictionTable = ({ restrictionItem, onHourClick, handleMultiselectHours }) => {
    const isSelected = hour => {
        const { restrictionHour } = restrictionItem;
        return restrictionHour ? restrictionHour.some(restriction => restriction.hour === hour) : false;
    };

    const getRestrictionNumber = row => {
        const restrictionNumber = [];

        for (let number = row; number < 168; number += 24) {
            restrictionNumber.push(number);
        }

        return restrictionNumber;
    };

    const buildColumnsElement = columns =>
        columns.map(column => {
            const key = `restriction-table-column-${column}`;
            const iconBtn = isSelected(column) ? 'times' : 'check';
            if (typeof column === 'number') {
                return (
                    <td key={key}>
                        <button
                            type="button"
                            className={classNames('station-configs-restrictions__btn-select', {
                                'station-configs-restrictions__btn-select--selected': isSelected(column),
                            })}
                            onClick={() =>
                                onHourClick({
                                    hour: column,
                                    selected: isSelected(column),
                                })}
                        >
                            <i className={classNames([`icon fa fa-${iconBtn}`])} />
                        </button>
                    </td>
                );
            }
            const firstChild = columns[Object.keys(columns)[1]];
            return (
                <td key={key}>
                    <button
                        type="button"
                        className="btn-select-all-hours"
                        onClick={() => handleMultiselectHours(firstChild, true)}
                    >
                        {column}
                    </button>
                </td>
            );
        });

    const buildColumnsHeaders = () => {
        const headers = [
            {
                title: 'SUN',
                hour: 0,
            },
            {
                title: 'MON',
                hour: 24,
            },
            {
                title: 'TUE',
                hour: 48,
            },
            {
                title: 'WED',
                hour: 72,
            },
            {
                title: 'THU',
                hour: 96,
            },
            {
                title: 'FRI',
                hour: 120,
            },
            {
                title: 'SAT',
                hour: 144,
            },
        ];

        return headers.map(item => (
            <th key={item.title}>
                <button
                    type="button"
                    className="btn-select-all-hours"
                    onClick={() => handleMultiselectHours(item.hour)}
                >
                    {item.title}
                </button>
            </th>
        ));
    };

    const buildRowsElement = () => {
        const tableRows = [];
        RANGE_OF_HOURS.forEach((row, i) => {
            tableRows.push([row].concat(getRestrictionNumber(i)));
        });

        return tableRows.map(rows => <tr key={`restriction-table-row-${rows}`}>{buildColumnsElement(rows)}</tr>);
    };

    return (
        <div>
            <table className="ml-table restriction-table">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        {buildColumnsHeaders()}
                    </tr>
                </thead>
                <tbody>{buildRowsElement()}</tbody>
            </table>
        </div>
    );
};

RestrictionTable.defaultProps = {
    onHourClick: () => {},
    handleMultiselectHours: () => {},
};

RestrictionTable.propTypes = {
    restrictionItem: PropTypes.shape().isRequired,
    handleMultiselectHours: PropTypes.func,
    onHourClick: PropTypes.func,
};

export default RestrictionTable;
