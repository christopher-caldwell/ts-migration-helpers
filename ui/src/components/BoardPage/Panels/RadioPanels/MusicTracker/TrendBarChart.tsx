import React from 'react';

import moment from 'moment';
import PropTypes from 'prop-types';

import BaseChart from 'components/Visualizations/Chart';
import { getQuintileColor } from 'utils/quintileColoring';

const TrendBarChart = ({ data, labels, colorDetails: { isTAA } }) => {
    const calloutColors = data ? data.map(datum => getQuintileColor(datum)) : null;
    const taaColors = data ? data.map(() => getQuintileColor(6, true)) : null;
    // ^ 6 needs to be replaced with colorValue (inside colorDetails) for none grey colors
    const backgroundColor = isTAA ? taaColors : calloutColors;
    const chartData = {
        labels: labels.map(date => moment(date).subtract(7, 'days').format('M/D/YY')),
        datasets: [{ data, backgroundColor, borderWidth: 0 }],
    };

    const sortedData = isTAA
        ? data.map(datum => parseFloat(datum)).sort((a, b) => a - b)
        : [...data].sort((a, b) => a - b);
    const max = isTAA
        ? sortedData[sortedData.length - 1] + 0.3
        : sortedData[sortedData.length - 1] + 7;
    const min = isTAA ? sortedData[0] - 0.3 : sortedData[0] - 7;
    const options = {
        fontColor: 'white',
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
        tooltips: false,
        layout: { padding: { top: 10 } },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontFamily: "'Assistant', sans-serif",
                        fontStyle: 'bold',
                        fontSize: 12,
                        fontColor: 'white',
                        padding: 0,
                    },
                    gridLines: { display: false },
                    barThickness: 6,
                },
            ],
            yAxes: [
                {
                    ticks: { maxTicksLimit: 1, max, min },
                    display: false,
                },
            ],
        },
        showDatapoints: true,
    };

    return (
        <div className="chartContainer">
            <hr className="rowChartContainer" />
            <BaseChart data={chartData} options={options} type="bar" />
        </div>
    );
};

TrendBarChart.propTypes = {
    colorDetails: PropTypes.shape().isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    labels: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TrendBarChart;
