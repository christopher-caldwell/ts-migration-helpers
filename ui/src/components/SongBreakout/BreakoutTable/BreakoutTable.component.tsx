// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { useState } from 'react';

import { changeDragItemLocation } from './helperFunctions';

import {
    breakoutTable,
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './BreakoutTable.module.css' or... Remove this comment to see the full error message
    breakoutNameContainer,
    breakoutName,
    headerRow,
    row,
    cell,
    headerCell,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'breakouts' implicitly has an 'any... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './BreakoutTable.module.css' or... Remove this comment to see the full error message
    respondent,
    dragIcon,
    arrowIcon,
    dragButton,
    dragButtonIcon,
    active,
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'breakouts' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dropIndex' implicitly has an 'any' type... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './BreakoutTable.module.css' or... Remove this comment to see the full error message
} from './BreakoutTable.module.css';

const headers = ['respondents', 'POP', '2POP', 'PTL', 'UNF', 'NEG', 'DDL', 'NOP', 'LIK', 'FAV'];

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'metric' implicitly has an 'any' type.
const BreakoutTable = ({ breakouts, currentBreakoutOrder, setBreakoutOrder }) => {
    const [dragName, setDragName] = useState(undefined);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakName' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dropIndex' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakA' implicitly has an 'any' type.
    const [[sortMetric, ascending], setSortInfo] = useState(['POP', true]);
    const [dragEnabled, setDragEnabled] = useState(true);
    const [tempBreakoutOrder, setTempBreakoutOrder] = useState(currentBreakoutOrder);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'metric' implicitly has an 'any' type.
    const enterDragArea = dropIndex => {
        const newOrder = changeDragItemLocation(dropIndex, tempBreakoutOrder, dragName);
        setTempBreakoutOrder(newOrder);
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakName' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'metric' implicitly has an 'any' type.
    const sendPrefsToParent = () => setBreakoutOrder(tempBreakoutOrder);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakName' implicitly has an 'any' type... Remove this comment to see the full error message
    const metricSort = (metric, fromDrag = false) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakA' implicitly has an 'any' type.
        const asc = !fromDrag && sortMetric === metric ? !ascending : ascending;
        const hasData = tempBreakoutOrder.filter(breakName => breakouts[breakName] && true);
        const noData = tempBreakoutOrder.filter(breakName => !breakouts[breakName]);
        const newOrder = hasData.sort((breakA, breakB) => {
            if (!breakouts[breakA] || !breakouts[breakB]) return 0;
            const dataA = breakouts[breakA][metric];
            const dataB = breakouts[breakB][metric];
            return asc ? dataA - dataB : dataB - dataA;
        });
        setDragEnabled(false);
        setSortInfo([metric, asc]);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'metric' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
        setTempBreakoutOrder(newOrder.concat(noData)); // always places breakouts with data available at top
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
    const setToPreference = () => {
        setDragEnabled(!dragEnabled);
        return !dragEnabled ? setTempBreakoutOrder(currentBreakoutOrder) : metricSort(sortMetric, true);
    };
    const activeHeader = metric => !dragEnabled && metric === sortMetric;

    return (
        <>
            <div className={headerRow}>
                <div className={breakoutNameContainer}>
                    Breakout Name
                    <button className={`${dragButton}${dragEnabled ? ` ${active}` : ''}`} onClick={setToPreference}>
                        <i className={`fa fa-exchange-alt ${dragButtonIcon}`} />
                    </button>
                </div>
                {headers.map(header => (
                    <button
                        className={`${headerCell}${activeHeader(header) ? ` ${active}` : ''}`}
                        key={header}
                        onClick={() => metricSort(header)}
                    >
                        {header.substring(0, 4)}
                        {activeHeader(header) ? (
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
                            <i className={`fa fa-arrow-${ascending ? 'up' : 'down'} ${arrowIcon}`} />
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
                        ) : null}
                    </button>
                ))}
            </div>
            <div className={breakoutTable}>
                {tempBreakoutOrder.map((name, index) => {
                    const getData = datum => (breakouts[name] ? breakouts[name][datum] : '-');
                    return (
                        <div
                            className={row}
                            key={name}
                            draggable={dragEnabled}
                            onDragStart={() => setDragName(name)}
                            onDragOver={e => e.preventDefault()}
                            onDragEnter={() => enterDragArea(index)}
                            onDrop={sendPrefsToParent}
                        >
                            <div className={breakoutNameContainer}>
                                {dragEnabled ? <div className={dragIcon} /> : null}
                                <span className={breakoutName}>{name}</span>
                            </div>
                            {headers.map(dataName => {
                                const data = getData(dataName);
                                const redResp = (dataName === 'respondents' && data < 25) || '';
                                return (
                                    <div className={`${cell}${redResp && ` ${respondent}`}`} key={dataName}>
                                        {data}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export { headers, BreakoutTable as default };
