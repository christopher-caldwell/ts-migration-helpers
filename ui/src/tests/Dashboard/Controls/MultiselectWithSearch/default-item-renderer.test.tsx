import React from 'react';
import { shallow } from 'enzyme';

import DefaulItemRenderer from 'components/Controls/MultiselectWithSearch/default-item-renderer';

const renderButton = (options = {}) => (
    shallow(
        <DefaulItemRenderer
            checked={false}
            onClick={options.onClick || (() => {})}
        />,
    )
);

describe('<DefaulItemRenderer />', () => {
    it('should render component', () => {
        const component = renderButton();
        expect(component.find('.multiselect-option-label')).toHaveLength(1);
    });
});
