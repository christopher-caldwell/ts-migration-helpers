import React from 'react';
import { shallow } from 'enzyme';

import RadioHeader from 'components/HomePage/RadioHeader';

const renderRadioHeader = () => (
    shallow(
        <RadioHeader />,
    )
);

describe('<RadioHeader />', () => {
    it('should render component', () => {
        const component = renderRadioHeader();
        expect(component.find('.dashboard-header')).toHaveLength(1);
    });
});
