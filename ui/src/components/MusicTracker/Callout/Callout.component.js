import React, { useState, useEffect } from 'react';
import ColumnGroupHeader from '../ColumnGroupHeader';
import ColumnHeaders from '../ColumnHeaders';
import TextCell from '../TextCell';
import Row from '../Row';
import headerConfiguration from './headerConfiguration';

import { columnGroup } from '../ColumnGroups/ColumnGroups.module.css';

const expandableTotalColumns = ['unfTotal', 'negTotal', 'ddlTotal', 'nopTotal', 'favTotal', 'likTotal'];
const expandableCoreColumns = ['unfCore', 'negCore', 'ddlCore', 'nopCore', 'favCore', 'likCore'];

const getValue = (object, key, attribute) => (object[key] && object[key][attribute] ? object[key][attribute] : '-');
const formatDate = (value) => {
    if (value === '-') return value;
    const [year, month, day] = value.split('-');
    return `${month}/${day}/${year.substr(2, 2)}`;
};

const Callout = ({
    songOrder,
    columnKeys,
    getCalloutDataAction,
    getCalloutTrendsAction,
    loading,
    cmmCalloutData,
    startDate,
    endDate,
    stationId,
}) => {
    const [coreExpanded, setCoreExpanded] = useState(false);
    const [totalExpanded, setTotalExpanded] = useState(false);

    useEffect(() => {
        getCalloutDataAction(stationId, startDate, endDate);
        getCalloutTrendsAction(stationId, startDate, endDate);
    }, [getCalloutDataAction, getCalloutTrendsAction, stationId, startDate, endDate]);

    let columnsToRender = [...columnKeys];
    if (!totalExpanded) {
        columnsToRender = columnsToRender.filter((key) => !expandableTotalColumns.includes(key));
    }
    if (!coreExpanded) {
        columnsToRender = columnsToRender.filter((key) => !expandableCoreColumns.includes(key));
    }
    const headerSetup = {
        ...headerConfiguration,
        ptlTotal: {
            ...headerConfiguration.ptlTotal,
            expanded: totalExpanded,
            onToggle: () => setTotalExpanded(!totalExpanded),
        },
        ptlCore: {
            ...headerConfiguration.ptlCore,
            expanded: coreExpanded,
            onToggle: () => setCoreExpanded(!coreExpanded),
        },
    };

    return (
        <div className={columnGroup}>
            <ColumnGroupHeader name="Callout" />
            <ColumnHeaders columnKeys={columnsToRender} headerSetup={headerSetup} />
            {songOrder.map((songId, songIndex) => {
                const cells = columnsToRender.map((columnKey) => {
                    const value = getValue(cmmCalloutData, songId, columnKey);
                    const text = columnKey === 'popTotalPeakDate' ? formatDate(value) : value;
                    return <TextCell key={columnKey} text={text} width={headerSetup[columnKey].width} />;
                });

                return <Row key={songId} rowIndex={songIndex} cells={cells} />;
            })}
        </div>
    );
};

export { Callout as default, headerConfiguration };
