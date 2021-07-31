import React from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import { merge } from 'lodash';
import moment from 'moment';

import abbreviateNumber from 'utils/abbreviateNumber';
import BaseChart from 'components/Visualizations/Chart';
import ChartLegend from 'components/Visualizations/ChartLegend';
import { defaultRange } from 'utils/colors';
import If from 'components/Utilities/If';

const seriesShape = PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string,
                value: PropTypes.number,
            })
        ),
    })
);

class DateSeriesChart extends React.Component {
    static propTypes = {
        dateRange: PropTypes.shape({
            startDate: PropTypes.string,
            endDate: PropTypes.string,
            period: PropTypes.string,
        }).isRequired,
        series: seriesShape.isRequired,
        bezierCurve: PropTypes.bool,
        colorRange: PropTypes.func,
        datasets: PropTypes.objectOf(PropTypes.any),
        dateFormat: PropTypes.string,
        hasLegend: PropTypes.bool,
        options: PropTypes.objectOf(PropTypes.any),
        showPoint: PropTypes.bool,
        stacked: PropTypes.bool,
        type: PropTypes.string,
        xAxis: PropTypes.objectOf(PropTypes.any),
        yAxis: PropTypes.objectOf(PropTypes.any),
    };

    static defaultProps = {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        bezierCurve: true,
        colorRange: defaultRange,
        dateFormat: null,
        datasets: {},
        options: {},
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isWeek' implicitly has an 'any' type.
        stacked: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'Read... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        hasLegend: true,
        showPoint: false,
        type: 'line',
        xAxis: {},
        yAxis: {
            ticks: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'bezierCurve' does not exist on type 'Rea... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isWeek' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                callback(value) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stacked' does not exist on type 'Readonl... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'Read... Remove this comment to see the full error message
                    return abbreviateNumber(value);
                },
            },
        },
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bezierCurve' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
    getDateFormat(isWeek, numberOfDays) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'colorRange' does not exist on type 'Read... Remove this comment to see the full error message
        const { dateFormat } = this.props;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'dateRange' does not exist on type 'Reado... Remove this comment to see the full error message

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'line' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'datasets' does not exist on type 'Readon... Remove this comment to see the full error message
        if (dateFormat) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isWeek' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            return dateFormat;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasLegend' does not exist on type 'Reado... Remove this comment to see the full error message
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showPoint' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'Read... Remove this comment to see the full error message
        return isWeek && Math.abs(numberOfDays) < 7 ? ' ddd DD' : 'M/D/YY';
    }

    render() {
        const {
            bezierCurve,
            colorRange,
            dateRange,
            datasets,
            options,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'bezierCurve' does not exist on type 'Rea... Remove this comment to see the full error message
            series,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'items' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'colorRange' does not exist on type 'Read... Remove this comment to see the full error message
            stacked,
            xAxis,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'line' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateRange' does not exist on type 'Reado... Remove this comment to see the full error message
            yAxis,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'datasets' does not exist on type 'Readon... Remove this comment to see the full error message
            type,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
            hasLegend,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'series' does not exist on type 'Readonly... Remove this comment to see the full error message
            showPoint,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stacked' does not exist on type 'Readonl... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'xAxis' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { startDate, endDate, period } = dateRange;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showPoint' does not exist on type 'Reado... Remove this comment to see the full error message
        const isBar = type === 'bar' || startDate === endDate;
        const isWeek = period === 'weekly';
        const numberOfDays = moment.utc(startDate).diff(moment.utc(endDate), 'days');
        const format = this.getDateFormat(isWeek, numberOfDays);
        const dataMapper = isBar ? point => point.value : point => ({ y: point.value });

        const data = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'items' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
            labels: series[0].data.map(point => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
                if (typeof point.week !== 'undefined' && point.week !== null) {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
                    return `Week ${point.week}`;
                }

                return moment
                    .utc(point.date)
                    .format(format)
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    .split(' ');
            }),
            datasets: series.map((line, index) => ({
                label: line.name,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'line' implicitly has an 'any' type.
                backgroundColor: stacked || isBar ? colorRange(index) : 'transparent',
                borderColor: colorRange(index),
                pointRadius: 5,
                pointHoverRadius: 5,
                pointHitRadius: 12,
                pointBorderColor: 'transparent',
                pointBackgroundColor: line.data.length === 1 || showPoint ? colorRange(index) : 'transparent',
                pointHoverBackgroundColor: colorRange(index),
                data: line.data.map(dataMapper),
                ...datasets,
            })),
        };
        const chartOptions = {
            elements: {
                line: {
                    tension: bezierCurve ? 0.4 : 0,
                },
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            drawOnChartArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        ...xAxis,
                    },
                ],
                yAxes: [
                    merge(
                        {
                            stacked,
                            ticks: {
                                maxTicksLimit: 5,
                                suggestedMin: isBar ? 0 : undefined,
                            },
                        },
                        yAxis
                    ),
                ],
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    title: items => items[0].xLabel.join(' '),
                },
            },
            ...options,
        };

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'items' implicitly has an 'any' type.
        const bodyClassName = classNames({
            'chart-body': true,
            'chart-body-padded': isWeek,
        });

        return (
            <div className="chart-with-legend chart-stacked">
                <div className={bodyClassName}>
                    <BaseChart data={data} options={chartOptions} type={isBar ? 'bar' : type} />
                </div>
                <If test={hasLegend}>
                    <ChartLegend {...this.props} />
                </If>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
export { DateSeriesChart as default, DateSeriesChart as Chart, seriesShape };
