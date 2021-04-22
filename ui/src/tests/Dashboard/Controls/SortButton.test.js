import React from 'react';
import { mount } from 'enzyme';

import SortButton from 'components/Controls/SortButton';

const renderSortButton = (options = {}) => (
    mount(
        <SortButton
            sort={options.sortProps}
            sortKey="test string"
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
                ascending: false,
                field: 'test field',
            },
        });
        expect(component.find('.sort-button-asc')).toHaveLength(0);
        expect(component.find('.sort-button-desc')).toHaveLength(1);
    });

    it('When ascending is true should find asc class', () => {
        const component = renderSortButton({
            sortProps: {
                ascending: true,
                field: 'test field',
            },
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
