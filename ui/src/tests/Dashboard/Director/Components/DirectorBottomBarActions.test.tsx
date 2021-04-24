import React from 'react';
import { shallow } from 'enzyme';

import DirectorBottomBarActions from 'components/Director/Components/DirectorBottomBarActions';

const renderDirectorBottomBarActions = (options = {}) => (
    shallow(
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
