import React from 'react';

import PropTypes from 'prop-types';
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
        bezierCurve: true,
        colorRange: defaultRange,
        dateFormat: null,
        datasets: {},
        options: {},
        stacked: false,
        hasLegend: true,
        showPoint: false,
        type: 'line',
        xAxis: {},
        yAxis: {
            ticks: {
                callback(value) {
                    return abbreviateNumber(value);
                },
            },
        },
    };

    getDateFormat(isWeek, numberOfDays) {
        const { dateFormat } = this.props;

        if (dateFormat) {
            return dateFormat;
        }

        return isWeek && Math.abs(numberOfDays) < 7 ? ' ddd DD' : 'M/D/YY';
    }

    render() {
        const {
            bezierCurve,
            colorRange,
            dateRange,
            datasets,
            options,
            series,
            stacked,
            xAxis,
            yAxis,
            type,
            hasLegend,
            showPoint,
        } = this.props;
        const { startDate, endDate, period } = dateRange;
        const isBar = type === 'bar' || startDate === endDate;
        const isWeek = period === 'weekly';
        const numberOfDays = moment.utc(startDate).diff(moment.utc(endDate), 'days');
        const format = this.getDateFormat(isWeek, numberOfDays);
        const dataMapper = isBar ? point => point.value : point => ({ y: point.value });

        const data = {
            labels: series[0].data.map(point => {
                if (typeof point.week !== 'undefined' && point.week !== null) {
                    return `Week ${point.week}`;
                }

                return moment
                    .utc(point.date)
                    .format(format)
                    .split(' ');
            }),
            datasets: series.map((line, index) => ({
                label: line.name,
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

export { DateSeriesChart as default, DateSeriesChart as Chart, seriesShape };
