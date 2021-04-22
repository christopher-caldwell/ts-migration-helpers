import React from 'react';
import { shallow } from 'enzyme';

import ExpandButton from './ExpandButton.component';

const renderComponent = (options = {}) => shallow(<ExpandButton expanded={options.expanded || false} onToggle={options.onToggle || (() => {})} />);

describe('ExpandButton component', () => {
    it('should render component', () => {
        const component = renderComponent();
        expect(component).toBeDefined();
    });

    it('should start not expanded', () => {
        const component = renderComponent();
        expect(component.find('button').text()).toBe('+');
    });

    it('clicking the button should trigger the onToggle prop', () => {
        const mockOnToggle = jest.fn();
        const component = renderComponent({ onToggle: mockOnToggle });
        component.find('button').simulate('click');
        expect(mockOnToggle).toHaveBeenCalled();
    });

    it('when expanded label changes', () => {
        const component = renderComponent({ expanded: true });
        expect(component.find('button').text()).toBe('-');
    });
});
