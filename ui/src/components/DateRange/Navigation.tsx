import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from 'components/Controls/Button';
import { getDiffInDays } from 'utils/DateFunctions';
import get from 'lodash/get';

class DateRangeCycle extends React.Component {
    static propTypes = {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        boardDetails: PropTypes.shape().isRequired,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        disabled: PropTypes.bool.isRequired,
        onFilterSave: PropTypes.func.isRequired,
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        this.onPreviousDate = this.onPreviousDate.bind(this);
        this.onNextDate = this.onNextDate.bind(this);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
    onPreviousDate() {
        this.cyclePeriod(-1);
    }

    onNextDate() {
        this.cyclePeriod(1);
    }

    getRange() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardDetails' implicitly has an 'any' t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const { startDate, endDate } = this.getDateRange(this.props.boardDetails);
        return {
            startDate: moment.utc(startDate),
            endDate: moment.utc(endDate),
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardDetails' implicitly has an 'any' t... Remove this comment to see the full error message
    getDateRange(boardDetails) {
        const { filters } = boardDetails;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        let { period, type, startDate, endDate } = get(filters, 'applied.dateRange', {});
        if (!startDate) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        const { onFilterSave } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'period' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const { period, type } = this.getDateRange(this.props.boardDetails);
        const range = this.getRange();
        const { startDate, endDate } = this.addDays(range, getDiffInDays(range) * direction);
        onFilterSave({
            dateRange: {
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD'),
                period,
                type,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'direction' implicitly has an 'any' type... Remove this comment to see the full error message
            },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'onClick' implicitly has an 'any' type.
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'disabled' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
    addDays({ startDate, endDate }, days) {
        return {
            startDate: moment.utc(startDate).add(days, 'days'),
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            endDate: moment.utc(endDate).add(days, 'days'),
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'period' implicitly has an 'any' type.
    renderDate(period, { startDate, endDate }) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'direction' implicitly has an 'any' type... Remove this comment to see the full error message
    renderButton(direction, onClick, disabled) {
        if (disabled) {
            return (
                <span className={`calendar-filter__range-calendar-arrow ${direction} disabled`}>
                    <i className={`fa fa-chevron-${direction}`} />
                </span>
            );
        }

        return (
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            <Button className={`calendar-filter__range-calendar-arrow ${direction}`} onClick={onClick}>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message */}
                <i className={`fa fa-chevron-${direction}`} />
            </Button>
        );
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    renderPreviousArrow(props, disabled) {
        const diffInDays = getDiffInDays(props);
        const nextDate = moment.utc(props.startDate).subtract(diffInDays, 'day');
        // Allow us to go to the next period so long as it does not go beyond
        // the period including 1970
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
        const nextDateAllowed = nextDate.diff(moment.utc('1970-01-01').startOf('day'), 'days') >= diffInDays - 1;

        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof DateRangeCycle' is not as... Remove this comment to see the full error message
        return this.renderButton('left', this.onPreviousDate, disabled || !nextDateAllowed);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const mapStateToProps = state => ({
    boardDetails: state.boardDetails,
});

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof DateRangeCycle' is not as... Remove this comment to see the full error message
export default connect(mapStateToProps)(DateRangeCycle);
