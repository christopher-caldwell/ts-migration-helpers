// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cancelAction' implicitly has an '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cancelAction' implicitly has an '... Remove this comment to see the full error message
import React from 'react';
import PropTypes from 'prop-types';

const ConfirmOverlay = ({ confirmAction, cancelAction, confirmMessage }) => (
    <div className="musiclab-overlay confirm-overlay">
        <div className="musiclab-overlay-content">
            <div className="icon-container">
                <span className="icon fa fa-exclamation" />
            </div>
            <h4>Warning</h4>
            <span className="text">{confirmMessage}</span>
            <button className="btn btn-primary" type="button" onClick={confirmAction}>
                Yes
            </button>
            <button className="btn btn-primary" type="button" onClick={cancelAction}>
                No
            </button>
        </div>
    </div>
);

ConfirmOverlay.propTypes = {
    cancelAction: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired,
    confirmMessage: PropTypes.string,
};

ConfirmOverlay.defaultProps = {
    confirmMessage: 'Are you sure you want to confirm the action?',
};

export default ConfirmOverlay;
