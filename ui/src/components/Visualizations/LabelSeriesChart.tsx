import React from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';

import BaseChart from 'components/Visualizations/Chart';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
import ChartLegend, { labelSeriesLegendItems } from 'components/Visualizations/ChartLegend';
import { defaultRange } from 'utils/colors';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const seriesShape = PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
    })
);
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const percentFormat = value => `${value}%`;

class LabelSeriesChart extends React.Component {
    static propTypes = {
        series: seriesShape.isRequired,

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
        options: PropTypes.objectOf(PropTypes.any),
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
        stacked: PropTypes.bool,
        type: PropTypes.string,
    };

    static defaultProps = {
        options: {},
        stacked: true,
        type: 'bar',
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
    renderBarChart(series, options) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
        const datasets = series.map(({ label, value }, index) => {
            const color = defaultRange(index);

            return {
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
                label,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
                data: [value],
                backgroundColor: color,
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                borderColor: color,
            };
        });

        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        const data = {
            labels: [''],
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
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
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'series' does not exist on type 'Readonly... Remove this comment to see the full error message
                ],
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
                yAxes: [
                    {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        stacked: true,
                        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                        display: false,
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                    },
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                ],
            },
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            ...options,
        };

        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        return { data, chartOptions };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
        };

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
        series.forEach(({ label, value }, index) => {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            const color = defaultRange(index);

            data.labels.push(label);
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            data.datasets[0].data.push(value);
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            data.datasets[0].backgroundColor.push(color);
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'series' does not exist on type 'Readonly... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { options, series, stacked, type } = this.props;
        const typeMap = {
            bar: this.renderBarChart,
            doughnut: this.renderDoughnutChart,
        };
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                </div>
                <ChartLegend legendItems={labelSeriesLegendItems} legendValueCallback={percentFormat} {...this.props} />
            </div>
        );
    }
}

export { LabelSeriesChart as default, LabelSeriesChart as Chart, seriesShape };
