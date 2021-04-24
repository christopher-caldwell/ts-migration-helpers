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

    shouldComponentUpdate(nextProps, nextState) {
        const hasAlertsChanged = this.props.alerts.length !== nextProps.alerts.length;
        const hasDismissedAlertsChanged =
            this.state.dismissedCategoryAlerts.length !== nextState.dismissedCategoryAlerts.length;

        return hasAlertsChanged || hasDismissedAlertsChanged;
    }

    handleDismiss = categoryLabel =>
        this.setState({
            dismissedCategoryAlerts: [...this.state.dismissedCategoryAlerts, categoryLabel],
        });

    buildAlertMessages(alerts) {
        const visibleAlerts = alerts.filter(
            alert => !this.state.dismissedCategoryAlerts.includes(alert.category.label)
        );
        const {
            boardDetails: {
                layout: {
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
                    </a>
                    <TextButton text="Dismiss" onClick={() => this.handleDismiss(label)} className="all-caps" />
                </div>
            </div>
        ));
    }

    render() {
        const { show, alerts, messageText, alertType } = this.props;
        const { dismissedCategoryAlerts } = this.state;

        if (show && messageText && !alerts.length) {
            return (
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
            <div className={`alert-multi-action__box alert-multi-action__box--${alertType}`}>
                <div className="alert-multi-action__header">
                    <i className={`fa fa-lg fa-fw ${iconMapping[alertType]}`} />
                    <p className="p3">{messageText || 'Review or dismiss the following warnings before proceeding.'}</p>
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
