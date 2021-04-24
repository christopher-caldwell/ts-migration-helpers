import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hasAllSlotsFilled } from 'components/AsideModal/utils';
import AlertMultiAction from 'components/AlertMultiAction';
import { CANNOT_APPROVE_EMPTY_SLOTS } from 'utils/constants';
import CalendarTable from './CalendarTable';

class AssignmentPanel extends PureComponent {
    render() {
        const { dayparts, stagedDayparts, onClose, className, disabled, showWarningBox } = this.props;

        return (
            <div className={`assignment-panel ${className}`}>
                <div className="assignment-panel__header">
                    <h5>Dayparts Assignments</h5>
                    <button type="button" className="assignment-panel__btn-close" onClick={onClose}>
                        <i className="fa fa-times x-button" />
                    </button>
                </div>
                {!hasAllSlotsFilled(dayparts, stagedDayparts) && (
                    <AlertMultiAction
                        messageText={CANNOT_APPROVE_EMPTY_SLOTS}
                        alertType="error"
                        show={showWarningBox}
                    />
                )}
                <div className="assignment-panel__container">
                    <CalendarTable dayparts={dayparts} stagedDayparts={stagedDayparts} disabled={disabled} />
                </div>
            </div>
        );
    }
}

AssignmentPanel.defaultProps = {
    className: '',
    disabled: false,
    showWarningBox: true,
};

AssignmentPanel.propTypes = {
    dayparts: PropTypes.arrayOf(PropTypes.object).isRequired,
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    showWarningBox: PropTypes.bool,
};

export default AssignmentPanel;
