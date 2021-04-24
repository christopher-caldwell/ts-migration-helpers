import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';

const renderLoadingIndicator = () => (
    shallow(
        <LoadingIndicator />,
    )
);

describe('<LoadingIndicator />', () => {
    it('should render component', () => {
        const component = renderLoadingIndicator();
        expect(component.find('.fa-circle-notch')).toHaveLength(1);
    });
});
