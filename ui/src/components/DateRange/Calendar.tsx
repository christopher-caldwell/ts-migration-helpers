import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import { Modal } from 'react-bootstrap';
import DayPicker from 'react-day-picker';

import IconCalendar from '../Buttons/IconCalendar';

class DateRange extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    constructor(props) {
        super(props);
// @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        this.state = { showModal: false };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    handleChange = date => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
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

        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'weekday' implicitly has an 'any' ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const { boardDetails } = this.props;
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'weekday' implicitly has an 'any' ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
        const startDate = boardDetails.filters.applied.dateRange.startDate || moment.utc();
        const thisPastSunday = moment
            .utc()
            .startOf('week')
            .toDate();
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
        const currentWeek = [{ after: thisPastSunday }]; // disabling weeks from current week onward
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const currentMonth = moment.utc().toDate(); // sets initial month to current month
        const currentSelectedMonth = moment.utc(startDate).toDate();
        // ^ opens month MT is currently looking at. ^
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'weekday' implicitly has an 'any' ... Remove this comment to see the full error message
        const ThreeCharacterAbv = ({ weekday, className, localeUtils, locale }) => {
            const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
            // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
            return <div className={className}>{weekdayName.slice(0, 3).toUpperCase()}</div>;
        }; // fn changes the standard 2 character weekday abreviation to 3 characters

        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
        return (
            <div>
                <IconCalendar onClick={this.handleModalOpen} />
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                <Modal className="mt-calendar-modal" onHide={this.handleModalClose} show={this.state.showModal}>
                    <DayPicker
                        disabledDays={currentWeek}
                        onDayClick={this.handleChange}
                        // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
                        month={currentSelectedMonth}
                        showOutsideDays
                        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                        toMonth={currentMonth}
                        weekdayElement={<ThreeCharacterAbv />}
                    />
                </Modal>
            </div>
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        );
    }
}

const mapStateToProps = ({ boardDetails }) => ({ boardDetails });

export default connect(mapStateToProps)(DateRange);

DateRange.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    onFilterSave: PropTypes.func.isRequired,
};
