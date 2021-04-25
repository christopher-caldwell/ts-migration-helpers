import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextButton from '../Buttons/TextButton';

const iconMapping = {
    warning: 'fa-exclamation-triangle',
    error: 'fa-times-circle',
};
class AlertMultiAction extends Component {
    state = { dismissedCategoryAlerts: [] };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    shouldComponentUpdate(nextProps, nextState) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryLabel' implicitly has an 'any' ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alerts' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'alerts' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryLabel' implicitly has an 'any' ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const hasAlertsChanged = this.props.alerts.length !== nextProps.alerts.length;
        const hasDismissedAlertsChanged =
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'message' implicitly has an 'any' ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'alerts' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
            this.state.dismissedCategoryAlerts.length !== nextState.dismissedCategoryAlerts.length;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'alert' implicitly has an 'any' type.
        return hasAlertsChanged || hasDismissedAlertsChanged;
    }

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryLabel' implicitly has an 'any' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    handleDismiss = categoryLabel =>
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alerts' does not exist on type 'Readonly... Remove this comment to see the full error message
        this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'alertType' does not exist on type 'Reado... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'message' implicitly has an 'any' ... Remove this comment to see the full error message
            dismissedCategoryAlerts: [...this.state.dismissedCategoryAlerts, categoryLabel],
        });
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'alerts' implicitly has an 'any' type.

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    buildAlertMessages(alerts) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'alert' implicitly has an 'any' type.
        const visibleAlerts = alerts.filter(
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            alert => !this.state.dismissedCategoryAlerts.includes(alert.category.label)
        );
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'messageText' does not exist on type 'Rea... Remove this comment to see the full error message
            boardDetails: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'message' implicitly has an 'any' ... Remove this comment to see the full error message
                layout: {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    board: { id },
                },
            },
        } = this.props;

        return visibleAlerts.map(({ message, category: { label } }) => (
            <div className="alert-multi-action__body__message" key={`alert-component-${label}`}>
                <span>{message}</span>
                <div className="alert-multi-action__body__message__actions">
                    <a className="all-caps review-btn" href={`/board/radio/${id}/categories#${label}`}>
                        Review
                    {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                    </a>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message */}
                    <TextButton text="Dismiss" onClick={() => this.handleDismiss(label)} className="all-caps" />
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                </div>
            </div>
        ));
    }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    render() {
        const { show, alerts, messageText, alertType } = this.props;
        const { dismissedCategoryAlerts } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        if (show && messageText && !alerts.length) {
            return (
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                <div className={`alert-multi-action__box alert-multi-action__box--${alertType}`}>
                    <div className="alert-multi-action__header">
                        <i className={`fa fa-lg fa-fw ${iconMapping[alertType]}`} />
                        <p className="p3">{messageText}</p>
                    </div>
                </div>
            );
        }

        if (!show || !alerts.length || alerts.length === dismissedCategoryAlerts.length) {
            return null;
        }

        return (
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            <div className={`alert-multi-action__box alert-multi-action__box--${alertType}`}>
                <div className="alert-multi-action__header">
                    <i className={`fa fa-lg fa-fw ${iconMapping[alertType]}`} />
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                    <p className="p3">{messageText || 'Review or dismiss the following warnings before proceeding.'}</p>
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                </div>
                <div className="alert-multi-action__body">{this.buildAlertMessages(alerts)}</div>
            </div>
        );
    }
}

AlertMultiAction.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    alertType: PropTypes.string,
    alerts: PropTypes.arrayOf(PropTypes.any),
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
    messageText: PropTypes.string,
    show: PropTypes.bool,
};

AlertMultiAction.defaultProps = {
    show: true,
    alerts: [],
    messageText: null,
    alertType: 'warning', // warning or error
};

const mapStateToProps = ({ boardDetails }) => ({ boardDetails });

export default connect(mapStateToProps)(AlertMultiAction);
