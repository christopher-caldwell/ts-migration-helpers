import React from 'react';
import PropTypes from 'prop-types';
import CustomTooltip from 'components/CustomTooltip';
import { Modal, OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';

const CustomModal = props => {
    const {
        onClose,
        onSave,
        children,
        cancelButtonLabel,
        saveButtonLabel,
        title,
        className,
        saveDisabled,
        saveVisible,
        tooltipMessage,
    } = props;

    const buildCustomTooltip = () => <CustomTooltip type="warning" title="WARNING" message={tooltipMessage} left={5} />;

    let saveButton = null;

    if (saveVisible) {
        saveButton = (
            <button
                className={classNames('btn', 'btn-primary', {
                    disabled: saveDisabled,
                })}
                onClick={() => !saveDisabled && onSave()}
                type="button"
            >
                {saveButtonLabel}
            </button>
        );
    }

    if (saveVisible && tooltipMessage) {
        saveButton = (
            <OverlayTrigger overlay={buildCustomTooltip()} placement="left">
                {saveButton}
            </OverlayTrigger>
        );
    }

    return (
        <Modal className={classNames(`custom-modal ${className}`)} onHide={onClose} show>
            <Modal.Header closeButton>
                <Modal.Title componentClass="h5">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-default" onClick={onClose} type="button">
                    {cancelButtonLabel}
                </button>
                {saveButton}
            </Modal.Footer>
        </Modal>
    );
};

CustomModal.defaultProps = {
    onClose: () => {},
    onSave: () => {},
    cancelButtonLabel: 'Cancel',
    className: '',
    saveButtonLabel: 'Save',
    title: '',
    tooltipMessage: '',
    saveDisabled: false,
    saveVisible: true,
};

CustomModal.propTypes = {
    children: PropTypes.node.isRequired,
    cancelButtonLabel: PropTypes.string,
    className: PropTypes.string,
    saveButtonLabel: PropTypes.string,
    saveDisabled: PropTypes.bool,
    saveVisible: PropTypes.bool,
    title: PropTypes.string,
    tooltipMessage: PropTypes.string,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};

export default CustomModal;
