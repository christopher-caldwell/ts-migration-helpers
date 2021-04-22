import React from 'react';
import { shallow } from 'enzyme';

import SearchField from 'components/SearchField';

const renderSearchField = (options = {}) => (
    shallow(
        <SearchField
            onSearchChange={options.onSearchChange || (() => {})}
            className={options.className || 'test-class'}
            handleReset={options.handleReset || (() => {})}
            hasResetButton={options.hasResetButton}
            placeholder={options.placeholder || 'test placeholder'}
            value={options.value || 'test value'}
        />,
    )
);

describe('<SearchField />', () => {
    it('should render component with all components inside', () => {
        const component = renderSearchField();
        expect(component.find('.search-field')).toHaveLength(1);
        expect(component.find('.search-field__container')).toHaveLength(1);
        expect(component.find('.search-field__icon')).toHaveLength(1);
        expect(component.find('.test-class')).toHaveLength(1);
        expect(component.find('input').props().placeholder).toBe('test placeholder');
    });

    it('inputting text to search field should trigger a searchChange', done => {
        const mockOnSearchChange = jest.fn();
        const component = renderSearchField({ onSearchChange: mockOnSearchChange });
        const testString = 'test string';
        component.find('input').simulate('change', { target: { value: testString } });
        setTimeout(() => {
            expect(mockOnSearchChange).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('changing props should update searchValue in state', () => {
        const component = renderSearchField();
        const testValue = 'new test value';
        component.setState({ searchValue: testValue });
        expect(component.state().searchValue).toBe(testValue);
    });
});
