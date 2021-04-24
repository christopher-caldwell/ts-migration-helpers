import React from 'react';
import { shallow } from 'enzyme';

import AsideModalControls from 'components/AsideModal/Components/AsideModalControls';

const renderActions = (options = {}) => (
    shallow(
        <AsideModalControls
            handleCancel={options.handleCancel || (() => {})}
            handleSave={options.handleSave || (() => {})}
            cancelLabel={options.cancelLabel || 'test cancel label'}
            disabled={options.disabled}
            saveLabel={options.saveLabel || 'test save label'}
        />,
    )
);

describe('<AsideModalControls />', () => {
    it('should render component', () => {
        const component = renderActions({ disabled: false });
        expect(component.find('button')).toHaveLength(2);
        expect(component.find('button').at(0).text()).toBe('test cancel label');
        expect(component.find('button').at(1).text()).toBe('test save label');
    });

    it('component should be disabled', () => {
        const component = renderActions({ disabled: true });
        expect(component.find('.disabled')).toHaveLength(1);
    });

    it('cancel function should be called', () => {
        const mockHandleCancel = jest.fn();
        const component = renderActions({
            disabled: true,
            handleCancel: mockHandleCancel,
        });
        component.find('button').at(0).simulate('click');
        expect(mockHandleCancel).toHaveBeenCalled();
    });

    it('save function should be called', () => {
        const mockHandleSave = jest.fn();
        const component = renderActions({
            disabled: false,
            handleSave: mockHandleSave,
        });
        component.find('button').at(1).simulate('click');
        expect(mockHandleSave).toHaveBeenCalled();
    });
});
