const breakpoints = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
];

function round(n, decimals) {
    const exponent = 10 ** decimals;
    return parseFloat(Math.round(n * exponent) / exponent);
}

/**
 * Format a large number into a human-readable abbreviation.
 *
 * @param {Number} number
 * @param {Number} decimals
 *
 * @returns {*}
 */
function abbreviateNumber(number, decimals = 1) {
    let formatted = round(number, decimals);
    breakpoints.some(breakpoint => {
        if (Math.abs(number) > breakpoint.value) {
            let decimalFormat = decimals;
            // this is to make sure the user see 2 decimal points if the number is large than 1000
            if (breakpoint.value !== 1000) {
                decimalFormat = 2;
            }
            const rounded = round(number / breakpoint.value, decimalFormat);
            formatted = `${rounded}${breakpoint.symbol}`;

            return true;
        }

        return false;
    });
    return formatted;
}

export default abbreviateNumber;
