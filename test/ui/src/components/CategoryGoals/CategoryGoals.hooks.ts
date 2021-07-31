import { useMemo } from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'allCategoriesList' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'allCategoriesList' implicitly has an 'a... Remove this comment to see the full error message
export const useCategoryGoalsList = (allCategoriesList, stationCategoriesData) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'allCategories' implicitly has an 'any' ... Remove this comment to see the full error message
    const getCategoryGoalsList = (allCategories, stationCategories) => {
        const stationCategoriesList = {};
        Object.entries(stationCategories || {}).forEach(([categoryId, categoryValue]) => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            stationCategoriesList[categoryId] = {
                ...categoryValue,
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
                limit: categoryValue.limit || '',
                currentLimit: categoryValue.limit || '',
            };
        });

        return Object.keys(allCategories || {})
            .map(categoryId => ({
                ...allCategories[categoryId],
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
