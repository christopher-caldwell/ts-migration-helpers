import React from 'react';
import { shallow } from 'enzyme';

import ObjectOptions from 'components/Configuration/ObjectOptions';

const renderObjectOptions = (options = {}) => (
    shallow(
        <ObjectOptions
            config={{}}
            objectPath={{}}
        />,
    )
);

describe('<ObjectOptions />', () => {
    it('should render component', () => {
        const component = renderObjectOptions();
        expect(component.find('.btn-icon')).toHaveLength(1);
    });

    it('onConfigOpen should update state', () => {
        const component = renderObjectOptions();
        component.setState({
            showConfig: true,
        });
        const spyOnConfigOpen = jest.spyOn(component.instance(), 'onConfigOpen');
        component.instance().onConfigOpen('a', 'b');
        expect(spyOnConfigOpen).toHaveBeenCalled();
    });

    it('onConfigClose should update state', () => {
        const component = renderObjectOptions();
        component.setState({
            showConfig: false,
        });
        const spyOnConfigClose = jest.spyOn(component.instance(), 'onConfigClose');
        component.instance().onConfigClose('a', 'b');
        expect(spyOnConfigClose).toHaveBeenCalled();
    });
});
