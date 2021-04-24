import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import CategoryGoals from '../CategoryGoals.component';

const categoryGoalsRoot = document.getElementById('category-goals');
const element = document.createElement('div');

const CategoryGoalsModal = ({
    boardDetails,
    categoriesMetadata,
    stationCategories,
    closeCategoryGoals,
    updateStationCategoriesAction,
}) => {
    useEffect(() => {
        categoryGoalsRoot.appendChild(element);
        return () => {
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
