import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hasAllSlotsFilled } from 'components/AsideModal/utils';
import AlertMultiAction from 'components/AlertMultiAction';
import { CANNOT_APPROVE_EMPTY_SLOTS } from 'utils/constants';
import CalendarTable from './CalendarTable';

class AssignmentPanel extends PureComponent {
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        const { dayparts, stagedDayparts, onClose, className, disabled, showWarningBox } = this.props;

        return (
            <div className={`assignment-panel ${className}`}>
                <div className="assignment-panel__header">
                    <h5>Dayparts Assignments</h5>
                    <button type="button" className="assignment-panel__btn-close" onClick={onClose}>
                        <i className="fa fa-times x-button" />
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ messageText: string; alertType: string; sh... Remove this comment to see the full error message */}
                    </button>
                </div>
                {!hasAllSlotsFilled(dayparts, stagedDayparts) && (
                    <AlertMultiAction
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ dayparts: any; stagedDayparts: any; disabl... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ messageText: string; alertType: string; sh... Remove this comment to see the full error message
                        messageText={CANNOT_APPROVE_EMPTY_SLOTS}
                        alertType="error"
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                        show={showWarningBox}
                    />
                )}
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ dayparts: any; stagedDayparts: any; disabl... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ messageText: string; alertType: string; sh... Remove this comment to see the full error message */}
                <div className="assignment-panel__container">
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                    <CalendarTable dayparts={dayparts} stagedDayparts={stagedDayparts} disabled={disabled} />
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                </div>
            </div>
        );
    }
}

AssignmentPanel.defaultProps = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ dayparts: any[]; stagedDayparts: any[]; di... Remove this comment to see the full error message
    className: '',
    disabled: false,
    showWarningBox: true,
};

AssignmentPanel.propTypes = {
    dayparts: PropTypes.arrayOf(PropTypes.object).isRequired,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    showWarningBox: PropTypes.bool,
};

export default AssignmentPanel;
