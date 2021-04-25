// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'allCategories' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'allCategories' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
export const getRawStationCategories = (allCategories, stationCategories) =>
    Object.keys(stationCategories || {})
        .reduce(
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            (rawStationCategories, categoryId) => [
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'string'.
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                ...rawStationCategories,
                {
                    ...allCategories[categoryId],
                    ...stationCategories[categoryId],
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'string'.
                    value: categoryId,
                },
            ],
            []
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'string'.
        .sort((a, b) => a.orderBy - b.orderBy);
