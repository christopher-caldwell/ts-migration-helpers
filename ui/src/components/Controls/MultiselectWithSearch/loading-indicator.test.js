import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from './loading-indicator';

const renderButton = () => shallow(<LoadingIndicator />);

describe('<LoadingIndicator />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-loading')).toHaveLength(1);
    });
});
