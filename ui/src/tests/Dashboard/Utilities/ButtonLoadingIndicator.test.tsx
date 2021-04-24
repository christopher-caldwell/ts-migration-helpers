import React from 'react';
import { shallow } from 'enzyme';

import ButtonLoadingIndicator from 'components/Utilities/ButtonLoadingIndicator';

const renderButtonLoadingIndicator = (options = {}) => (
    shallow(
        <ButtonLoadingIndicator
            loading={options.loading || true}
        />,
    )
);

describe('<ButtonLoadingIndicator />', () => {
    it('Should component render', () => {
        const component = renderButtonLoadingIndicator();
        expect(component.find('.fa-circle-notch')).toHaveLength(1);
    });
});
