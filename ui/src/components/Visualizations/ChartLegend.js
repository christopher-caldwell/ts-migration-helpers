import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import abbreviateNumber from 'utils/abbreviateNumber';
import ChangeIcon from 'components/Visualizations/ChangeIcon';
import objectGet from 'utils/objectGet';

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

// Preset legend items for convenience
const defaultLegendItems = [{ type: 'icon' }, { type: 'label', params: { key: 'name' } }];
const labelSeriesLegendItems = [
    { type: 'icon' },
    { type: 'label', params: { key: 'label' } },
    { type: 'value', params: { key: 'value' } },
];
const datePeriodLegendItems = ({ datePeriod }) => [
    { type: 'icon' },
    { type: 'label', params: { key: 'name' } },
    {
        type: 'value',
        params: {
            header: datePeriod.names.thisPeriodShort,
            key: 'totals.thisPeriod',
        },
    },
    {
        type: 'value',
        params: {
            header: datePeriod.names.lastPeriodShort,
            key: 'totals.lastPeriod',
        },
    },
    {
        type: 'change',
        params: {
            firstKey: 'totals.thisPeriod',
            secondKey: 'totals.lastPeriod',
        },
    },
];

const weekPeriodLegendItems = () => [
    { type: 'icon' },
    { type: 'label', params: { key: 'name' } },
    {
        type: 'value',
        params: {
            header: 'Totals',
            key: 'totals.thisPeriod',
        },
    },
];

/* eslint-disable react/no-array-index-key */
class ChartLegend extends React.Component {
    static propTypes = {
        colorRange: PropTypes.func.isRequired,
        series: seriesShape.isRequired,

        // Defines the headers/cells to show in the legend
        legendItems: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                props: PropTypes.any,
            })
        ),
        // Defines what type of cells can be rendered
        legendSpec: PropTypes.objectOf(
            PropTypes.shape({
                header: PropTypes.func,
                cell: PropTypes.func,
            })
        ),
        legendValueCallback: PropTypes.func,
    };

    static defaultProps = {
        legendItems: defaultLegendItems,
        legendSpec: {
            icon: {
                header: () => <span className="chart-legend-icon-container" />,
                cell: () => (
                    <span className="chart-legend-icon-container">
                        <span className="chart-legend-icon" />
                    </span>
                ),
            },
            label: {
                header: () => <span className="chart-legend-label" />,
                cell: (series, { key }) => (
                    <span className="chart-legend-label">{objectGet(series, key)}</span>
                ),
            },
            value: {
                header: ({ header }) => <span className="chart-legend-value">{header}</span>,
                cell: (series, { key }, { legendValueCallback }) => (
                    <span className="chart-legend-value">
                        {legendValueCallback(objectGet(series, key))}
                    </span>
                ),
            },
            change: {
                header: () => <span className="chart-legend-change" />,
                cell: (series, { firstKey, secondKey }) => (
                    <span className="chart-legend-change">
                        <ChangeIcon
                            value={objectGet(series, firstKey) - objectGet(series, secondKey)}
                        />
                    </span>
                ),
            },
        },
        legendValueCallback(value) {
            return abbreviateNumber(value);
        },
    };

    renderLegendItems() {
        const { series, colorRange, legendItems, legendSpec, legendValueCallback } = this.props;

        return series.map(({ name, label, ...seriesParams }, index) => {
            // Add the colorRange and index to the series object
            const seriesRow = { colorRange, index, ...seriesParams };

            // Construct the body cells
            const cells = legendItems.map(({ type, params = {} }, cellIndex) => {
                const Element = legendSpec[type].cell(seriesRow, params, {
                    legendValueCallback,
                });

                return React.cloneElement(Element, { key: cellIndex });
            });

            return <li key={shortid.generate()}>{cells}</li>;
        });
    }

    render() {
        const { legendItems, legendSpec } = this.props;
        const hasHeader = legendItems.some(item => item.type === 'value');

        const legendClassName = classNames({
            'chart-legend': true,
            'chart-legend-flat': !hasHeader,
        });
        const header = legendItems.map(({ type, params = {} }, index) =>
            React.cloneElement(legendSpec[type].header(params), { key: index })
        );

        return (
            <ul className={legendClassName}>
                {hasHeader && <li>{header}</li>}
                {this.renderLegendItems()}
            </ul>
        );
    }
}

export {
    ChartLegend as default,
    datePeriodLegendItems,
    weekPeriodLegendItems,
    labelSeriesLegendItems,
};
