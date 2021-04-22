import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from 'components/Controls/Button';
import { getDiffInDays } from 'utils/DateFunctions';
import get from 'lodash/get';

class DateRangeCycle extends React.Component {
    static propTypes = {
        boardDetails: PropTypes.shape().isRequired,
        disabled: PropTypes.bool.isRequired,
        onFilterSave: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.onPreviousDate = this.onPreviousDate.bind(this);
        this.onNextDate = this.onNextDate.bind(this);
    }

    onPreviousDate() {
        this.cyclePeriod(-1);
    }

    onNextDate() {
        this.cyclePeriod(1);
    }

    getRange() {
        const { startDate, endDate } = this.getDateRange(this.props.boardDetails);
        return {
            startDate: moment.utc(startDate),
            endDate: moment.utc(endDate),
        };
    }

    getDateRange(boardDetails) {
        const { filters } = boardDetails;

        let { period, type, startDate, endDate } = get(filters, 'applied.dateRange', {});
        if (!startDate) {
            const dateRange = filters.getIn(['applied', 'dateRange']);
            period = dateRange.get('period');
            type = dateRange.get('type');
            startDate = dateRange.get('startDate');
            endDate = dateRange.get('endDate');
        }

        return {
            period,
            type,
            startDate,
            endDate,
        };
    }

    cyclePeriod(direction = 1) {
        const { onFilterSave } = this.props;
        const { period, type } = this.getDateRange(this.props.boardDetails);
        const range = this.getRange();
        const { startDate, endDate } = this.addDays(range, getDiffInDays(range) * direction);
        onFilterSave({
            dateRange: {
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD'),
                period,
                type,
            },
        });
    }

    addDays({ startDate, endDate }, days) {
        return {
            startDate: moment.utc(startDate).add(days, 'days'),
            endDate: moment.utc(endDate).add(days, 'days'),
        };
    }

    renderDate(period, { startDate, endDate }) {
        if (startDate.year() !== endDate.year()) {
            return `${startDate.format('MMM D, YYYY')} - ${endDate.format('MMM D, YYYY')}`;
        }

        if (startDate.month() !== endDate.month()) {
            return `${startDate.format('MMM D')} - ${endDate.format('MMM D, YYYY')}`;
        }

        if (startDate.date() !== endDate.date()) {
            return `${startDate.format('MMMM D')} - ${endDate.format('D, YYYY')}`;
        }
        return `${startDate.format('MMMM D, YYYY')}`;
    }

    renderButton(direction, onClick, disabled) {
        if (disabled) {
            return (
                <span className={`calendar-filter__range-calendar-arrow ${direction} disabled`}>
                    <i className={`fa fa-chevron-${direction}`} />
                </span>
            );
        }

        return (
            <Button className={`calendar-filter__range-calendar-arrow ${direction}`} onClick={onClick}>
                <i className={`fa fa-chevron-${direction}`} />
            </Button>
        );
    }

    renderPreviousArrow(props, disabled) {
        const diffInDays = getDiffInDays(props);
        const nextDate = moment.utc(props.startDate).subtract(diffInDays, 'day');
        // Allow us to go to the next period so long as it does not go beyond
        // the period including 1970
        const nextDateAllowed = nextDate.diff(moment.utc('1970-01-01').startOf('day'), 'days') >= diffInDays - 1;

        return this.renderButton('left', this.onPreviousDate, disabled || !nextDateAllowed);
    }

    renderNextArrow(props, disabled) {
        const diffInDays = getDiffInDays(props);
        const nextDate = moment.utc(props.endDate).add(diffInDays, 'day');
        // Allow us to go to the next period so long as it does not go beyond the period of PAST week's date.
        // The diff in days of TODAY and the LAST day of the current week.
        // Now we can only access a specific week if the diff between today and the last day of the current week is
        // already a passed week.
        const nextDateAllowed = nextDate.diff(moment.utc().startOf('day'), 'days') <= 0;

        return this.renderButton('right', this.onNextDate, disabled || !nextDateAllowed);
    }

    render() {
        const { disabled, boardDetails } = this.props;
        if (!boardDetails) return null;
        const { period } = this.getDateRange(boardDetails);
        const range = this.getRange();

        return (
            <div className="calendar-filter__range-calendar">
                {this.renderPreviousArrow(range, disabled)}
                <span className="calendar-filter__range-calendar-text">{this.renderDate(period, range)}</span>
                {this.renderNextArrow(range, disabled)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    boardDetails: state.boardDetails,
});

export default connect(mapStateToProps)(DateRangeCycle);
