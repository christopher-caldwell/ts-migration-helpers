import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseChart from 'components/Visualizations/Chart';
import ChartLegend, { labelSeriesLegendItems } from 'components/Visualizations/ChartLegend';
import { defaultRange } from 'utils/colors';

const seriesShape = PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
    })
);
const percentFormat = value => `${value}%`;

class LabelSeriesChart extends React.Component {
    static propTypes = {
        series: seriesShape.isRequired,

        options: PropTypes.objectOf(PropTypes.any),
        stacked: PropTypes.bool,
        type: PropTypes.string,
    };

    static defaultProps = {
        options: {},
        stacked: true,
        type: 'bar',
    };

    renderBarChart(series, options) {
        const datasets = series.map(({ label, value }, index) => {
            const color = defaultRange(index);

            return {
                label,
                data: [value],
                backgroundColor: color,
                borderColor: color,
            };
        });

        const data = {
            labels: [''],
            datasets: datasets.reverse(),
        };
        const chartOptions = {
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        display: false,
                        barThickness: 50,
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                        display: false,
                    },
                ],
            },
            ...options,
        };

        return { data, chartOptions };
    }

    renderDoughnutChart(series, options) {
        const data = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                },
            ],
        };

        series.forEach(({ label, value }, index) => {
            const color = defaultRange(index);

            data.labels.push(label);
            data.datasets[0].data.push(value);
            data.datasets[0].backgroundColor.push(color);
            data.datasets[0].borderColor.push(color);
        });

        const chartOptions = {
            cutoutPercentage: 90,
            scales: {
                xAxes: [
                    {
                        display: false,
                    },
                ],
                yAxes: [
                    {
                        display: false,
                    },
                ],
            },
            ...options,
        };

        return { data, chartOptions };
    }

    render() {
        const { options, series, stacked, type } = this.props;
        const typeMap = {
            bar: this.renderBarChart,
            doughnut: this.renderDoughnutChart,
        };
        const { data, chartOptions } = typeMap[type](series, options);
        const className = classNames({
            'chart-label-series': true,
            'chart-with-legend': true,
            'chart-stacked': stacked,
        });

        return (
            <div className={className}>
                <div className="chart-body">
                    <BaseChart data={data} options={chartOptions} type={type} />
                </div>
                <ChartLegend legendItems={labelSeriesLegendItems} legendValueCallback={percentFormat} {...this.props} />
            </div>
        );
    }
}

export { LabelSeriesChart as default, LabelSeriesChart as Chart, seriesShape };
