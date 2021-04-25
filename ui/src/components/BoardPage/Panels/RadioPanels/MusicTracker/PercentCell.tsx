import React from 'react';

import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';

import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

class PercentCell extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired,
        rowIndex: PropTypes.number,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        textExtractor: PropTypes.func,
    };

    static defaultProps = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        rowIndex: undefined,
        textExtractor: data => data,
    };

    render() {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const { data, rowIndex, textExtractor, ...cellProps } = this.props;
        const value = textExtractor(data[rowIndex]);
        const content = !value && value !== 0 ? EMPTY_VALUE_PLACEHOLDER : `${value}%`;

        return <Cell {...cellProps}>{content}</Cell>;
    }
}

export default PercentCell;
