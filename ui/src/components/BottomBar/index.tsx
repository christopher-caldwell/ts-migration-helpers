import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import FeatureToggle from 'components/FeatureToggle';
import { FEATURES } from 'utils/constants';
import { approveBox } from 'stores/confirmationStage/confirmationStageActions';
import { openOverlay } from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import CustomTooltip from 'components/CustomTooltip';
import classNames from 'classnames';

const BottomBar = props => {
    const {
        boardId,
        closeReviewPage,
        isReviewOpen,
        overlayError,
        openOverlayAction,
        approveBoxAction,
        onSaveAndReview,
        disableApprove,
        categoriesNotFoundOnGselector,
        tooltipMessage,
        tooltipType,
    } = props;

    const APPROVE_DISABLED_MSG = 'Approve has been disabled.';

    const titleMapping = {
        warning: 'WARNING',
        error: 'IMPORTANT',
    };

    const buildCustomTooltip = message => (
        <CustomTooltip
            type={tooltipType}
            title={titleMapping[tooltipType]}
            message={message}
            top={-10}
        />
    );

    const disabledButton = message => (
        <OverlayTrigger overlay={buildCustomTooltip(message)} placement="top" delayHide={100}>
            <button type="button" className="bottom-bar-btns bottom-bar-disable">
                Approve
            </button>
        </OverlayTrigger>
    );

    const categoriesNotFoundOnGselectorMessage = () => {
        const categoriesList = categoriesNotFoundOnGselector
            .join(', ')
            .replace(/, ([^,]*)$/, ' and $1');

        if (categoriesNotFoundOnGselector.length === 1) {
            return `
                The following category is missing in GSelector: ${categoriesList}.
                Kindly make sure that category in gselector and music lab match.
                Once you add/update category wait for at least 10 minutes before you try again.
            `;
        }

        return `
            The following categories are missing in GSelector: ${categoriesList}.
            Kindly make sure that categories in gselector and music lab match. Once you add/update
            categories wait for at least 10 minutes before you try again.
        `;
    };

    const buildButton = () => {
        if (disableApprove && tooltipMessage) {
            return disabledButton(tooltipMessage);
        }

        if (categoriesNotFoundOnGselector.length > 0) {
            return disabledButton(categoriesNotFoundOnGselectorMessage());
        }

        return (
            <button
                type="button"
                className={classNames('bottom-bar-btns', 'bottom-bar-save', {
                    'bottom-bar-disable': disableApprove,
                })}
                disabled={disableApprove}
                onClick={() => approveBoxAction(boardId)}
            >
                Approve
            </button>
        );
    };

    const reviewOrApprove = () => {
        if (isReviewOpen && !overlayError) {
            return (
                // approve button
                <FeatureToggle
                    featureName={FEATURES.CATEGORY_APPROVE}
                    fallback={disabledButton(APPROVE_DISABLED_MSG)}
                >
                    {buildButton()}
                </FeatureToggle>
            );
        }
        return (
            // save and review button
            <button
                type="button"
                className="bottom-bar-btns bottom-bar-save"
                onClick={() => onSaveAndReview()}
            >
                Save and Review
            </button>
        );
    };

    return (
        <div className="cat-bottom-bar">
            <button
                type="button"
                className="bottom-bar-btns bottom-bar-cancel"
                onClick={isReviewOpen ? () => closeReviewPage() : () => openOverlayAction(true)}
            >
                {isReviewOpen ? 'Back' : 'Cancel'}
            </button>
            {reviewOrApprove()}
        </div>
    );
};

const mapStateToProps = state => ({
    overlayError: state.musicTrackerOverlay.error,
});

const mapDispatchToProps = {
    approveBoxAction: approveBox,
    openOverlayAction: openOverlay,
};

BottomBar.propTypes = {
    approveBoxAction: PropTypes.func.isRequired,
    boardId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    categoriesNotFoundOnGselector: PropTypes.arrayOf(PropTypes.string).isRequired,
    closeReviewPage: PropTypes.func.isRequired,
    isReviewOpen: PropTypes.bool.isRequired,
    openOverlayAction: PropTypes.func.isRequired,
    onSaveAndReview: PropTypes.func.isRequired,
    disableApprove: PropTypes.bool,
    overlayError: PropTypes.string,
    tooltipMessage: PropTypes.string,
    tooltipType: PropTypes.string,
};

BottomBar.defaultProps = {
    disableApprove: false,
    overlayError: null,
    tooltipMessage: null,
    tooltipType: 'warning',
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
