import React from 'react';
import { shallow } from 'enzyme';

import ObjectConfig from 'components/Configuration/ObjectConfig';

const renderObjectConfig = (options = {}) => (
    shallow(
        <ObjectConfig
            config={{}}
            show={options.show || true}
            onClose={options.onClose || (() => { })}
            onSave={options.onSave || (() => { })}
        />,
    )
);

describe('<ObjectConfig />', () => {
    it('should render component', () => {
        const component = renderObjectConfig();
        expect(component.find('.btn btn-primary')).toHaveLength(0);
        component.find('button').simulate('click');
    });

    it('onChange should update state', () => {
        const component = renderObjectConfig();
        const mockEvent = { target: { name: 'test name' } };
        const spyOnSongCheck = jest.spyOn(component.instance(), 'onChange');
        component.instance().onChange(mockEvent);
        expect(spyOnSongCheck).toHaveBeenCalled();
    });

    it('onOpen should update state', () => {
        const component = renderObjectConfig();
        const mockEvent = { target: { name: 'test name' }, preventDefault: () => {} };
        const spyonSubmit = jest.spyOn(component.instance(), 'onSubmit');
        component.instance().onSubmit(mockEvent);
        expect(spyonSubmit).toHaveBeenCalled();
    });
});
