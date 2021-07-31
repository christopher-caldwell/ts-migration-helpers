const breakpoints = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
];

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
function round(n, decimals) {
    const exponent = 10 ** decimals;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'number' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    return parseFloat(Math.round(n * exponent) / exponent);
}

/**
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'number' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
            if (breakpoint.value !== 1000) {
                decimalFormat = 2;
            }
            const rounded = round(number / breakpoint.value, decimalFormat);
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
            formatted = `${rounded}${breakpoint.symbol}`;

            return true;
        }

        return false;
    });
    return formatted;
}

export default abbreviateNumber;
