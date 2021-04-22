import React from 'react';
import { shallow } from 'enzyme';

import Index from './index';

const renderButton = () => shallow(<Index options={[]} selected={[]} />);

describe('<Index />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-container')).toHaveLength(1);
    });
});
