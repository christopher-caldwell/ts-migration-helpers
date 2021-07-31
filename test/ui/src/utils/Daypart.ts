export const groupSequentialHours = (hours = []) => hours
    .sort((a, b) => a - b)
    .reduce((acc, cur, idx, src) => {
        const isFirst = !idx;
        const isSequential = cur === src[idx - 1] + 1;
        const isNewDay = (cur + 1) % 24 === 0;

        // Creates new group when sequence or day breaks
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'never[]' is not assignable to pa... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'never[]' is not assignable to pa... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'never[]' is not assignable to pa... Remove this comment to see the full error message
        if (isFirst || !isSequential || isNewDay) {
            acc.push([]);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
        }
        // Add current to last group
        acc[acc.length - 1].push(cur);
        return acc;
    }, []);

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
export const convertHourOfWeekToHourOfDay = hour => ({
    weekDay: Math.floor(hour / 24),
    hourPeriod: {
        hour: (hour % 24) % 12,
        period: Math.floor((hour % 24) / 12),
    },
});
