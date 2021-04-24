import React from 'react';
import { shallow } from 'enzyme';

import MusicTrackerFilterHeader from 'components/BoardPage/Filters/MusicTrackerFilterHeader';

const mockConnectDropTarget = component => component;
const renderMusicTrackerFilterHeader = (options = {}) => (
    shallow(
        <MusicTrackerFilterHeader
            onFilterSave={mockConnectDropTarget}
        />,
    )
);

describe('<MusicTrackerFilterHeader />', () => {
    it('should render component', () => {
        const component = renderMusicTrackerFilterHeader();
        expect(component.find('.calendar-filter')).toHaveLength(1);
    });
});
