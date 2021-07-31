import React from 'react';

import moment from 'moment';
import { Cell } from 'fixed-data-table-2';
import PropTypes from 'prop-types';

import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

class DateCell extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired,
        columnKey: PropTypes.string,
        dateFormat: PropTypes.string,
        rowIndex: PropTypes.number,
        textExtractor: PropTypes.func,
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    static defaultProps = {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'Read... Remove this comment to see the full error message
        columnKey: undefined,
        dateFormat: 'M/D/YY',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        rowIndex: undefined,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'Read... Remove this comment to see the full error message
        textExtractor: data => data,
    };

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    render() {
        // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
        const { data, rowIndex, textExtractor, dateFormat, ...cellProps } = this.props;
        const value = textExtractor(data[rowIndex]);
        const content = !value && value !== 0 ? EMPTY_VALUE_PLACEHOLDER : moment.utc(value).format(dateFormat);

        return <Cell {...cellProps}>{content}</Cell>;
    }
}

export default DateCell;
