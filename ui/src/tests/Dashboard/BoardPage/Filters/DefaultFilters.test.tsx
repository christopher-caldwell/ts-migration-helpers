import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
