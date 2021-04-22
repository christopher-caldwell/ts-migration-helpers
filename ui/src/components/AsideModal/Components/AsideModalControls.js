import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';

const AsideModalControls = props => {
    const {
        handleCancel,
        handleSave,
        cancelLabel,
        disabled,
        saveLabel,
        showTooltip,
        tooltipMessage,
        bottomBarOpen,
    } = props;

    const buildCustomTooltip = () => (
        <CustomTooltip type="warning" title="WARNING" message={tooltipMessage} left={-20} />
    );

    return (
        <div
            className={classNames('actions', {
                'aside-modal-bottom-bar': bottomBarOpen,
            })}
        >
            <button className="btn btn-default" type="button" onClick={() => handleCancel()}>
                {cancelLabel}
            </button>

            {disabled && showTooltip ? (
                <OverlayTrigger overlay={buildCustomTooltip()} placement="top">
                    <p className="btn btn-primary station-configs__button disabled">{saveLabel}</p>
                </OverlayTrigger>
            ) : (
                <button
                    className={classNames('btn', 'btn-primary', { disabled })}
                    type="button"
                    onClick={() => !disabled && handleSave()}
                >
                    {saveLabel}
                </button>
            )}
        </div>
    );
};

AsideModalControls.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    bottomBarOpen: PropTypes.bool,
    cancelLabel: PropTypes.string,
    disabled: PropTypes.bool,
    saveLabel: PropTypes.string,
    showTooltip: PropTypes.bool,
    tooltipMessage: PropTypes.string,
};

AsideModalControls.defaultProps = {
    cancelLabel: 'Cancel',
    disabled: false,
    saveLabel: 'Save',
    showTooltip: false,
    tooltipMessage: '',
    bottomBarOpen: false,
};

export default AsideModalControls;
