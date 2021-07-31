import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: any; groupedCategorySongs: an... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import AsideModalPanels from 'components/AsideModal/Panels';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'groupedCategorySongs' does not exist on ... Remove this comment to see the full error message
const mockStore = configureStore();
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type '{}'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: any; groupedCategorySongs: an... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type '{}'.
const store = mockStore({
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type '{}'... Remove this comment to see the full error message
    songVersions: [],
    restrictions: {
        data: [],
    },
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'groupedCategorySongs' does not exist on ... Remove this comment to see the full error message
const mockgroupedCategorySongs = [
    {
        title: 'test title',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type '{}'... Remove this comment to see the full error message
        featureName: 'test featureName',
    },
];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type '{}'.
const renderAsideModalPanels = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: any; groupedCategorySongs: an... Remove this comment to see the full error message
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
