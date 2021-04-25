import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeCategoryPanel' does not exist on t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleCategoryFilterSelect' does not exi... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategories' does not exist on typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeCategoryPanel' does not exist on t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelect' does not exist on type '{}'.
import Category from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/Filters/Category';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleCategoryFilterSelect' does not exi... Remove this comment to see the full error message
const renderCategory = (options = {}) => (
    mount(
        <Category
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategories' does not exist on typ... Remove this comment to see the full error message
            activeCategoryPanel={options.activeCategoryPanel}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCategories' does not exist on ty... Remove this comment to see the full error message
            handleCategoryFilterSelect={options.handleCategoryFilterSelect}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelect' does not exist on type '{}'.
            stationCategories={options.stationCategories}
            selectedCategories={options.selectedCategories}
            onSelect={options.onSelect}
        />,
    )
);

describe('<Category />', () => {
    it('Should component render with description', () => {
        const mockOnSelect = jest.fn();
        const mockHandleCategoryFilter = jest.fn();
        const component = renderCategory({
            activeCategoryPanel: 'test-activeCategoryPanel',
            handleCategoryFilterSelect: mockHandleCategoryFilter,
            stationCategories: [{
                label: 'test-label',
                description: 'test-description',
            }],
            selectedCategories: {
                prior: [{ label: 'test-prior' }],
                current: [{ label: 'test-current' }],
                // @ts-expect-error ts-migrate(6133) FIXME: 'component' is declared but its value is never rea... Remove this comment to see the full error message
                new: [{ label: 'test-new' }],
            },
            onSelect: mockOnSelect,
        });
        expect(component.find('.ml-accordion')).toHaveLength(1);
    });

    it('Should component render without description', () => {
        const mockOnSelect = jest.fn();
        const mockHandleCategoryFilter = jest.fn();
        const component = renderCategory({
            activeCategoryPanel: 'test-activeCategoryPanel',
            handleCategoryFilterSelect: mockHandleCategoryFilter,
            stationCategories: [{ description: null }],
            selectedCategories: {
                prior: [{ label: 'test-prior' }],
                current: [{ label: 'test-current' }],
                new: [{ label: 'test-new' }],
            },
            onSelect: mockOnSelect,
        });
        expect(component.find('.ml-accordion')).toHaveLength(1);
    });

    // @ts-expect-error ts-migrate(6133) FIXME: 'component' is declared but its value is never rea... Remove this comment to see the full error message
    it('BuildAccordion should return undefined', () => {
        const mockOnSelect = jest.fn();
        // @ts-expect-error ts-migrate(6133) FIXME: 'component' is declared but its value is never rea... Remove this comment to see the full error message
        const mockHandleCategoryFilter = jest.fn();
        const component = renderCategory({
            activeCategoryPanel: 'test-activeCategoryPanel',
            handleCategoryFilterSelect: mockHandleCategoryFilter,
            stationCategories: [{ label: 'Out of sync' }],
            selectedCategories: {
                prior: [{ label: 'test-prior' }],
                current: [{ label: 'test-current' }],
                new: [{ label: 'test-new' }],
            },
            onSelect: mockOnSelect,
        });
    });

    it('onClick should trigger handleCategorySelection', () => {
        const mockOnSelect = jest.fn();
        const mockHandleCategoryFilter = jest.fn();
        const component = renderCategory({
            activeCategoryPanel: 'test-activeCategoryPanel',
            handleCategoryFilterSelect: mockHandleCategoryFilter,
            stationCategories: [{
                label: 'test-label',
                description: 'test-description',
            }],
            selectedCategories: {
                prior: [{ label: 'test-prior' }],
                current: [{ label: 'test-current' }],
                new: [{ label: 'test-new' }],
            },
            onSelect: mockOnSelect,
        });
        component.find('.category-list__item').at(0).simulate('click');
        expect(mockHandleCategoryFilter).toHaveBeenCalled();
    });
});
