// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
import moment from 'moment';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'isTAA' implicitly has an 'any' ty... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
import BaseChart from 'components/Visualizations/Chart';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'isTAA' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
import { getQuintileColor } from 'utils/quintileColoring';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
const TrendBarChart = ({ data, labels, colorDetails: { isTAA } }) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    const calloutColors = data ? data.map(datum => getQuintileColor(datum)) : null;
    const taaColors = data ? data.map(() => getQuintileColor(6, true)) : null;
    // ^ 6 needs to be replaced with colorValue (inside colorDetails) for none grey colors
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    const backgroundColor = isTAA ? taaColors : calloutColors;
    const chartData = {
        labels: labels.map(date => moment(date).subtract(7, 'days').format('M/D/YY')),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
        datasets: [{ data, backgroundColor, borderWidth: 0 }],
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'b' implicitly has an 'any' type.
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
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
