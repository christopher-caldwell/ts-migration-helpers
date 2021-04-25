import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggle' does not exist on type '{}'.
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
