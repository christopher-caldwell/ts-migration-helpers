import React from 'react';
import { shallow } from 'enzyme';

import Button from 'components/Controls/Button';

const renderButton = () => (
    shallow(
        <Button />,
    )
);

describe('<Button />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('button')).toHaveLength(1);
    });
});
