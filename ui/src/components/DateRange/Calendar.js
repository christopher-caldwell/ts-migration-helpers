import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import { Modal } from 'react-bootstrap';
import DayPicker from 'react-day-picker';

import IconCalendar from '../Buttons/IconCalendar';

class DateRange extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showModal: false };
    }

    handleChange = date => {
        const { boardDetails, onFilterSave } = this.props;
        const type = get(boardDetails, 'filters.applied.dateRange.type', null);
        const period = get(boardDetails, 'filters.applied.dateRange.period', null);
        const startDate = moment
            .utc(date)
            .startOf('week')
            .format('YYYY-MM-DD');
        const endDate = moment
            .utc(date)
            .endOf('week')
            .format('YYYY-MM-DD');

        this.handleModalClose();
        onFilterSave({
            dateRange: {
                period,
                type,
                startDate,
                endDate,
            },
        });
    };

    handleModalOpen = () => this.setState({ showModal: true });

    handleModalClose = () => this.setState({ showModal: false });

    render() {
        const { boardDetails } = this.props;
        const startDate = boardDetails.filters.applied.dateRange.startDate || moment.utc();
        const thisPastSunday = moment
            .utc()
            .startOf('week')
            .toDate();
        const currentWeek = [{ after: thisPastSunday }]; // disabling weeks from current week onward
        const currentMonth = moment.utc().toDate(); // sets initial month to current month
        const currentSelectedMonth = moment.utc(startDate).toDate();
        // ^ opens month MT is currently looking at. ^
        const ThreeCharacterAbv = ({ weekday, className, localeUtils, locale }) => {
            const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
            return <div className={className}>{weekdayName.slice(0, 3).toUpperCase()}</div>;
        }; // fn changes the standard 2 character weekday abreviation to 3 characters

        return (
            <div>
                <IconCalendar onClick={this.handleModalOpen} />
                <Modal className="mt-calendar-modal" onHide={this.handleModalClose} show={this.state.showModal}>
                    <DayPicker
                        disabledDays={currentWeek}
                        onDayClick={this.handleChange}
                        month={currentSelectedMonth}
                        showOutsideDays
                        toMonth={currentMonth}
                        weekdayElement={<ThreeCharacterAbv />}
                    />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ boardDetails }) => ({ boardDetails });

export default connect(mapStateToProps)(DateRange);

DateRange.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    onFilterSave: PropTypes.func.isRequired,
};
