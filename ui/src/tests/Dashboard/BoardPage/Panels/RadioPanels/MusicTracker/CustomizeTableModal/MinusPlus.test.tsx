import React from 'react';
import { shallow } from 'enzyme';

import MinusPlus from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/MinusPlus';

const renderMinusPlus = (options = {}) => (
    shallow(
        <MinusPlus
            opened={options.opened || true}
        />,
    )
);

describe('<MinusPlus />', () => {
    it('should render component', () => {
        const component = renderMinusPlus();
        expect(component.find('.minus-plus')).toHaveLength(1);
    });
});
