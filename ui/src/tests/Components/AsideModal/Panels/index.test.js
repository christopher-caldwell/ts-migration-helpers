import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import AsideModalPanels from 'components/AsideModal/Panels';

const mockStore = configureStore();
const store = mockStore({
    songVersions: [],
    restrictions: {
        data: [],
    },
});
const mockgroupedCategorySongs = [
    {
        title: 'test title',
        featureName: 'test featureName',
    },
];

const renderAsideModalPanels = (options = {}) => (
    shallow(
        <AsideModalPanels
            featureName={options.featureName || 'Feature Name'}
            groupedCategorySongs={options.groupedCategorySongs || mockgroupedCategorySongs}
            handleClose={options.handleClose || (() => {})}
            versions={options.versions || []}
            packet={options.packet || {}}
            store={store}
        />,
    )
);

describe('<AsideModalPanels />', () => {
    it('should render component', () => {
        const component = renderAsideModalPanels();
        expect(component.find('.h5')).toHaveLength(0);
    });

    it('should test component update', () => {
        const component = renderAsideModalPanels();
        const shouldUpdate = component.instance().shouldComponentUpdate();
        expect(shouldUpdate).toBe(false);
    });
});
