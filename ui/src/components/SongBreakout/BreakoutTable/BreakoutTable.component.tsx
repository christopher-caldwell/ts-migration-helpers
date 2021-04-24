import React, { useState } from 'react';

import { changeDragItemLocation } from './helperFunctions';

import {
    breakoutTable,
    breakoutNameContainer,
    breakoutName,
    headerRow,
    row,
    cell,
    headerCell,
    respondent,
    dragIcon,
    arrowIcon,
    dragButton,
    dragButtonIcon,
    active,
} from './BreakoutTable.module.css';

const headers = ['respondents', 'POP', '2POP', 'PTL', 'UNF', 'NEG', 'DDL', 'NOP', 'LIK', 'FAV'];

const BreakoutTable = ({ breakouts, currentBreakoutOrder, setBreakoutOrder }) => {
    const [dragName, setDragName] = useState(undefined);
    const [[sortMetric, ascending], setSortInfo] = useState(['POP', true]);
    const [dragEnabled, setDragEnabled] = useState(true);
    const [tempBreakoutOrder, setTempBreakoutOrder] = useState(currentBreakoutOrder);

    const enterDragArea = dropIndex => {
        const newOrder = changeDragItemLocation(dropIndex, tempBreakoutOrder, dragName);
        setTempBreakoutOrder(newOrder);
    };
    const sendPrefsToParent = () => setBreakoutOrder(tempBreakoutOrder);

    const metricSort = (metric, fromDrag = false) => {
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
        setTempBreakoutOrder(newOrder.concat(noData)); // always places breakouts with data available at top
    };

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
                            <i className={`fa fa-arrow-${ascending ? 'up' : 'down'} ${arrowIcon}`} />
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
