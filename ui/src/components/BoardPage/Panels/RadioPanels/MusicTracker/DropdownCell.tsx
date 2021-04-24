import React from 'react';

import { Cell } from 'fixed-data-table-2';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

class DropdownCell extends React.PureComponent {
    render() {
        const { data, rowIndex, textExtractor, ...cellProps } = this.props;
        const { className } = cellProps;
        const row = data[rowIndex];

        const output = textExtractor(row);

        if (!output) {
            return (
                <Cell
                    className={classnames('dropdown-txt-cell', className)}
                    title={EMPTY_VALUE_PLACEHOLDER}
                >
                    {EMPTY_VALUE_PLACEHOLDER}
                </Cell>
            );
        }

        return (
            <Cell
                className={classnames('dropdown-txt-cell', className)}
                title={output[0].versionName}
            >
                {output[0].versionName}
            </Cell>
        );
    }
}

DropdownCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    toggleCategory: PropTypes.func.isRequired,
    rowIndex: PropTypes.number,
    textExtractor: PropTypes.func,
};

DropdownCell.defaultProps = {
    rowIndex: undefined,
    textExtractor: null,
};

export default DropdownCell;
