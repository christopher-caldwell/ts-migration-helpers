import React from 'react';
import { shallow } from 'enzyme';

import DefaultFilters from 'components/BoardPage/Filters/DefaultFilters';

const mockConnectDropTarget = component => component;
const renderDefaultFilters = (options = {}) => (
    shallow(
        <DefaultFilters
            onFilterSave={mockConnectDropTarget}
        />,
    )
);

describe('<DefaultFilters />', () => {
    it('should render component', () => {
        const component = renderDefaultFilters();
        expect(component.find('.board-filters')).toHaveLength(1);
    });
});
