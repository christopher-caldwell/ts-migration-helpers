import React from 'react';
import { shallow } from 'enzyme';

import CustomModal from 'components/CustomModal';

const mockComponent = <div className="content" />;
const mockFunction = () => {};
const renderCustomModal = (options = {}) => (
    shallow(
        <CustomModal
            onClose={options.onClose || mockFunction}
            onSave={options.onSave || mockFunction}
            cancelButtonLabel={options.cancelButtonLabel}
            saveButtonLabel={options.saveButtonLabel}
            className={options.className}
            title={options.title}
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
