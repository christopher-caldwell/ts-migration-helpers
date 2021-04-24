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

    static defaultProps = {
        columnKey: undefined,
        dateFormat: 'M/D/YY',
        rowIndex: undefined,
        textExtractor: data => data,
    };

    render() {
        const { data, rowIndex, textExtractor, dateFormat, ...cellProps } = this.props;
        const value = textExtractor(data[rowIndex]);
        const content = !value && value !== 0 ? EMPTY_VALUE_PLACEHOLDER : moment.utc(value).format(dateFormat);

        return <Cell {...cellProps}>{content}</Cell>;
    }
}

export default DateCell;
