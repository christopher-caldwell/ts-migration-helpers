import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{}'.
import CategoryTab from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/CategoryTab';

const renderCategoryTab = (options = {}) => (
    shallow(
        <CategoryTab
            label={options.label || 'test label'}
        />,
    )
);

describe('<CategoryTab />', () => {
    it('should render component', () => {
        const component = renderCategoryTab();
        expect(component.find('.category-tab')).toHaveLength(1);
    });
});
