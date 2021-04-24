import React from 'react';
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
