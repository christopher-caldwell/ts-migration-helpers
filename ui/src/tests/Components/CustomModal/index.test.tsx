import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type '{}'.

import CustomModal from 'components/CustomModal';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelButtonLabel' does not exist on typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
const mockComponent = <div className="content" />;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
const mockFunction = () => {};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'saveDisabled' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipMessage' does not exist on type '... Remove this comment to see the full error message
const renderCustomModal = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelButtonLabel' does not exist on typ... Remove this comment to see the full error message
        <CustomModal
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveButtonLabel' does not exist on type ... Remove this comment to see the full error message
            onClose={options.onClose || mockFunction}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
            onSave={options.onSave || mockFunction}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
            cancelButtonLabel={options.cancelButtonLabel}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveDisabled' does not exist on type '{}... Remove this comment to see the full error message
            saveButtonLabel={options.saveButtonLabel}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveVisible' does not exist on type '{}'... Remove this comment to see the full error message
            className={options.className}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipMessage' does not exist on type '... Remove this comment to see the full error message
            title={options.title}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
            saveDisabled={options.saveDisabled}
            saveVisible={options.saveVisible}
            tooltipMessage={options.tooltipMessage}
        >
            {options.children || mockComponent}
        </CustomModal>,
    )
);

describe('<CustomModal />', () => {
    it('should render component', () => {
        const component = renderCustomModal();
        expect(component.find('.custom-modal')).toHaveLength(1);
        expect(component.find('.content')).toHaveLength(1);
    });

    it('save button should render', () => {
        const component = renderCustomModal({ saveButtonLabel: 'Save Button' });
        expect(component.find('.btn-primary').text()).toBe('Save Button');
    });

    it('cancel button should render', () => {
        const component = renderCustomModal({ cancelButtonLabel: 'Cancel Button' });
        expect(component.find('.btn-default').text()).toBe('Cancel Button');
    });

    it('title should render', () => {
        const component = renderCustomModal({ title: 'Title Modal Test' });
        expect(component.find('ModalTitle').shallow().text()).toBe('Title Modal Test');
    });

    it('should receive a custom className', () => {
        const component = renderCustomModal({ className: 'custom-modal-test' });
        expect(component.find('.custom-modal-test')).toHaveLength(1);
    });

    it('should have default onSave', () => {
        CustomModal.defaultProps.onSave();
        expect(CustomModal.defaultProps.onSave).toBeDefined();
    });

    it('should have default onClose', () => {
        CustomModal.defaultProps.onClose();
        expect(CustomModal.defaultProps.onClose).toBeDefined();
    });

    it('onSave function should be called', () => {
        const mockHandleSave = jest.fn();
        const component = renderCustomModal({
            disabled: true,
            onSave: mockHandleSave,
        });
        component.find('button').at(1).simulate('click');
        expect(mockHandleSave).toHaveBeenCalled();
    });

    it('save button should be disabled', () => {
        const component = renderCustomModal({ saveDisabled: true });
        expect(component.find('.btn-primary.disabled')).toHaveLength(1);
    });

    it('save button should not be showed', () => {
        const component = renderCustomModal({ saveVisible: false });
        expect(component.find('.btn-primary')).toHaveLength(0);
    });

    it('should shows tootip', () => {
        const component = renderCustomModal({ tooltipMessage: 'Show tooltip message.' });
        expect(component.find('OverlayTrigger')).toHaveLength(1);
    });
});
