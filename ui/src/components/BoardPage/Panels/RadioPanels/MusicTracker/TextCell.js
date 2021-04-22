import React from 'react';

import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classnames from 'classnames';

import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';
import objectGet from 'utils/objectGet';

const TextCell = props => {
    const {
        data,
        rowIndex,
        className,
        classNameExtractor,
        textExtractor,
        columnKey,
        render,
        tooltipExtractor,
        ...cellProps
    } = props;

    let content = EMPTY_VALUE_PLACEHOLDER;
    if (render) {
        content = render({ row: data[rowIndex], ...props });
    } else if (textExtractor) {
        content = textExtractor(data[rowIndex]);
    } else {
        content = objectGet(data[rowIndex], columnKey);
    }

    content = content || EMPTY_VALUE_PLACEHOLDER;

    const tooltip = tooltipExtractor ? tooltipExtractor(data[rowIndex]) : content;
    const textClassName = classNameExtractor ? classNameExtractor(data[rowIndex]) : '';
    return (
        <Cell {...cellProps} title={tooltip} className={classnames(textClassName, className)}>
            {content}
        </Cell>
    );
};

TextCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    className: PropTypes.string,
    classNameExtractor: PropTypes.func,
    columnKey: PropTypes.string,
    render: PropTypes.func,
    rowIndex: PropTypes.number,
    textExtractor: PropTypes.func,
    tooltipExtractor: PropTypes.func,
};

TextCell.defaultProps = {
    className: null,
    classNameExtractor: () => 'txt-cell',
    render: null,
    rowIndex: undefined,
    columnKey: undefined,
    textExtractor: null,
    tooltipExtractor: null,
};

export default TextCell;
