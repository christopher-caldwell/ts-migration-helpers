// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'sortProps' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'sortProps' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
import SortButton from 'components/Controls/SortButton';

const renderSortButton = (options = {}) => (
    mount(
        <SortButton
            sort={options.sortProps}
            sortKey="test string"
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            onClick={options.onClick || (() => { })}
            className={options.sortProps.ascending
                ? 'sort-button-asc' : 'sort-button-desc'}
        />,
    )
);

describe('<SortButton />', () => {
    it('should render component', () => {
        const component = renderSortButton({
            sortProps: {
                ascending: false,
                field: 'test field',
            },
        });
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('.sort-button')).toHaveLength(1);
    });

    it('Click should trigger onClick function', () => {
        const mockOnClick = jest.fn();
        const component = renderSortButton({
            sortProps: {
                ascending: false,
                field: 'test field',
            },
            onClick: mockOnClick,
            className: 'test-class',
        });
        component.find('button').simulate('click');
        expect(mockOnClick).toBeCalled();
    });

    it('When ascending is false should find desc class', () => {
        const component = renderSortButton({
            sortProps: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onButtonClick' does not exist on type '{... Remove this comment to see the full error message
                ascending: false,
                field: 'test field',
            },
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onButtonClick' does not exist on type '{... Remove this comment to see the full error message
        expect(component.find('.sort-button-asc')).toHaveLength(0);
        expect(component.find('.sort-button-desc')).toHaveLength(1);
    });

    it('When ascending is true should find asc class', () => {
        const component = renderSortButton({
            sortProps: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onButtonClick' does not exist on type '{... Remove this comment to see the full error message
                ascending: true,
                field: 'test field',
            },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onButtonClick' does not exist on type '{... Remove this comment to see the full error message
        });
        expect(component.find('.sort-button-asc')).toHaveLength(1);
        expect(component.find('.sort-button-desc')).toHaveLength(0);
    });

    it('default onChange should be triggered', () => {
        expect(SortButton.defaultProps.onButtonClick).toBeDefined();
        const result = SortButton.defaultProps.onButtonClick();
        expect(result).toBe(undefined);
    });
});
