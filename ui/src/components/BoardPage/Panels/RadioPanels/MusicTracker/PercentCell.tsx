import React from 'react';

import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';

import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

class PercentCell extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired,
        rowIndex: PropTypes.number,
        textExtractor: PropTypes.func,
    };

    static defaultProps = {
        rowIndex: undefined,
        textExtractor: data => data,
    };

    render() {
        const { data, rowIndex, textExtractor, ...cellProps } = this.props;
        const value = textExtractor(data[rowIndex]);
        const content = !value && value !== 0 ? EMPTY_VALUE_PLACEHOLDER : `${value}%`;

        return <Cell {...cellProps}>{content}</Cell>;
    }
}

export default PercentCell;
