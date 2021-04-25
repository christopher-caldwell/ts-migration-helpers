import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'component' implicitly has an 'any' type... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'component' implicitly has an 'any' type... Remove this comment to see the full error message
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
