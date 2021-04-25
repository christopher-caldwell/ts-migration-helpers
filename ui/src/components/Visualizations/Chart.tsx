import React from 'react';

import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { isEqual, get } from 'lodash';

// Set chart defaults
Chart.defaults.global.defaultFontColor = 'white';
// @ts-expect-error ts-migrate(2322) FIXME: Type '300' is not assignable to type 'string | und... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '300' is not assignable to type 'string | und... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
// @ts-expect-error ts-migrate(2322) FIXME: Type '300' is not assignable to type 'string | und... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
Chart.defaults.global.defaultFontFamily = "'Assistant', sans-serif";
// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
Chart.defaults.global.defaultFontStyle = 300;
// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
Chart.defaults.global.legend.display = false;
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
Chart.defaults.global.legend.position = 'bottom';
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.tooltips.cornerRadius = 2;
Chart.defaults.scale.gridLines.drawBorder = false;
Chart.defaults.scale.ticks.padding = 20;
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
Chart.defaults.scale.gridLines.color = 'rgba(255,255,255,.1)';

class BaseChart extends React.Component {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    static propTypes = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showDatapoints' does not exist on type '... Remove this comment to see the full error message
        data: PropTypes.objectOf(PropTypes.any).isRequired,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'Chart'.
        options: PropTypes.objectOf(PropTypes.any).isRequired,
        type: PropTypes.string.isRequired,
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    constructor(props) {
        super(props);
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showDatapoints' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'bar' implicitly has an 'any' type.
        // this chart plugins register is here to allow for point labels in charts. Currently being
        // used with tooltip bar charts. To enable this feature in new chart, options.showDatapoints
        // needs to be set to true (look to TrendBarChart.js for example).
        Chart.plugins.register({
            afterDraw: chartInstance => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                if (chartInstance.config.options.showDatapoints) {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'controller' does not exist on type 'Char... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'Chart'.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'bar' implicitly has an 'any' type.
                    const { ctx } = chartInstance.chart;

                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
                    // render the value of the chart above the bar
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
                    ctx.font = Chart.helpers.fontString(12, "'Assistant', sans-serif");
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'BaseChart... Remove this comment to see the full error message
                    ctx.textAlign = 'center';
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'BaseChart... Remove this comment to see the full error message
                    ctx.textBaseline = 'bottom';
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
                    ctx.fillStyle = 'white';

                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                    chartInstance.data.datasets.forEach((dataset, i) => {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
                        const meta = chartInstance.controller.getDatasetMeta(i);

                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'bar' implicitly has an 'any' type.
                        meta.data.forEach((bar, index) => {
                            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                            const data = dataset.data[index];
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
                            // eslint-disable-next-line no-underscore-dangle
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
                    });
                }
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
            },
        });
    }

    componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'BaseChart... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { type, data, options } = this.props;
        this.setChart(type, data, options);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { type, data, options } = this.props;

        const typeIsDifferent = !isEqual(prevProps.type, type);
        const dataDifferent = !isEqual(
            get(prevProps.data, 'datasets[0].data', null),
            get(data, 'datasets[0].data', null)
        );
        const optionsIsDifferent = !isEqual(prevProps.options, options);

        if (typeIsDifferent || dataDifferent || optionsIsDifferent) {
            this.setChart(type, data, options);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
        }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
    }

    setChart(type, data, options) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
        const container = this.canvas.parentNode;

        this.canvas.width = container.offsetWidth;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
        this.canvas.height = container.offsetHeight;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'BaseChart... Remove this comment to see the full error message
        if (this.chart) {
            this.chart.destroy();
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'chart' does not exist on type 'BaseChart... Remove this comment to see the full error message
        this.chart = new Chart(this.canvas, { type, data, options });
    }

    render() {
        return (
            <canvas
                className="chartCanvas"
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'BaseChar... Remove this comment to see the full error message
                ref={c => {
                    this.canvas = c;
                }}
            />
        );
    }
}

export default BaseChart;
