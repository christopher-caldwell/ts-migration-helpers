// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictionItem' implicitly has a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onHourClick' implicitly has an 'a... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'restrictionItem' implicitly has a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restriction' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columns' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restriction' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
import { RANGE_OF_HOURS } from 'utils/constants';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
const RestrictionTable = ({ restrictionItem, onHourClick, handleMultiselectHours }) => {
    const isSelected = hour => {
        const { restrictionHour } = restrictionItem;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columns' implicitly has an 'any' type.
        return restrictionHour ? restrictionHour.some(restriction => restriction.hour === hour) : false;
    };

    const getRestrictionNumber = row => {
        const restrictionNumber = [];
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'restriction' implicitly has an 'any' ty... Remove this comment to see the full error message

        for (let number = row; number < 168; number += 24) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
            restrictionNumber.push(number);
        }

        return restrictionNumber;
    };

    const buildColumnsElement = columns =>
        columns.map(column => {
            const key = `restriction-table-column-${column}`;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columns' implicitly has an 'any' type.
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
                                // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                                })}
                        >
                            <i className={classNames([`icon fa fa-${iconBtn}`])} />
                        </button>
                    </td>
                );
            }
            const firstChild = columns[Object.keys(columns)[1]];
            return (
                // @ts-expect-error ts-migrate(7034) FIXME: Variable 'tableRows' implicitly has type 'any[]' i... Remove this comment to see the full error message
                <td key={key}>
                    <button
                        type="button"
                        className="btn-select-all-hours"
                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableRows' implicitly has an 'any[]' typ... Remove this comment to see the full error message
                        onClick={() => handleMultiselectHours(firstChild, true)}
                    >
                        {column}
                    </button>
                {/* @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message */}
                </td>
            );
        });

    const buildColumnsHeaders = () => {
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'tableRows' implicitly has type 'any[]' i... Remove this comment to see the full error message
        const headers = [
            {
                title: 'SUN',
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                hour: 0,
            },
            {
                title: 'MON',
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableRows' implicitly has an 'any[]' typ... Remove this comment to see the full error message
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
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    className="btn-select-all-hours"
                    onClick={() => handleMultiselectHours(item.hour)}
                >
                    {item.title}
                </button>
            </th>
        // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        ));
    };

    const buildRowsElement = () => {
        const tableRows = [];
        RANGE_OF_HOURS.forEach((row, i) => {
            tableRows.push([row].concat(getRestrictionNumber(i)));
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'tableRows' implicitly has type 'any[]' i... Remove this comment to see the full error message
        });

        return tableRows.map(rows => <tr key={`restriction-table-row-${rows}`}>{buildColumnsElement(rows)}</tr>);
    };

    return (
        <div>
            {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableRows' implicitly has an 'any[]' typ... Remove this comment to see the full error message */}
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
