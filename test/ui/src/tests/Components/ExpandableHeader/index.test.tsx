import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggle' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
import ExpandableHeader from 'components/ExpandableHeader';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type '{}'.
const renderExpandableHeader = (options = {}) => (
    mount(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
        <ExpandableHeader
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggle' does not exist on type '{}'.
            children={options.children || null}
            expanded={options.expanded || false}
            title={options.title || 'Header Name'}
            onToggle={options.onToggle || (() => {})}
        />,
    )
);

describe('<ExpandableHeader />', () => {
    it('should render component', () => {
        const component = renderExpandableHeader();
        expect(component.find('.expandable-header')).toHaveLength(1);
        expect(component.find('.expandable-header__arrow')).toHaveLength(1);
        expect(component.find('.expandable-header__title')).toHaveLength(1);
    });

    it('should render children element', () => {
        const component = renderExpandableHeader({
            children: <p>Children Element</p>,
        });
        expect(component.find('p').text()).toBe('Children Element');
    });
});
