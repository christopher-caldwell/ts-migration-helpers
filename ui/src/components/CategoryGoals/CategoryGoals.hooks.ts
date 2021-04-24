import { useMemo } from 'react';

export const useCategoryGoalsList = (allCategoriesList, stationCategoriesData) => {
    const getCategoryGoalsList = (allCategories, stationCategories) => {
        const stationCategoriesList = {};
        Object.entries(stationCategories || {}).forEach(([categoryId, categoryValue]) => {
            stationCategoriesList[categoryId] = {
                ...categoryValue,
                limit: categoryValue.limit || '',
                currentLimit: categoryValue.limit || '',
            };
        });

        return Object.keys(allCategories || {})
            .map(categoryId => ({
                ...allCategories[categoryId],
                ...stationCategoriesList[categoryId],
            }))
            .sort((a, b) => {
                let weightA = 0;
                let weightB = 0;
                if (a.active !== undefined && a.active !== null) {
                    weightA += 3;
                    if (a.active === true) weightA += 2;
                }
                if (b.active !== undefined && b.active !== null) {
                    weightB += 3;
                    if (b.active === true) weightB += 2;
                }
                if (a.orderBy < b.orderBy) weightA += 1;
                else weightB += 1;
                return weightB - weightA;
            });
    };
    return useMemo(() => getCategoryGoalsList(allCategoriesList, stationCategoriesData), [
        allCategoriesList,
        stationCategoriesData,
    ]);
};
