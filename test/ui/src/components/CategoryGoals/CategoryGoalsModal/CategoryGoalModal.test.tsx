import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategories' does not exist on typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'getCategoriesMetadataAction' does not ex... Remove this comment to see the full error message
import CategoryGoalsModal from './CategoryGoalsModal.component';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesMetadata' does not exist on ty... Remove this comment to see the full error message
const renderCategoryGoalsModalComponent = (options = {}) => shallow(
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategories' does not exist on typ... Remove this comment to see the full error message
    <CategoryGoalsModal
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ boardDetails: any; categoriesMetadata: any... Remove this comment to see the full error message
        boardDetails={options.boardDetails || {}}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeCategoryGoalsModal' does not exist ... Remove this comment to see the full error message
        categoriesMetadata={options.categoriesMetadata || {}}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCategoriesMetadataAction' does not ex... Remove this comment to see the full error message
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
