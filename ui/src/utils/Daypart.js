export const groupSequentialHours = (hours = []) => hours
    .sort((a, b) => a - b)
    .reduce((acc, cur, idx, src) => {
        const isFirst = !idx;
        const isSequential = cur === src[idx - 1] + 1;
        const isNewDay = (cur + 1) % 24 === 0;

        // Creates new group when sequence or day breaks
        if (isFirst || !isSequential || isNewDay) {
            acc.push([]);
        }
        // Add current to last group
        acc[acc.length - 1].push(cur);
        return acc;
    }, []);

export const convertHourOfWeekToHourOfDay = hour => ({
    weekDay: Math.floor(hour / 24),
    hourPeriod: {
        hour: (hour % 24) % 12,
        period: Math.floor((hour % 24) / 12),
    },
});
