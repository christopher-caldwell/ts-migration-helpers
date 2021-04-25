import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import ReconcileSongs from 'components/Director/Contents/ReconcileSongs';

const renderReconcileSongs = () => (
    shallow(
        <ReconcileSongs />,
    )
);

describe('<ReconcileSongs />', () => {
    it('should render component with correct structure', () => {
        const component = renderReconcileSongs();
        expect(component.find('div')).toHaveLength(1);
    });
});
