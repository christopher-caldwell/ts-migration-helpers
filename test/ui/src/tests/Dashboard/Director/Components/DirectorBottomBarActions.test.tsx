import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClear' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClear' does not exist on type '{}'.
import DirectorBottomBarActions from 'components/Director/Components/DirectorBottomBarActions';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
const renderDirectorBottomBarActions = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{}'.
        <DirectorBottomBarActions
            onClear={options.onClear || (() => {})}
            className={options.className || ''}
            count={options.count || 0}
        />,
    )
);

describe('<renderDirectorBottomBarActions />', () => {
    it('should render component', () => {
        const component = renderDirectorBottomBarActions();
        expect(component.find('.director__bottom-actions')).toHaveLength(1);
    });

    it('onClear should work', () => {
        const mockOnClear = jest.fn();
        const component = renderDirectorBottomBarActions({ count: 2, onClear: mockOnClear });
        component.find('.director__clear-selections').simulate('click');
        expect(mockOnClear).toHaveBeenCalled();
    });

    it('custom class should work', () => {
        const component = renderDirectorBottomBarActions({ className: 'test-class' });
        expect(component.find('.test-class')).toHaveLength(1);
    });

    it('count should work', () => {
        const component = renderDirectorBottomBarActions({ count: 3 });
        expect(component.find('p').text()).toBe('3 Stations selected');
        expect(component.find('TextButton').shallow().find('button').text()).toBe('Clear Selections');
    });

    it('check the correct text for count information', () => {
        const component = renderDirectorBottomBarActions({ count: 1 });
        expect(component.find('p').text()).toBe('1 Station selected');
        expect(component.find('TextButton').shallow().find('button').text()).toBe('Clear Selection');
    });

    it('should show TextButton', () => {
        const component = renderDirectorBottomBarActions({ count: 3 });
        expect(component.find('TextButton')).toHaveLength(1);
    });

    it('should not show TextButton', () => {
        const component = renderDirectorBottomBarActions();
        expect(component.find('TextButton')).toHaveLength(0);
    });
});
