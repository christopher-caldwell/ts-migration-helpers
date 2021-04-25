// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import { closeOverlay } from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';

const MusicLabOverlay = props => {
    const {
        approveCancel,
        error,
        loading,
        showConfirm,
        successClose,
        failClose,
        backToMessage,
        closeOverlayAction,
        successMessage,
    } = props;

    const primaryWarnMessage = 'Are you sure you want to cancel?';
    const secondaryWarnMessage = 'All changes since last approval will be lost for this station.';
    const message = `${primaryWarnMessage} ${secondaryWarnMessage}`;
    const reviewError = 'Unexpected error during the save process, please try again.';
    // const approveError = 'The changes that you just approved failed to save in gselector!';
    // ^ TODO: send different text for review/approve errors
    const icon = error ? 'exclamation' : 'check';
    const finalSecondaryMessage = error ? reviewError : successMessage;

    const loadingPage = (
        <div className="musiclab-overlay">
            <div className="musiclab-overlay-content">
                <LoadingIndicator />
            </div>
        </div>
    );

    const handleResponseButton = () => {
        if (error) {
            return failClose();
        }
        return successClose();
    };

    const responsePage = (
        <div className="musiclab-overlay">
            <div className="musiclab-overlay-content">
                <div className="icon-container">
                    <span className={`icon fa fa-${icon}`} />
                </div>
                <h4>{error ? 'Failed' : 'Success'}</h4>
                <span className="text">{finalSecondaryMessage}</span>
                <button type="button" className="btn btn-primary" onClick={handleResponseButton}>
                    {backToMessage}
                </button>
            </div>
        </div>
    );

    const confirmCancel = (
        <div className="musiclab-overlay">
            <div className="musiclab-overlay-content">
                <div className="icon-container">
                    <span className="icon fa fa-exclamation" />
                </div>
                <h4>Warning</h4>
                <span className="text">{message}</span>
                <button type="button" className="btn btn-primary" onClick={approveCancel}>
                    Yes
                </button>
                <button type="button" className="btn btn-primary" onClick={closeOverlayAction}>
                    No
                </button>
            </div>
        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
        </div>
    );

    if (loading) return loadingPage;
    if (showConfirm) return confirmCancel;
    return responsePage;
};

MusicLabOverlay.propTypes = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    closeOverlayAction: PropTypes.func.isRequired,
    failClose: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    successClose: PropTypes.func.isRequired,
    approveCancel: PropTypes.func,
    backToMessage: PropTypes.string,
    error: PropTypes.shape(),
    showConfirm: PropTypes.bool,
    successMessage: PropTypes.string,
};

MusicLabOverlay.defaultProps = {
    showConfirm: false,
    error: null,
    backToMessage: 'Back',
    successMessage: 'Your request has been processed successfully!',
    approveCancel: () => {},
};

const mapDispatchToProps = {
    closeOverlayAction: closeOverlay,
};

export default connect(null, mapDispatchToProps)(MusicLabOverlay);
