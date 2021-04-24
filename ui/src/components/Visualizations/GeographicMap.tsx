/* global d3, topojson */

import React from 'react';

import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import classNames from 'classnames';

/* eslint-disable func-names */

// Note: This is was used in the ideation and may be re-purposed for MVP
// Todo: Make D4 compatible
// Todo: Use ES6 import of d3
// Todo: Use iMH-supplied DMA map
// Todo: Add gradient legend
// Todo: Make much cleaner
class GeographicMap extends React.Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                color: PropTypes.string,
            })
        ).isRequired,
    };

    constructor() {
        super();

        this.state = {
            active: 0,
        };

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    onButtonClick(event) {
        this.setState({
            active: parseInt(event.target.dataset.index, 10),
        });
    }

    draw() {
        const width = this.container.offsetWidth - 20;
        // Derive a map height proportional to the width
        // These numbers are not entirely accurate
        const height = (452.35 / 715.417) * width;
        // Set the type of view
        const projection = d3.geo
            .albersUsa()
            // Scale the SVG path to the container width (to remove excess whitespace)
            .scale((729 / 539.617) * width)
            .translate([width / 2, height / 2]);

        // Create a new geographic path generator
        const path = d3.geo.path().projection(projection);

        // Clear out previous map
        this.container.innerHTML = '';

        // set svg window
        const svg = d3
            .select(this.container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const graticule = d3.geo
            .graticule()
            .extent([
                [-98 - 45, 38 - 45],
                [-98 + 45, 38 + 45],
            ])
            .step([5, 5]);

        // adding a blank background
        svg.append('rect')
            .datum(graticule)
            .attr('class', 'geographic-map')
            .attr('width', width)
            .attr('height', height);

        // declare g as our appended svg
        const g = svg.append('g');

        const defaultFill = '#f5f5f5';
        const borderColor = '#ccc';
        const hoverBorder = '#aaa';

        d3.json('nielsen-topo.json', (error, dma) => {
            let nielsen = dma.objects.nielsen_dma.geometries;

            // adding data from tv json (number of TVs, etc) to map json
            d3.json('tv.json', (tvError, tv) => {
                let min = 9999999;
                let max = 0;

                nielsen.forEach((_, i) => {
                    const dmaCode = nielsen[i].id;
                    const tvData = tv[dmaCode];

                    tvData.numHomes = parseInt(tv[dmaCode]['TV Homes'], 10);

                    Object.keys(tvData).forEach(key => {
                        nielsen[i].properties[key] = tvData[key];
                    });

                    if (tvData.numHomes < min) {
                        min = tvData.numHomes;
                    }

                    if (tvData.numHomes > max) {
                        max = tvData.numHomes;
                    }
                });

                const color = scaleLinear()
                    .domain([min, max])
                    .range([defaultFill, this.props.options[this.state.active].color]);

                nielsen = nielsen.map(market => {
                    const newMarket = { ...market };

                    newMarket.properties.fill = color(market.properties.numHomes);

                    return newMarket;
                });

                const feature = dma.objects.nielsen_dma;
                feature.geometries = nielsen;

                g.append('g')
                    .attr('id', 'dmas')
                    .selectAll('path')
                    .data(topojson.feature(dma, feature).features)
                    .enter()
                    .append('path')
                    .attr('d', path)

                    .on('mouseover', function() {
                        d3.select(this)
                            .attr('stroke', hoverBorder)
                            .attr('stroke-width', 1.5);

                        // Bring element to the front such that the border can overlap
                        this.parentNode.appendChild(this);
                    })

                    .on('mouseout', function() {
                        d3.select(this)
                            .attr('stroke', borderColor)
                            .attr('stroke-width', 1);
                    })

                    .attr('opacity', 0.9)
                    .each(function(data) {
                        d3.select(this)
                            .attr('fill', data.properties.fill)
                            .attr('stroke', borderColor)
                            .attr('stroke-width', 1);
                    });
            });
        });
    }

    renderButtonGroup() {
        if (this.props.options.length === 1) {
            return null;
        }

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
