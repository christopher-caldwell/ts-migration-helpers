import Color from 'color';

function makeColorRange(colors: any) {
    const { length } = colors;

    return (index: any) => {
    // Index in normal color range
        if (index < length) {
            return colors[index];
        }

        // Otherwise, let's manipulate that color into something new
        const color = Color(colors[index % length]);
        const rotate = Math.floor(index / length) * 30;

        return color
            .rotate(rotate)
            .hex()
            .toLowerCase();
    };
}

const defaultColors = [
    '#751679',
    '#00e5ff',
    '#ff6600',
    '#398ef8',
    '#bd10e0',
    '#3a3939',
    '#1d8348',
    '#f1c40f',
    '#c0392b',
    '#f5cba7',
    '#6f7c7d',
    '#1abc9c',
    '#784212',
    '#1a5276',
    '#f1948a',
    '#eaecee',
];

const defaultRange = makeColorRange(defaultColors);

const positive = '#7ed321';
const negative = '#d00202';

export {
    makeColorRange, defaultColors, defaultRange, positive, negative,
};
