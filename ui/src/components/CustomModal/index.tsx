// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import CustomTooltip from 'components/CustomTooltip';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: any;... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: any;... Remove this comment to see the full error message
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
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
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
                {/* @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message */}
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
                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
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
