import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import at from 'lodash/at';
import fromPairs from 'lodash/fromPairs';
import find from 'lodash/find';
import get from 'lodash/get';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfo' does not exist on type 'Readon... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import { renderToString } from 'react-dom/server';

import { dehighlightCategoryVersion } from 'stores/categoryHighlight/categoryHighlightActions';
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ date: string; value: any; tooltipCustomDat... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfo' does not exist on type 'Readon... Remove this comment to see the full error message
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import { Chart } from 'components/Visualizations/DateSeriesChart';
import { makeColorRange } from 'utils/colors';
import IconX from '../Buttons/IconX';

class HeaderSongInfo extends Component {
    // TODO: make this a SFC
    getDataSongCycle = () => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ date: string; value: any; tooltipCustomDat... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfo' does not exist on type 'Readon... Remove this comment to see the full error message
        const { songInfo, dateRange } = this.props;

        const dataSeries = [{ name: songInfo.title, id: songInfo.id, data: [] }];

        const songCycle = get(songInfo, 'metrics.songCycle', {});

        if (!isEmpty(songCycle)) {
            const songCycleProps = Object.keys(songCycle);

            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ date: string; value: any; tooltipCustomDat... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tooltipModel' implicitly has an 'any' t... Remove this comment to see the full error message
            dataSeries[0].data = songCycleProps.map((item, index) => {
                const lastWeek = index > 0 ? songCycleProps[index - 1] : item;
                const dateLt = songCycle[item].last_start_dt
                    ? moment.utc(songCycle[item].last_start_dt, 'YYYY-MM-DD').format('MM/DD/YYYY')
                    : null;

                return {
                    date: item,
                    value: songCycle[item].taa,
                    tooltipCustomData: {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipCustomData' does not exist on typ... Remove this comment to see the full error message
                        totalStationsSpins: songCycle[item].total_station_spins_24h || '-',
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tooltipModel' implicitly has an 'any' t... Remove this comment to see the full error message
                        totalPopLt: songCycle[item].last_total_pop || '-',
                        dateLt,
                        totalPop: songCycle[item].total_pop || '-',
                        taaLw: songCycle[lastWeek].taa || '-',
                        taa: songCycle[item].taa || '-',
                    },
                };
            });
        }

        dataSeries[0].data.shift();

        return {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
            range: {
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
                startDate: dateRange.startDate,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipCustomData' does not exist on typ... Remove this comment to see the full error message
                endDate: dateRange.endDate,
            },
            series: dataSeries,
        };
    };

    // Custom chartjs tooltip
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tooltipModel' implicitly has an 'any' t... Remove this comment to see the full error message
    customTooltips = tooltipModel => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const { boardDetails } = this.props;
        if (boardDetails.filters.applied) return null;
        const { hasTAA = false } = boardDetails.filters.applied.options;

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        const dataSeries = this.getDataSongCycle().series;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        const date = tooltipModel.title
            ? moment.utc(tooltipModel.title[0], 'M/D/YY').format('YYYY-MM-DD')
            : null;
        const obj = find(dataSeries[0].data, ['date', date]);
        const tooltipData = obj ? obj.tooltipCustomData : null;
        let TOOLTIP_WIDTH = 0;
        const MARGIN = 3;
        let tooltipEl = document.getElementById('chartjs-tooltip'); // TODO: fix this

        // Create tooltip element
        if (!tooltipEl) {
            tooltipEl = document.createElement('div'); // TODO: and this..
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<div class="lifecycle-tooltip__container"></div>';
            document.getElementsByClassName('header-song__content')[1].appendChild(tooltipEl);
            // TODO: and this, more below
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
            tooltipEl.style.zIndex = -1;
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
            tooltipEl.style.opacity = 0;
            return undefined;
        }

        // Set caret position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
            tooltipEl.classList.add('no-transform');
        }

        const taaLWParagraphClasses = `
            caption-all-caps
            caption-all-caps--nomargin
            caption-all-caps--cornflower-blue
        `;
        const taaParagraphClasses = `
            caption-all-caps
            caption-all-caps--nomargin
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            caption-all-caps--cornflower-blue
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetWidth' does not exist on type 'Ele... Remove this comment to see the full error message
        `;

        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (tooltipModel.body) {
            const title = `Week of ${tooltipModel.title}`;
            const innerHtml = (
                <div>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetTop' does not exist on type 'Eleme... Remove this comment to see the full error message */}
                    <h2 className="lifecycle-tooltip__title caption-all-caps">{title}</h2>
                    <div className="ml-box-flex__wrapper">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetLeft' does not exist on type 'Elem... Remove this comment to see the full error message */}
                        <div className="ml-box-flex__content">
                            <h5>{tooltipData.totalStationsSpins}</h5>
                            <p className="caption-all-caps caption-all-caps--nomargin">
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'. */}
                                Total Station Spins (24h)
                            </p>
                        </div>
                        <div className="ml-box-flex__content">
                            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'. */}
                            <h5>{tooltipData.totalPopLt}</h5>
                            <p className="caption-all-caps caption-all-caps--nomargin">
                                <span className="nowrap">Total Pop (LT)</span>
                            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'length' implicitly has an 'any' type. */}
                            </p>
                            <p className="caption-all-caps caption-all-caps--nomargin">
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfo' does not exist on type 'Readon... Remove this comment to see the full error message */}
                                {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                                <span className="nowrap">{tooltipData.dateLt}</span>
                            {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                            </p>
                        </div>
                        <div className="ml-box-flex__content">
                            <h5>{tooltipData.totalPop}</h5>
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetTop' does not exist on type 'Eleme... Remove this comment to see the full error message */}
                            <p className="caption-all-caps caption-all-caps--nomargin">Total Pop</p>
                        </div>
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'offsetLeft' does not exist on type 'Elem... Remove this comment to see the full error message */}
                        {hasTAA && (
                            <div className="ml-box-flex__content">
                                <h5>{tooltipData.taaLw}</h5>
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'. */}
                                <p className={taaLWParagraphClasses}>TAA (LW)</p>
                            </div>
                        )}
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type. */}
                        {hasTAA && (
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
                            <div className="ml-box-flex__content">
                                <h5>{tooltipData.taa}</h5>
                                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type. */}
                                <p className={taaParagraphClasses}>TAA</p>
                            </div>
                        )}
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'length' implicitly has an 'any' type. */}
                    </div>
                </div>
            );

            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfo' does not exist on type 'Readon... Remove this comment to see the full error message
            const containerEl = tooltipEl.querySelector('.lifecycle-tooltip__container');
            TOOLTIP_WIDTH = containerEl.offsetWidth;
            containerEl.innerHTML = renderToString(innerHtml);
        }

        // `this` will be the overall tooltip TODO: this needs to be fixed...
        const positionY = document.getElementsByClassName('chartCanvas')[0].offsetTop;
        const positionX = document.getElementsByClassName('chartCanvas')[0].offsetLeft;
        const left = positionX + tooltipModel.caretX - (TOOLTIP_WIDTH + MARGIN);
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        const top = positionY + tooltipModel.caretY + MARGIN;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
        tooltipEl.style.zIndex = 105;

        return undefined;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'length' implicitly has an 'any' type.
    // We need to create an array where the last value is different from the others
    // The last point on the chart has a different setting
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    customizeChart = (length, value1, value2) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfo' does not exist on type 'Readon... Remove this comment to see the full error message
        const list = !length ? [] : [...Array(length - 1)].map(() => value1).concat(value2);
        return list;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    render() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        const { songInfo, boardDetails, dehighlight } = this.props;
        if (!boardDetails.filters.applied) return null;

        const { hasTAA = false } = boardDetails.filters.applied.options;

        const propsToMap = {
            title: 'metadata.sNm',
            artist: 'metadata.aNm',
            taaRank: 'metrics.enhanced.pop.rnk',
            taaScore: 'metrics.enhanced.pop.num',
            priorCategory: 'category.prior',
            currentCategory: 'category.current',
            newCategory: 'category.staged',
            plus100: 'metrics.enhanced.plus100.spins',
            plus300: 'metrics.enhanced.plus300.spins',
            crg: 'metrics.crg',
        };

        // Filter Object and extract values
        // return array with values
        const getValues = at(songInfo, Object.values(propsToMap));

        // return friendly Object to set in labels
        const dataInfo = fromPairs(
            getValues.map((value, index) => [Object.keys(propsToMap)[index], value || '-'])
        );

        const newVersions =
            get(songInfo, 'category.staged') ||
            get(songInfo, 'category.current') ||
            get(songInfo, 'category.prior') ||
            '-';

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        const newCategory = utils.categoryText(newVersions);
        // Class control to arrows for plus100 and plus300
        const arrowSetClass = value => {
            if (value !== '-') return classNames({ arrow: true, [value]: true });
            return undefined;
        };
        // Class controll to CRG behavior.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // This will become the letter in green color regarding to the current crg category.
        const crgSetClass = (data, value) =>
            classNames({
                'crg-selected': data ? data.toLowerCase() === value.toLowerCase() : false,
            });

        const metrics = { series: this.getDataSongCycle().series };

        const dataLength = metrics.series[0].data.length;

        const chartOptions = {
            yAxis: {
                ticks: {
                    display: false,
                },
                gridLines: {
                    drawTicks: false,
                },
            },
            xAxis: {
                ticks: {
                    fontStyle: 'bold',
                    padding: 0,
                },
                gridLines: {
                    color: 'rgba(255, 255, 255, .5)',
                    display: false,
                    drawBorder: true,
                },
            },
            datasets: {
                borderWidth: 2,
                pointRadius: this.customizeChart(dataLength, 3, 4),
                pointBackgroundColor: '#6c79e0',
                pointHoverBackgroundColor: this.customizeChart(dataLength, '#6c79e0', '#ffffff'),
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                pointBorderColor: this.customizeChart(dataLength, 'transparent', '#ffffff'),
            },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            options: {
                tooltips: {
                    enabled: false,
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    custom: this.customTooltips,
                },
                animation: {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                    duration: 0,
                },
                layout: {
                    padding: {
                        top: 10,
                    },
                },
            },
        };

        // - ML-6162 -- removing header-song div from being displayed when song item row is clicked
        return (
            <div
                className={classNames('header-song__container', {
                    'header-song__container--open': !isEmpty(songInfo),
                })}
            >
                {!isEmpty(songInfo) && (
                    <IconX onClick={() => dehighlight()} className="header-song__btn-close" />
                )}
                <div className="header-song__content">
                    <div className="artist-info">
                        <h4>{dataInfo.title}</h4>
                        <span className="p3">{dataInfo.artist}</span>
                    </div>
                    <div className="ml-box-flex__wrapper song-info">
                        {hasTAA && (
                            <div className="ml-box-flex__content">
                                <h5 className="music-tracker-quintile">{dataInfo.taaRank}</h5>
                                <p className="caption-all-caps">TAA Rank</p>
                            </div>
                        )}
                        {hasTAA && (
                            <div className="ml-box-flex__content">
                                <h5>{dataInfo.taaScore}</h5>
                                <p className="caption-all-caps">TAA Score</p>
                            </div>
                        )}
                        <div className="ml-box-flex__content">
                            <h5>{utils.categoryText(dataInfo.priorCategory[0])}</h5>
                            <p className="caption-all-caps">Prior</p>
                        </div>
                        <div className="ml-box-flex__content">
                            <h5>{utils.categoryText(dataInfo.currentCategory[0])}</h5>
                            <p className="caption-all-caps">Current</p>
                        </div>
                        <div className="ml-box-flex__content">
                            <div className="tier">
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                <h5>{newCategory}</h5>
                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                {hasTAA && dataInfo.plus100 && (
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    <span className={arrowSetClass(dataInfo.plus100)} />
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                )}
                                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
                                {hasTAA && dataInfo.plus300 && (
                                    <span className={arrowSetClass(dataInfo.plus300)} />
                                )}
                            </div>
                            <p className="caption-all-caps">New</p>
                        </div>
                        <div className="ml-box-flex__content">
                            <div className="crg-square">
                                <h5>
                                    <span className={crgSetClass(dataInfo.crg, 'c')}>C</span>
                                    <span className={crgSetClass(dataInfo.crg, 'r')}>R</span>
                                    <span className={crgSetClass(dataInfo.crg, 'g')}>G</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                <div className="header-song__content">
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    <h2 className="chart-title caption-all-caps">Song Lifecycle</h2>
                    <Chart
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        dateRange={this.getDataSongCycle().range}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                        series={metrics.series}
                        yAxis={chartOptions.yAxis}
                        xAxis={chartOptions.xAxis}
                        datasets={chartOptions.datasets}
                        colorRange={makeColorRange(['#6c79e0'])}
                        hasLegend={false}
                        showPoint
                        options={chartOptions.options}
                    />
                </div>
            </div>
        );
    }
}

HeaderSongInfo.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    dateRange: PropTypes.shape().isRequired,
    dehighlight: PropTypes.func.isRequired,
    songInfo: PropTypes.shape(),
};

HeaderSongInfo.defaultProps = { songInfo: {} };

const mapStateToProps = state => ({ boardDetails: state.boardDetails });
const mapDispatchToProps = { dehighlight: dehighlightCategoryVersion };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSongInfo);
