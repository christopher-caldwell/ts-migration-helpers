import React from 'react';
import { mount } from 'enzyme';

import Category from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/Filters/Category';

const renderCategory = (options = {}) => (
    mount(
        <Category
            activeCategoryPanel={options.activeCategoryPanel}
            handleCategoryFilterSelect={options.handleCategoryFilterSelect}
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

    it('BuildAccordion should return undefined', () => {
        const mockOnSelect = jest.fn();
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
