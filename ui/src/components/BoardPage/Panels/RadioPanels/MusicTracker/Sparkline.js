import React from 'react';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import PropTypes from 'prop-types';

import { getQuintileColor } from 'utils/quintileColoring';

const Sparkline = ({ data, colorDetails: { dataValue, colorValue, isTAA } }) => {
    if (data.length <= 1) return null;

    const sortedData = isTAA
        ? data.map(datum => parseFloat(datum)).sort((a, b) => a - b)
        : [...data].sort((a, b) => a - b);
    const maxValue = isTAA ? sortedData[sortedData.length - 1] + 0.3 : sortedData[sortedData.length - 1] + 5;
    const minValue = isTAA ? sortedData[0] - 0.3 : sortedData[0] - 5;
    const width = (30 * data.length) / 6;
    const style = {
        height: '15px',
        width: `${width}px`,
        marginLeft: 30 - width,
    };
    const currentColor = isTAA ? getQuintileColor(colorValue, true) : getQuintileColor(dataValue);

    return (
        <div className="music-tracker-sparkline" style={style}>
            <Sparklines
                data={data}
                height={15}
                width={width}
                preserveAspectRatio="xMaxYMin"
                min={minValue}
                max={maxValue}
            >
                <SparklinesLine style={{ fill: 'none', strokeWidth: 2 }} color={currentColor} />
                <SparklinesSpots style={{ fill: currentColor }} />
            </Sparklines>
        </div>
    );
};

Sparkline.propTypes = {
    colorDetails: PropTypes.shape().isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default Sparkline;
