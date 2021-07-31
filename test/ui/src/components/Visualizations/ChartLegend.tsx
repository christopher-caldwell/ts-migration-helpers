import React from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'datePeriod' implicitly has an 'an... Remove this comment to see the full error message
// Preset legend items for convenience
const defaultLegendItems = [{ type: 'icon' }, { type: 'label', params: { key: 'name' } }];
const labelSeriesLegendItems = [
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'datePeriod' implicitly has an 'an... Remove this comment to see the full error message
    { type: 'icon' },
    { type: 'label', params: { key: 'label' } },
    { type: 'value', params: { key: 'value' } },
];
const datePeriodLegendItems = ({ datePeriod }) => [
    { type: 'icon' },
    { type: 'label', params: { key: 'name' } },
    {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'datePeriod' implicitly has an 'an... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
            })
        ),
        legendValueCallback: PropTypes.func,
    };

    static defaultProps = {
        legendItems: defaultLegendItems,
        legendSpec: {
            icon: {
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'header' implicitly has an 'any' t... Remove this comment to see the full error message
                header: () => <span className="chart-legend-icon-container" />,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
                cell: () => (
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'legendValueCallback' implicitly h... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
                    <span className="chart-legend-icon-container">
                        <span className="chart-legend-icon" />
                    </span>
                ),
            },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'header' implicitly has an 'any' t... Remove this comment to see the full error message
            label: {
                header: () => <span className="chart-legend-label" />,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
                cell: (series, { key }) => (
                    <span className="chart-legend-label">{objectGet(series, key)}</span>
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'series' does not exist on type 'Readonly... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
                ),
            },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
            value: {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type.
                header: ({ header }) => <span className="chart-legend-value">{header}</span>,
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'header' implicitly has an 'any' t... Remove this comment to see the full error message
                cell: (series, { key }, { legendValueCallback }) => (
                    <span className="chart-legend-value">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'legendItems' does not exist on type 'Rea... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type. */}
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type. */}
                        {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'series' does not exist on type 'Readonly... Remove this comment to see the full error message */}
                        {legendValueCallback(objectGet(series, key))}
                    </span>
                ),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
            },
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
            change: {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
                header: () => <span className="chart-legend-change" />,
                cell: (series, { firstKey, secondKey }) => (
                    <span className="chart-legend-change">
                        {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'series' implicitly has an 'any' type. */}
                        <ChangeIcon
                            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'secondKey' implicitly has an 'any... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'legendItems' does not exist on type 'Rea... Remove this comment to see the full error message
                            value={objectGet(series, firstKey) - objectGet(series, secondKey)}
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'legendSpec' does not exist on type 'Read... Remove this comment to see the full error message
                        />
                    </span>
                ),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            },
        },
        legendValueCallback(value) {
            return abbreviateNumber(value);
        },
    };

    renderLegendItems() {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        const { series, colorRange, legendItems, legendSpec, legendValueCallback } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'series' does not exist on type 'Readonly... Remove this comment to see the full error message
        return series.map(({ name, label, ...seriesParams }, index) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'legendValueCallback' does not exist on t... Remove this comment to see the full error message
            // Add the colorRange and index to the series object
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
            const seriesRow = { colorRange, index, ...seriesParams };

            // Construct the body cells
            const cells = legendItems.map(({ type, params = {} }, cellIndex) => {
                const Element = legendSpec[type].cell(seriesRow, params, {
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(2339) FIXME: Property 'legendItems' does not exist on type 'Rea... Remove this comment to see the full error message

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'legendSpec' does not exist on type 'Read... Remove this comment to see the full error message
        const legendClassName = classNames({
            'chart-legend': true,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            'chart-legend-flat': !hasHeader,
        });
        const header = legendItems.map(({ type, params = {} }, index) =>
            React.cloneElement(legendSpec[type].header(params), { key: index })
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
        );

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
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
