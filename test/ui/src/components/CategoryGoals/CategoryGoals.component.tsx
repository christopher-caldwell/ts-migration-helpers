import React, { useState } from 'react';
import isEqual from 'lodash/isEqual';
import StationHeader from 'components/StationHeader';
import MusicLabOverlay from 'components/MusicLabOverlay';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CategoryGoals.module.scss' o... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CategoryGoals.module.scss' o... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'board' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CategoryGoals.module.scss' o... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoriesData' implicitly has an... Remove this comment to see the full error message
import style from './CategoryGoals.module.scss';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategoriesData' implicitly... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'board' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closeCategoryGoals' implicitly ha... Remove this comment to see the full error message
import CategoryGoalsTable from './CategoryGoalsTable';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
import { useCategoryGoalsList } from './CategoryGoals.hooks';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoriesData' implicitly has an... Remove this comment to see the full error message
const CategoryGoals = ({
    boardDetails: {
        layout: {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategoriesData' implicitly... Remove this comment to see the full error message
            board,
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategoriesError' implicitl... Remove this comment to see the full error message
            board: { id },
        },
    },
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategoriesLoading' implici... Remove this comment to see the full error message
    categoriesMetadata: { data: categoriesData },
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closeCategoryGoals' implicitly ha... Remove this comment to see the full error message
    stationCategories: {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'updateStationCategoriesAction' im... Remove this comment to see the full error message
        data: stationCategoriesData,
        error: stationCategoriesError,
        loading: stationCategoriesLoading,
    },
    closeCategoryGoals,
    updateStationCategoriesAction,
}) => {
    const [showOverlay, setShowOverlay] = useState(false);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    const initialCategoryGoalsList = useCategoryGoalsList(categoriesData, stationCategoriesData);
    const [categoryGoalsList, setCategoryGoalsList] = useState(initialCategoryGoalsList);

    const handleIdealCount = (e, categoryId) => {
        const value = e && e.target.value;
        const isNumber = /^(\s*|\d+)$/.test(value);

        if (!isNumber) return;

        const updatedCategoryList = categoryGoalsList.map(category => {
            if (category.id === categoryId) {
                return { ...category, limit: Number(value) };
            }
            return category;
        });

        setCategoryGoalsList(updatedCategoryList);
    };

    const applyCategoryChanges = () => {
        const categoryChanges = categoryGoalsList
            .map(category => {
                if (category.limit !== category.currentLimit) {
                    return {
                        categoryId: category.id,
                        limit: Number(category.limit) === 0 ? null : Number(category.limit),
                    };
                }
                return null;
            })
            .filter(item => item);

        updateStationCategoriesAction(id, categoryChanges);
        setShowOverlay(true);
    };

    const overlaySucessClose = () => {
        setShowOverlay(false);
        closeCategoryGoals();
    };

    const overlayFailClose = () => {
        setShowOverlay(false);
    };

    const renderOverlay = () => (
        <MusicLabOverlay
            successClose={overlaySucessClose}
            failClose={overlayFailClose}
            loading={stationCategoriesLoading}
            error={stationCategoriesError}
            backToMessage="Close"
        />
    );

    const noChanges = isEqual(initialCategoryGoalsList, categoryGoalsList);

    return (
        <div className={`container-fluid ${style.categoryGoals}`}>
            <StationHeader station={board} />
            <h5>Category Goals</h5>
            <button
                type="button"
                className={`btn-close ${style.btnX}`}
                onClick={() => closeCategoryGoals()}
            >
                <i className="fa fa-times x-button" />
            </button>
            {showOverlay ? renderOverlay() : null}
            <CategoryGoalsTable
                categoryList={categoryGoalsList}
                handleIdealCount={handleIdealCount}
            />
            <div className={style.actions}>
                <button
                    className={`btn btn-default ${style.btnCancelAction}`}
                    type="button"
                    onClick={() => closeCategoryGoals()}
                >
                    Close
                </button>
                <button
                    className={`btn btn-primary ${style.btnAction}`}
                    type="button"
                    onClick={() => applyCategoryChanges()}
                    disabled={noChanges}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default CategoryGoals;
