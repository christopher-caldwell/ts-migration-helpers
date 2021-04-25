import React, { useState, useEffect } from 'react';
import ColumnGroupHeader from '../ColumnGroupHeader';
import ColumnHeaders from '../ColumnHeaders';
import TextCell from '../TextCell';
import Row from '../Row';
import headerConfiguration from './headerConfiguration';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../ColumnGroups/ColumnGroups.m... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../ColumnGroups/ColumnGroups.m... Remove this comment to see the full error message
import { columnGroup } from '../ColumnGroups/ColumnGroups.module.css';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'object' implicitly has an 'any' type.
const expandableTotalColumns = ['unfTotal', 'negTotal', 'ddlTotal', 'nopTotal', 'favTotal', 'likTotal'];
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const expandableCoreColumns = ['unfCore', 'negCore', 'ddlCore', 'nopCore', 'favCore', 'likCore'];

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'object' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songOrder' implicitly has an 'any... Remove this comment to see the full error message
const getValue = (object, key, attribute) => (object[key] && object[key][attribute] ? object[key][attribute] : '-');
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getCalloutTrendsAction' implicitl... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationId' implicitly has an 'any... Remove this comment to see the full error message
const formatDate = value => {
    if (value === '-') return value;
    const [year, month, day] = value.split('-');
    return `${month}/${day}/${year.substr(2, 2)}`;
};

const Callout = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songOrder' implicitly has an 'any... Remove this comment to see the full error message
    songOrder,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'columnKeys' implicitly has an 'an... Remove this comment to see the full error message
    columnKeys,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getCalloutDataAction' implicitly ... Remove this comment to see the full error message
    getCalloutDataAction,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getCalloutTrendsAction' implicitl... Remove this comment to see the full error message
    getCalloutTrendsAction,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'loading' implicitly has an 'any' ... Remove this comment to see the full error message
    loading,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCalloutData' implicitly has an... Remove this comment to see the full error message
    cmmCalloutData,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
    startDate,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'endDate' implicitly has an 'any' ... Remove this comment to see the full error message
    endDate,
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'addedStyle' is missing in type '{ key: a... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationId' implicitly has an 'any... Remove this comment to see the full error message
    stationId,
}) => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; rowIndex: any; cells: Element[];... Remove this comment to see the full error message
    const [coreExpanded, setCoreExpanded] = useState(false);
    const [totalExpanded, setTotalExpanded] = useState(false);

    useEffect(() => {
        getCalloutDataAction(stationId, startDate, endDate);
        getCalloutTrendsAction(stationId, startDate, endDate);
    }, [getCalloutDataAction, getCalloutTrendsAction, stationId, startDate, endDate]);

    let columnsToRender = [...columnKeys];
    if (!totalExpanded) {
        columnsToRender = columnsToRender.filter(key => !expandableTotalColumns.includes(key));
    }
    if (!coreExpanded) {
        columnsToRender = columnsToRender.filter(key => !expandableCoreColumns.includes(key));
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
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type. */}
            {songOrder.map((songId, songIndex) => {
                const cells = columnsToRender.map(columnKey => {
                    const value = getValue(cmmCalloutData, songId, columnKey);
                    const text = columnKey === 'popTotalPeakDate' ? formatDate(value) : value;
                    // @ts-expect-error ts-migrate(2741) FIXME: Property 'addedStyle' is missing in type '{ key: a... Remove this comment to see the full error message
                    return <TextCell key={columnKey} text={text} width={headerSetup[columnKey].width} />;
                });

                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; rowIndex: any; cells: Element[];... Remove this comment to see the full error message
                return <Row key={songId} rowIndex={songIndex} cells={cells} />;
            })}
        </div>
    );
};

export { Callout as default, headerConfiguration };
