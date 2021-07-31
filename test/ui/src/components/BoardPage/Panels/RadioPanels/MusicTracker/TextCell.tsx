// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
    const tooltip = tooltipExtractor ? tooltipExtractor(data[rowIndex]) : content;
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
    const textClassName = classNameExtractor ? classNameExtractor(data[rowIndex]) : '';
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
    return (
        <Cell {...cellProps} title={tooltip} className={classnames(textClassName, className)}>
            {content}
        </Cell>
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
    );
};

TextCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
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
