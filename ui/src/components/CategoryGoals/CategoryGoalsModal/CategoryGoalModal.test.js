import React from 'react';
import { shallow } from 'enzyme';
import CategoryGoalsModal from './CategoryGoalsModal.component';

const renderCategoryGoalsModalComponent = (options = {}) => shallow(
    <CategoryGoalsModal
        boardDetails={options.boardDetails || {}}
        categoriesMetadata={options.categoriesMetadata || {}}
        stationCategories={options.stationCategories || {}}
        closeCategoryGoalsModal={options.closeCategoryGoalsModal || (() => {})}
        getCategoriesMetadataAction={options.getCategoriesMetadataAction || (() => {})}
    />,
);

describe('<CategoryGoalsModal />', () => {
    it('should render component correctly', () => {
        const component = renderCategoryGoalsModalComponent();
        expect(component).toBeDefined();
        expect(component.find('CategoryGoals')).toHaveLength(1);
    });
});
