import React from 'react';
import { connect } from 'react-redux';

import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getQuintileColor } from 'utils/quintileColoring';

import objectGet from 'utils/objectGet';
import Quintile from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Quintile';
import TrendBarChart from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TrendBarChart';
import Sparkline from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Sparkline';
import TotalRank from './TotalRank';

class QuintileCell extends React.PureComponent {
    onClick = e => {
        e.stopPropagation();
        const { columnKey, data, rowIndex, clickHandler } = this.props;
        clickHandler(data[rowIndex], rowIndex, columnKey);
        return false;
    };

    getColorDetails = () => {
        const { columnKey, data, quintileKey, rowIndex, prefix, boardDetails } = this.props;
        if (quintileKey && quintileKey.includes('quintile')) {
            const dataValue = objectGet(data[rowIndex][prefix], columnKey);
            const colorValue = objectGet(data[rowIndex][prefix], quintileKey);
            return { dataValue, colorValue, isTAA: false, newData: true };
        }

        const dataValue = quintileKey
            ? objectGet(data[rowIndex][prefix], quintileKey)
            : objectGet(data[rowIndex][prefix], columnKey);
        const { hasTAA } = boardDetails.filters.applied.options;

        if (hasTAA) {
            const isTAA = quintileKey ? quintileKey.includes('enhanced') : false;
            if (dataValue) parseFloat(dataValue);
            const colorValue = data[rowIndex][prefix].enhanced.pop.qntl
                ? data[rowIndex][prefix].enhanced.pop.qntl
                : 6;

            return { dataValue, colorValue, isTAA };
        }
        return { dataValue };
    };

    getTooltipDetails = () => {
        const { columnKey, data, hasTrend, rowIndex, trends, displayTotalRank } = this.props;
        const songName = data[rowIndex].metadata.sNm;
        const trendsEnabled = trends.enabled || false;
        let showTrends = hasTrend && trendsEnabled;
        const datasets = [];
        const labels = [];
        const groupColumn = columnKey.split('.')[0];

        /* Trends data */
        let totalRankData = [];
        if (showTrends) {
            const trendData = trends.data.find(song => song.id === data[rowIndex].sId) || {};
            const trendMetric = !isEmpty(trendData) ? objectGet(trendData, columnKey, {}) : {};
            const rankData = groupColumn && get(trendData[groupColumn], displayTotalRank);

            // convert {date:value} into [value] for sparkline component
            Object.keys(trendMetric)
                .sort(
                    (a, b) =>
                        moment.utc(b, 'YYYY-MM-DD').toDate() - moment.utc(a, 'YYYY-MM-DD').toDate()
                )
                .forEach(dateKey => {
                    datasets.unshift(trendMetric[dateKey]);
                    labels.unshift(dateKey);
                });

            if (datasets.length <= 1) showTrends = false;

            totalRankData = (rankData && Object.values(rankData).reverse()) || [];
        }
        return { datasets, labels, showTrends, songName, totalRankData };
    };

    getStatus = () => {
        const { similarStations, rowIndex, columnKey } = this.props;
        const isActive =
            similarStations.open &&
            similarStations.selectedRowIndex === rowIndex &&
            similarStations.selectedMetricKey === columnKey;

        return classNames({ activeCell: isActive });
    };

    wrapWithButton = child => (
        <button
            className="btn-anchor quintile-wrapper quintile-button-click"
            type="button"
            onClick={this.onClick}
        >
            {child}
        </button>
    );

    renderTooltip = colorDetails => {
        const { tooltipTitle } = this.props;
        const { datasets, labels, songName, totalRankData } = this.getTooltipDetails();
        const calloutColors = datasets ? datasets.map(datum => getQuintileColor(datum)) : null;
        const taaColors = datasets ? datasets.map(() => getQuintileColor(6, true)) : null;
        const backgroundColors = colorDetails.isTAA ? taaColors : calloutColors;

        return (
            <Tooltip className="tooltip-component-tag" id={shortid.generate()}>
                <div className="description">
                    {tooltipTitle ? <p className="title p3">{tooltipTitle}</p> : null}
                    <p className="subtitle p3">{songName}</p>
                </div>
                <TrendBarChart labels={labels} data={datasets} colorDetails={colorDetails} />
                <div className="total-rank-label-container">
                    {totalRankData.length > 0 &&
                        totalRankData.map((data, index) => (
                            <TotalRank
                                key={`tooltip-total-rank-${index}`} // eslint-disable-line
                                data={data}
                                color={backgroundColors[index]}
                            />
                        ))}
                </div>
            </Tooltip>
        );
    };

    renderQuintile = () => {
        const { clickable, columnKey, rowIndex, data, prefix } = this.props;
        const { datasets, showTrends } = this.getTooltipDetails();
        const colorDetails = this.getColorDetails();
        const canClick = clickable && colorDetails.dataValue > 0;
        const numValue = objectGet(data[rowIndex][prefix], columnKey);

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
                        placement="left"
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

    render() {
        const { data, columnKey, rowIndex, className } = this.props;
        const { showTrends } = this.getTooltipDetails();
        const cellProps = { columnKey, data, rowIndex };
        const cName = classNames({ 'show-trends': showTrends, className });

        return (
            <div className={className}>
                <Cell {...cellProps} className={cName}>
                    {this.renderQuintile()}
                </Cell>
            </div>
        );
    }
}

const mergeCmmData = (songId, cmmData) => {
    const getColumnValue = column => {
        const songCmmTrends = Object.values(cmmData).find(song => song.songId === songId);
        const dateValue = get(songCmmTrends, column, null);
        // Adds 7 days to workaround the tooptip
        return (
            dateValue &&
            Object.entries(dateValue).reduce(
                (total, [date, item]) => ({
                    ...total,
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
                    [moment(date).add(7, 'days').format('YYYY-MM-DD')]: item.rank,
                }),
                {}
            )
        );
    };
    return {
        pop: {
            scoreRank: getColumnRank('popCore'),
            score: getColumnValue('popCore'),
            totalRank: getColumnRank('popTotal'),
            total: getColumnValue('popTotal'),
            tPeakScore: getColumnValue('popTotalPeak'),
            tPeakDt: getColumnValue('popTotalPeakDate'),
            aa: getColumnValue('popAa'),
            hisp: getColumnValue('popHispanic'),
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
            young: getColumnValue('twoPopYoung'),
            old: getColumnValue('twoPopOld'),
        },
        ptl: {
            score: getColumnValue('ptlCore'),
            total: getColumnValue('ptlTotal'),
            hisp: getColumnValue('ptlHispanic'),
            white: getColumnValue('ptlWhite'),
            asian: getColumnValue('ptlAsian'),
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
        !cmmCustomConsolidatedOmtTrends.error;

    const songIdTrends = {
        ...(trendsIndex >= 0 ? songTrends.data[trendsIndex] : { id: songId }),
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
