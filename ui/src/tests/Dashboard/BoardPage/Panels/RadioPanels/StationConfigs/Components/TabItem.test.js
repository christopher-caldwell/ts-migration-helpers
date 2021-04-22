import React from 'react';
import { shallow } from 'enzyme';
import TabItem from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/TabItem';

const renderTabItem = (options = {}) => (
    shallow(
        <TabItem
            activeTab={options.activeTab || ''}
            label={options.label || ''}
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
