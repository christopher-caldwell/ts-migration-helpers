import React from 'react';
import { shallow } from 'enzyme';

import If from 'components/Utilities/If';

const renderIf = (options = {}) => (
    shallow(
        <If
            test={options.test || false}
            children={<div />}
        />,
    )
);

describe('<If />', () => {
    it('should not render children', () => {
        const component = renderIf();
        expect(component.find('div')).toHaveLength(0);
    });

    it('should render children', () => {
        const component = renderIf({ test: true });
        expect(component.find('div')).toHaveLength(1);
    });
});
