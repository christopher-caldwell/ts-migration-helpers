import React from 'react';
import { shallow } from 'enzyme';

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
