import React from 'react';
import { connect } from 'react-redux';

import { Cell } from 'fixed-data-table-2';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getQuintileColor } from 'utils/quintileColoring';

import objectGet from 'utils/objectGet';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
import Quintile from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Quintile';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
import TrendBarChart from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TrendBarChart';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
import Sparkline from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Sparkline';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'prefix' does not exist on type 'Readonly... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
import TotalRank from './TotalRank';

class QuintileCell extends React.PureComponent {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
    onClick = e => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        e.stopPropagation();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'prefix' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
        const { columnKey, data, rowIndex, clickHandler } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'trends' does not exist on type 'Readonly... Remove this comment to see the full error message
        clickHandler(data[rowIndex], rowIndex, columnKey);
        return false;
    };

    getColorDetails = () => {
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'datasets' implicitly has type 'any[]' in... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
        const { columnKey, data, quintileKey, rowIndex, prefix, boardDetails } = this.props;
        if (quintileKey && quintileKey.includes('quintile')) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            const dataValue = objectGet(data[rowIndex][prefix], columnKey);
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
            const colorValue = objectGet(data[rowIndex][prefix], quintileKey);
            return { dataValue, colorValue, isTAA: false, newData: true };
        }

        const dataValue = quintileKey
            ? objectGet(data[rowIndex][prefix], quintileKey)
            : // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
              objectGet(data[rowIndex][prefix], columnKey);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'trends' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { hasTAA } = boardDetails.filters.applied.options;

        if (hasTAA) {
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'datasets' implicitly has an 'any[]' type... Remove this comment to see the full error message
            const isTAA = quintileKey ? quintileKey.includes('enhanced') : false;
            if (dataValue) parseFloat(dataValue);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7034) FIXME: Variable 'datasets' implicitly has type 'any[]' in... Remove this comment to see the full error message
            const colorValue = data[rowIndex][prefix].enhanced.pop.qntl
                ? data[rowIndex][prefix].enhanced.pop.qntl
                : 6;

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'child' implicitly has an 'any' type.
            return { dataValue, colorValue, isTAA };
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        return { dataValue };
    };

    getTooltipDetails = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'colorDetails' implicitly has an 'any' t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
        const { columnKey, data, hasTrend, rowIndex, trends, displayTotalRank } = this.props;
        const songName = data[rowIndex].metadata.sNm;
        const trendsEnabled = trends.enabled || false;
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        let showTrends = hasTrend && trendsEnabled;
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'datasets' implicitly has type 'any[]' in... Remove this comment to see the full error message
        const datasets = [];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'labels' implicitly has type 'any[]' in s... Remove this comment to see the full error message
        const labels = [];
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'datasets' implicitly has an 'any[]' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        const groupColumn = columnKey.split('.')[0];

        /* Trends data */
        let totalRankData = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'clickable' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
        if (showTrends) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKey' does not exist on type 'Reado... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            const trendData = trends.data.find(song => song.id === data[rowIndex].sId) || {};
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ dataValue: any; colorValue: any; isTAA: bo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'child' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ dataValue: any; colorValue: any; isTAA: bo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
            const trendMetric = !isEmpty(trendData) ? objectGet(trendData, columnKey, {}) : {};
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'colorDetails' implicitly has an 'any' t... Remove this comment to see the full error message
            const rankData = groupColumn && get(trendData[groupColumn], displayTotalRank);

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipTitle' does not exist on type 'Re... Remove this comment to see the full error message
            // convert {date:value} into [value] for sparkline component
            Object.keys(trendMetric)
                .sort(
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                    (a, b) =>
                        // @ts-expect-error ts-migrate(2363) FIXME: The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
                        moment.utc(b, 'YYYY-MM-DD').toDate() - moment.utc(a, 'YYYY-MM-DD').toDate()
                )
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
                .forEach(dateKey => {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                    datasets.unshift(trendMetric[dateKey]);
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    labels.unshift(dateKey);
                });

            if (datasets.length <= 1) showTrends = false;

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'datasets' implicitly has an 'any[]' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            totalRankData = (rankData && Object.values(rankData).reverse()) || [];
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
        return { datasets, labels, showTrends, songName, totalRankData };
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clickable' does not exist on type 'Reado... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowIndex' does not exist on type 'Readon... Remove this comment to see the full error message
    getStatus = () => {
        const { similarStations, rowIndex, columnKey } = this.props;
        const isActive =
            similarStations.open &&
            similarStations.selectedRowIndex === rowIndex &&
            similarStations.selectedMetricKey === columnKey;

        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ dataValue: any; colorValue: any; isTAA: bo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'child' implicitly has an 'any' type.
        return classNames({ activeCell: isActive });
    };

    wrapWithButton = child => (
        <button
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ dataValue: any; colorValue: any; isTAA: bo... Remove this comment to see the full error message
            className="btn-anchor quintile-wrapper quintile-button-click"
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'colorDetails' implicitly has an 'any' t... Remove this comment to see the full error message
            type="button"
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipTitle' does not exist on type 'Re... Remove this comment to see the full error message
            onClick={this.onClick}
        >
            {child}
        </button>
    );

    renderTooltip = colorDetails => {
        const { tooltipTitle } = this.props;
        const { datasets, labels, songName, totalRankData } = this.getTooltipDetails();
        const calloutColors = datasets ? datasets.map(datum => getQuintileColor(datum)) : null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const taaColors = datasets ? datasets.map(() => getQuintileColor(6, true)) : null;
        const backgroundColors = colorDetails.isTAA ? taaColors : calloutColors;

        return (
            <Tooltip className="tooltip-component-tag" id={shortid.generate()}>
                <div className="description">
                    {tooltipTitle ? <p className="title p3">{tooltipTitle}</p> : null}
                    <p className="subtitle p3">{songName}</p>
                </div>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type. */}
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songTrends' implicitly has an 'an... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type. */}
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedCalloutTrend... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedOmtTrends' i... Remove this comment to see the full error message */}
                <TrendBarChart labels={labels} data={datasets} colorDetails={colorDetails} />
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type. */}
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
                <div className="total-rank-label-container">
                    {totalRankData.length > 0 &&
                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                        totalRankData.map((data, index) => (
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                            <TotalRank
                                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'clickable' does not exist on type 'Reado... Remove this comment to see the full error message
                                key={`tooltip-total-rank-${index}`} // eslint-disable-line
                                data={data}
                                color={backgroundColors[index]}
                            />
                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                        ))}
                </div>
            </Tooltip>
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        );
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    renderQuintile = () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const { clickable, columnKey, rowIndex, data, prefix } = this.props;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; showTrends: any; colorDetai... Remove this comment to see the full error message
        const { datasets, showTrends } = this.getTooltipDetails();
        const colorDetails = this.getColorDetails();
        const canClick = clickable && colorDetails.dataValue > 0;
        const numValue = objectGet(data[rowIndex][prefix], columnKey);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        const quintileChild = (
            <div className={this.getStatus()}>
                <Quintile showTrends={showTrends} colorDetails={colorDetails}>
                    {numValue}
                </Quintile>
                {showTrends ? <Sparkline data={datasets} colorDetails={colorDetails} /> : null}
            </div>
        );

        if (showTrends) {
            const tooltipWrapper = (
                <div className={this.getStatus()}>
                    <OverlayTrigger
                        delayShow={300}
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                        placement="left"
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowIndex' does not exist on type 'Readon... Remove this comment to see the full error message
                        overlay={this.renderTooltip(colorDetails)}
                    >
                        <div className="trend-quintile-container">{quintileChild}</div>
                    </OverlayTrigger>
                </div>
            );
            return canClick ? this.wrapWithButton(tooltipWrapper) : tooltipWrapper;
        }
        return canClick ? this.wrapWithButton(quintileChild) : quintileChild;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
    render() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cmmData' implicitly has an 'any' type.
        const { data, columnKey, rowIndex, className } = this.props;
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const { showTrends } = this.getTooltipDetails();
        const cellProps = { columnKey, data, rowIndex };
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songTrends' implicitly has an 'an... Remove this comment to see the full error message
        const cName = classNames({ 'show-trends': showTrends, className });

        return (
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmOmtTrends' implicitly has an '... Remove this comment to see the full error message
            <div className={className}>
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedCalloutTrend... Remove this comment to see the full error message */}
                <Cell {...cellProps} className={cName}>
                    {this.renderQuintile()}
                </Cell>
            {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedOmtTrends' i... Remove this comment to see the full error message */}
            {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
            {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            </div>
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'rowIndex' implicitly has an 'any'... Remove this comment to see the full error message
        );
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'columnKey' implicitly has an 'any... Remove this comment to see the full error message
    }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
const mergeCmmData = (songId, cmmData) => {
    const getColumnValue = column => {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const songCmmTrends = Object.values(cmmData).find(song => song.songId === songId);
        const dateValue = get(songCmmTrends, column, null);
        // Adds 7 days to workaround the tooptip
        return (
            dateValue &&
            Object.entries(dateValue).reduce(
                (total, [date, item]) => ({
                    ...total,
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    [moment(date).add(7, 'days').format('YYYY-MM-DD')]: item.value,
                }),
                {}
            )
        );
    };
    const getColumnRank = column => {
        const songCmmTrends = Object.values(cmmData).find(song => song.songId === songId);
        const dateRank = get(songCmmTrends, column, null);
        // Adds 7 days to workaround the tooptip
        return (
            dateRank &&
            Object.entries(dateRank).reduce(
                (total, [date, item]) => ({
                    ...total,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                    [moment(date).add(7, 'days').format('YYYY-MM-DD')]: item.rank,
                }),
                {}
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            )
        );
    };
    return {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        pop: {
            scoreRank: getColumnRank('popCore'),
            score: getColumnValue('popCore'),
            totalRank: getColumnRank('popTotal'),
            total: getColumnValue('popTotal'),
            tPeakScore: getColumnValue('popTotalPeak'),
            tPeakDt: getColumnValue('popTotalPeakDate'),
            aa: getColumnValue('popAa'),
            hisp: getColumnValue('popHispanic'),
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            aahisp: getColumnValue('popAaHisp'),
            white: getColumnValue('popWhite'),
            asian: getColumnValue('popAsian'),
            male: getColumnValue('popMale'),
            female: getColumnValue('popFemale'),
            young: getColumnValue('popYoung'),
            old: getColumnValue('popOld'),
            consolidated1TotalRank: getColumnValue('popTotalConsolidated1Rank'),
            consolidated1Total: getColumnValue('popTotalConsolidated1'),
            consolidated2TotalRank: getColumnValue('popTotalConsolidated2Rank'),
            consolidated2Total: getColumnValue('popTotalConsolidated2'),
            consolidated3TotalRank: getColumnValue('popTotalConsolidated3Rank'),
            consolidated3Total: getColumnValue('popTotalConsolidated3'),
            metricKey: 'pop.score',
        },
        '2pop': {
            score: getColumnValue('twoPopCore'),
            total: getColumnValue('twoPopTotal'),
            hisp: getColumnValue('twoPopHispanic'),
            white: getColumnValue('twoPopWhite'),
            asian: getColumnValue('twoPopAsian'),
            aa: getColumnValue('twoPopAa'),
            aahisp: getColumnValue('twoPopAaHisp'),
            male: getColumnValue('twoPopMale'),
            female: getColumnValue('twoPopFemale'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songTrends' implicitly has an 'an... Remove this comment to see the full error message
            young: getColumnValue('twoPopYoung'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmOmtTrends' implicitly has an '... Remove this comment to see the full error message
            old: getColumnValue('twoPopOld'),
        },
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedCalloutTrend... Remove this comment to see the full error message
        ptl: {
            score: getColumnValue('ptlCore'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedOmtTrends' i... Remove this comment to see the full error message
            total: getColumnValue('ptlTotal'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'similarStations' implicitly has a... Remove this comment to see the full error message
            hisp: getColumnValue('ptlHispanic'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
            white: getColumnValue('ptlWhite'),
            asian: getColumnValue('ptlAsian'),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            aa: getColumnValue('ptlAa'),
            aahisp: getColumnValue('ptlAaHisp'),
            male: getColumnValue('ptlMale'),
            female: getColumnValue('ptlFemale'),
            young: getColumnValue('ptlYoung'),
            old: getColumnValue('ptlOld'),
        },
    };
};

const mapStateToProps = (
    {
        songTrends,
        cmmOmtTrends: { data: cmmOmtTrends },
        cmmCustomConsolidatedCalloutTrends: { data: cmmCustomConsolidatedCalloutTrends },
        cmmCustomConsolidatedOmtTrends: { data: cmmCustomConsolidatedOmtTrends },
        similarStations,
        boardDetails,
    },
    { data, rowIndex, columnKey }
) => {
    const songId = data[rowIndex].sId;
    const trendsIndex = songTrends.data.findIndex(item => item.id === songId);
    const isOmt = columnKey.startsWith('omt.') && !cmmOmtTrends.loading && !cmmOmtTrends.error;
    const isCustomCallout =
        columnKey.startsWith('customCallout.') &&
        !cmmCustomConsolidatedCalloutTrends.loading &&
        !cmmCustomConsolidatedCalloutTrends.error;
    const isCustomOmt =
        columnKey.startsWith('customOmt.') &&
        !cmmCustomConsolidatedOmtTrends.loading &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        !cmmCustomConsolidatedOmtTrends.error;

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const songIdTrends = {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        ...(trendsIndex >= 0 ? songTrends.data[trendsIndex] : { id: songId }),
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        ...(isOmt && { omt: mergeCmmData(songId, cmmOmtTrends) }),
        ...(isCustomCallout && {
            customCallout: mergeCmmData(songId, cmmCustomConsolidatedCalloutTrends),
        }),
        ...(isCustomOmt && { customOmt: mergeCmmData(songId, cmmCustomConsolidatedOmtTrends) }),
    };

    const trends = {
        ...songTrends,
        data: [
            ...songTrends.data.slice(0, trendsIndex),
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            songIdTrends,
            ...songTrends.data.slice(trendsIndex + 1),
        ],
    };

    return {
        trends,
        similarStations,
        boardDetails,
    };
};

QuintileCell.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    similarStations: PropTypes.shape().isRequired,
    trends: PropTypes.shape().isRequired,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
    clickable: PropTypes.bool,
    columnKey: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.any),
    displayTotalRank: PropTypes.string,
    hasTrend: PropTypes.bool,
    prefix: PropTypes.string,
    quintileKey: PropTypes.string,
    rowIndex: PropTypes.number,
    tooltipTitle: PropTypes.string,
};

QuintileCell.defaultProps = {
    className: null,
    clickable: false,
    clickHandler: () => {},
    columnKey: undefined,
    data: null,
    displayTotalRank: '',
    hasTrend: false,
    prefix: 'metrics',
    quintileKey: undefined,
    rowIndex: undefined,
    tooltipTitle: undefined,
};

export default connect(mapStateToProps)(QuintileCell);
