import React from 'react';
import { mount } from 'enzyme';

import ExpandableHeader from 'components/ExpandableHeader';

const renderExpandableHeader = (options = {}) => (
    mount(
        <ExpandableHeader
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
