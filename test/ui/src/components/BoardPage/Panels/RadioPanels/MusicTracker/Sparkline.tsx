// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dataValue' implicitly has an 'any... Remove this comment to see the full error message
import { getQuintileColor } from 'utils/quintileColoring';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
const Sparkline = ({ data, colorDetails: { dataValue, colorValue, isTAA } }) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
            </Sparklines>
        </div>
    );
};

Sparkline.propTypes = {
    colorDetails: PropTypes.shape().isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default Sparkline;
