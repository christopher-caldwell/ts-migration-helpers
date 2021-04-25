// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSearchChange: any; className: any; handl... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSearchChange' does not exist on type '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSearchChange: any; className: any; handl... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hasResetButton' does not exist on type '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleReset' does not exist on type '{}'... Remove this comment to see the full error message
import SearchField from 'components/SearchField';

const renderSearchField = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasResetButton' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSearchChange: any; className: any; handl... Remove this comment to see the full error message
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
