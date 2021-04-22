import React from 'react';
import { mount } from 'enzyme';

import ExpandableFilter from 'components/Director/Components/ExpandableFilter';

const mockList = [{
    label: 'test label 1',
    value: 1,
}, {
    label: 'test label 2',
    value: 2,
}];
const renderExpandableFilter = (options = {}) => (
    mount(
        <ExpandableFilter
            activeFilter={options.activeFilter || 'test-filter'}
            handleExpand={options.handleExpand || (() => {})}
            handleFilterSelect={options.handleFilterSelect || (() => {})}
            list={options.list || mockList}
            title={options.title || 'test title'}
            selectedItems={options.selectedItems || []}
            toggleFilter={options.toggleFilter || (() => {})}
            expanded={options.expanded || false}
        />,
    )
);

describe('ExpandableFilter', () => {
    it('should render component with correct structure', () => {
        const component = renderExpandableFilter();
        expect(component.find('.ml-accordion')).toHaveLength(1);
        expect(component.find('Panel')).toHaveLength(1);
        expect(component.find('.category-list')).toHaveLength(1);
        expect(component.find('.category-list__item')).toHaveLength(3);
    });

    it('click on select all item should trigger handleFilterSelect without first param', () => {
        const mockHandleFilterSelect = jest.fn();
        const component = renderExpandableFilter({
            handleFilterSelect: mockHandleFilterSelect,
        });
        component.find('.category-list__item').at(0).simulate('click');
        expect(mockHandleFilterSelect).toHaveBeenCalled();
        expect(mockHandleFilterSelect).toHaveBeenCalledWith(null, true);
    });

    it('click on any other item should trigger handleFilterSelect with first param', () => {
        const mockHandleFilterSelect = jest.fn();
        const component = renderExpandableFilter({
            handleFilterSelect: mockHandleFilterSelect,
        });
        component.find('.category-list__item').at(1).simulate('click');
        expect(mockHandleFilterSelect).toHaveBeenCalled();
        expect(mockHandleFilterSelect).toHaveBeenCalledWith(mockList[0], false);
    });

    it('Accordion should trigger toggleFilter', () => {
        const mockToggleFilter = jest.fn();
        const component = renderExpandableFilter({
            toggleFilter: mockToggleFilter,
            expanded: true,
        });
        component.find('Panel').find('a').at(0).simulate('click');
        expect(mockToggleFilter).toHaveBeenCalled();
    });
});
