// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeTab' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeTab' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'linkTo' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{}'.
import TabItem from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/TabItem';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
const renderTabItem = (options = {}) => (
    shallow(
        <TabItem
            activeTab={options.activeTab || ''}
            label={options.label || ''}
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            linkTo={options.linkTo || ''}
            onClick={options.onClick || (() => { })}
            name={options.name || ''}
        />,
    )
);

describe('<TabItem />', () => {
    it('Should render active tab', () => {
        const component = renderTabItem({
            activeTab: 'test',
            label: 'test',
            linkTo: '/test',
            name: 'test',
        });
        expect(component.find('Link')).toHaveLength(1);
        expect(component.find('li')).toHaveLength(1);
        expect(component.find('.tab-item--active')).toHaveLength(1);
    });

    it('Should render non active tab', () => {
        const component = renderTabItem({
            label: 'test',
            linkTo: 'test',
            name: 'test',
        });
        expect(component.find('Link')).toHaveLength(1);
        expect(component.find('li')).toHaveLength(1);
        expect(component.find('.tab-item--active')).not.toHaveLength(1);
    });
});
