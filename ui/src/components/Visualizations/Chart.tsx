import React from 'react';

import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { isEqual, get } from 'lodash';

// Set chart defaults
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontFamily = "'Assistant', sans-serif";
Chart.defaults.global.defaultFontStyle = 300;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.legend.position = 'bottom';
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.tooltips.cornerRadius = 2;
Chart.defaults.scale.gridLines.drawBorder = false;
Chart.defaults.scale.ticks.padding = 20;
Chart.defaults.scale.gridLines.color = 'rgba(255,255,255,.1)';

class BaseChart extends React.Component {
    static propTypes = {
        data: PropTypes.objectOf(PropTypes.any).isRequired,
        options: PropTypes.objectOf(PropTypes.any).isRequired,
        type: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        // this chart plugins register is here to allow for point labels in charts. Currently being
        // used with tooltip bar charts. To enable this feature in new chart, options.showDatapoints
        // needs to be set to true (look to TrendBarChart.js for example).
        Chart.plugins.register({
            afterDraw: chartInstance => {
                if (chartInstance.config.options.showDatapoints) {
                    const { ctx } = chartInstance.chart;

                    // render the value of the chart above the bar
                    ctx.font = Chart.helpers.fontString(12, "'Assistant', sans-serif");
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillStyle = 'white';

                    chartInstance.data.datasets.forEach((dataset, i) => {
                        const meta = chartInstance.controller.getDatasetMeta(i);

                        meta.data.forEach((bar, index) => {
                            const data = dataset.data[index];
                            // eslint-disable-next-line no-underscore-dangle
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            },
        });
    }

    componentDidMount() {
        const { type, data, options } = this.props;
        this.setChart(type, data, options);
    }

    componentDidUpdate(prevProps) {
        const { type, data, options } = this.props;

        const typeIsDifferent = !isEqual(prevProps.type, type);
        const dataDifferent = !isEqual(
            get(prevProps.data, 'datasets[0].data', null),
            get(data, 'datasets[0].data', null)
        );
        const optionsIsDifferent = !isEqual(prevProps.options, options);

        if (typeIsDifferent || dataDifferent || optionsIsDifferent) {
            this.setChart(type, data, options);
        }
    }

    setChart(type, data, options) {
        const container = this.canvas.parentNode;

        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(this.canvas, { type, data, options });
    }

    render() {
        return (
            <canvas
                className="chartCanvas"
                ref={c => {
                    this.canvas = c;
                }}
            />
        );
    }
}

export default BaseChart;
