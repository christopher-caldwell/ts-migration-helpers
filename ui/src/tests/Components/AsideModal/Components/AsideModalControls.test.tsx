import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleCancel' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleSave' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelLabel' does not exist on type '{}'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleCancel' does not exist on type '{}... Remove this comment to see the full error message
import AsideModalControls from 'components/AsideModal/Components/AsideModalControls';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleSave' does not exist on type '{}'.
const renderActions = (options = {}) => (
    shallow(
        <AsideModalControls
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelLabel' does not exist on type '{}'... Remove this comment to see the full error message
            handleCancel={options.handleCancel || (() => {})}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
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
