export const getRawStationCategories = (allCategories, stationCategories) =>
    Object.keys(stationCategories || {})
        .reduce(
            (rawStationCategories, categoryId) => [
                ...rawStationCategories,
                {
                    ...allCategories[categoryId],
                    ...stationCategories[categoryId],
                    value: categoryId,
                },
            ],
            []
        )
        .sort((a, b) => a.orderBy - b.orderBy);
