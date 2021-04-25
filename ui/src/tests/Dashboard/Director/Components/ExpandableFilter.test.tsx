// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeFilter' does not exist on type '{}... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleExpand' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleFilterSelect' does not exist on ty... Remove this comment to see the full error message
import ExpandableFilter from 'components/Director/Components/ExpandableFilter';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type '{}'.
const mockList = [{
    label: 'test label 1',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleExpand' does not exist on type '{}... Remove this comment to see the full error message
    value: 1,
}, {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type '{}'.
    label: 'test label 2',
    value: 2,
}];
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleFilterSelect' does not exist on ty... Remove this comment to see the full error message
const renderExpandableFilter = (options = {}) => (
    mount(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type '{}'.
        <ExpandableFilter
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedItems' does not exist on type '{... Remove this comment to see the full error message
            activeFilter={options.activeFilter || 'test-filter'}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type '{}'.
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
