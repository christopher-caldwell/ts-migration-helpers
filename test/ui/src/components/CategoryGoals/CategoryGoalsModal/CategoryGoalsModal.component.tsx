import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import CategoryGoals from '../CategoryGoals.component';

const categoryGoalsRoot = document.getElementById('category-goals');
const element = document.createElement('div');

const CategoryGoalsModal = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    boardDetails,
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoriesMetadata' implicitly ha... Remove this comment to see the full error message
    categoriesMetadata,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategories' implicitly has... Remove this comment to see the full error message
    stationCategories,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closeCategoryGoals' implicitly ha... Remove this comment to see the full error message
    closeCategoryGoals,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'updateStationCategoriesAction' im... Remove this comment to see the full error message
    updateStationCategoriesAction,
}) => {
    useEffect(() => {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        categoryGoalsRoot.appendChild(element);
        return () => {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            categoryGoalsRoot.removeChild(element);
        };
    }, []);

    return ReactDOM.createPortal(
        <CategoryGoals
            boardDetails={boardDetails}
            closeCategoryGoals={closeCategoryGoals}
            categoriesMetadata={categoriesMetadata}
            stationCategories={stationCategories}
            updateStationCategoriesAction={updateStationCategoriesAction}
        />,
        element,
    );
};

export default CategoryGoalsModal;
