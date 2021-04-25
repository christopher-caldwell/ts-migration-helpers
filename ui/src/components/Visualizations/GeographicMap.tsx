/* global d3, topojson */

import React from 'react';

import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';

/* eslint-disable func-names */

// Note: This is was used in the ideation and may be re-purposed for MVP
// Todo: Make D4 compatible
// Todo: Use ES6 import of d3
// Todo: Use iMH-supplied DMA map
// Todo: Add gradient legend
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
// Todo: Make much cleaner
class GeographicMap extends React.Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
                label: PropTypes.string,
                color: PropTypes.string,
            })
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        ).isRequired,
    };

    constructor() {
        super();

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        this.state = {
            active: 0,
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        this.draw();
    }

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
    componentDidUpdate() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        this.draw();
    }

    onButtonClick(event) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
            active: parseInt(event.target.dataset.index, 10),
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
    }

    draw() {
        const width = this.container.offsetWidth - 20;
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // Derive a map height proportional to the width
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        // These numbers are not entirely accurate
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        const height = (452.35 / 715.417) * width;
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tvError' implicitly has an 'any' type.
        // Set the type of view
        const projection = d3.geo
            .albersUsa()
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter '_' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
            // Scale the SVG path to the container width (to remove excess whitespace)
            .scale((729 / 539.617) * width)
            .translate([width / 2, height / 2]);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // Create a new geographic path generator
        const path = d3.geo.path().projection(projection);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        // Clear out previous map
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type 'Readonly... Remove this comment to see the full error message
        this.container.innerHTML = '';

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'market' implicitly has an 'any' type.
        // set svg window
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        const svg = d3
            .select(this.container)
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter '_' implicitly has an 'any' type.
            .append('svg')
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'topojson'.
            .attr('width', width)
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
            .attr('height', height);

        const graticule = d3.geo
            .graticule()
            .extent([
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                [-98 - 45, 38 - 45],
                [-98 + 45, 38 + 45],
            ])
            .step([5, 5]);

        // adding a blank background
        svg.append('rect')
            .datum(graticule)
            // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
            .attr('class', 'geographic-map')
            // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
            .attr('width', width)
            .attr('height', height);

        // declare g as our appended svg
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        const g = svg.append('g');

        const defaultFill = '#f5f5f5';
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
        const borderColor = '#ccc';
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'market' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        const hoverBorder = '#aaa';

        d3.json('nielsen-topo.json', (error, dma) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
            let nielsen = dma.objects.nielsen_dma.geometries;

            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type 'Readonly... Remove this comment to see the full error message
            // adding data from tv json (number of TVs, etc) to map json
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'topojson'.
            d3.json('tv.json', (tvError, tv) => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter '_' implicitly has an 'any' type.
                let min = 9999999;
                let max = 0;

                nielsen.forEach((_, i) => {
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                    const dmaCode = nielsen[i].id;
                    const tvData = tv[dmaCode];

                    tvData.numHomes = parseInt(tv[dmaCode]['TV Homes'], 10);

                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
                    Object.keys(tvData).forEach(key => {
                        // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
                        nielsen[i].properties[key] = tvData[key];
                    });

                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                    if (tvData.numHomes < min) {
                        // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
                        min = tvData.numHomes;
                    }

                    if (tvData.numHomes > max) {
                        max = tvData.numHomes;
                    }
                });

                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
                const color = scaleLinear()
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                    .domain([min, max])
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type 'Readonly... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                    .range([defaultFill, this.props.options[this.state.active].color]);

                nielsen = nielsen.map(market => {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type 'Readonly... Remove this comment to see the full error message
                    const newMarket = { ...market };

                    newMarket.properties.fill = color(market.properties.numHomes);

                    return newMarket;
                });

                const feature = dma.objects.nielsen_dma;
                feature.geometries = nielsen;

                g.append('g')
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'topojson'.
                    .attr('id', 'dmas')
                    .selectAll('path')
                    .data(topojson.feature(dma, feature).features)
                    .enter()
                    .append('path')
                    .attr('d', path)

                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                    .on('mouseover', function() {
                        d3.select(this)
                            .attr('stroke', hoverBorder)
                            .attr('stroke-width', 1.5);

                        // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
                        // Bring element to the front such that the border can overlap
                        this.parentNode.appendChild(this);
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                    })

                    .on('mouseout', function() {
                        d3.select(this)
                            .attr('stroke', borderColor)
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
                            .attr('stroke-width', 1);
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'd3'.
                    })

                    // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
                    .attr('opacity', 0.9)
                    .each(function(data) {
                        d3.select(this)
                            .attr('fill', data.properties.fill)
                            .attr('stroke', borderColor)
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                            .attr('stroke-width', 1);
                    });
            });
        });
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    renderButtonGroup() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        if (this.props.options.length === 1) {
            return null;
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type 'Readonly... Remove this comment to see the full error message
        const buttons = this.props.options.map((option, index) => {
            const className = classNames({
                active: index === this.state.active,
                [`compare-${index}`]: true,
            });

            return (
                <div key={option.label} className="geographic-map-option">
                    <button type="button" className={className} data-index={index} onClick={this.onButtonClick}>
                        {option.label}
                    </button>
                </div>
            );
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Geogr... Remove this comment to see the full error message
        return <div className="geographic-map-options">{buttons}</div>;
    }

    render() {
        return (
            <div className="geographic-map-container">
                <div
                    className="geographic-map"
                    ref={c => {
                        this.container = c;
                    }}
                />
                {this.renderButtonGroup()}
            </div>
        );
    }
}

export default GeographicMap;
