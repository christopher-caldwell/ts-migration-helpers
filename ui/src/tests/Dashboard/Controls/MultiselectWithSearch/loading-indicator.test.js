import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from 'components/Controls/MultiselectWithSearch/loading-indicator';

const renderButton = () => (
    shallow(
        <LoadingIndicator />,
    )
);

describe('<LoadingIndicator />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-loading')).toHaveLength(1);
    });
});
