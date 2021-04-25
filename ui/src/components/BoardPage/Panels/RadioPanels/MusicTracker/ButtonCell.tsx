// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import { Cell } from 'fixed-data-table-2';
import cn from 'classnames';

import objectGet from 'utils/objectGet';
import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

const ButtonCell = props => {
    const {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        classNameExtractor,
        columnKey,
        data,
        disabled,
        rowIndex,
        textExtractor,
        subTextExtractor,
        tooltipExtractor,
        onClick: propsOnClick,
        ...cellProps
    } = props;

    const onClick = event => {
        event.stopPropagation();
        propsOnClick(data, rowIndex, event, columnKey);
    };

    const buttonClassName = classNameExtractor(data[rowIndex]);
    const text = textExtractor(data[rowIndex], columnKey) || EMPTY_VALUE_PLACEHOLDER;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const subText = subTextExtractor(data[rowIndex], columnKey);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    let tooltip = tooltipExtractor(data[rowIndex]);

    if (tooltip === '') {
        tooltip = text;
    }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    return (
        // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
        <Cell {...cellProps}>
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type. */}
            {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
            <button className={cn(buttonClassName)} disabled={disabled} title={tooltip} type="button" onClick={onClick}>
                {/* @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type. */}
                {text}
            </button>
            {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
            <div>{subText}</div>
        </Cell>
    );
};

ButtonCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    classNameExtractor: PropTypes.func,
    columnKey: PropTypes.string,
    disabled: PropTypes.bool,
    rowIndex: PropTypes.number,
    subTextExtractor: PropTypes.func,
    textExtractor: PropTypes.func,
    tooltipExtractor: PropTypes.func,
    onClick: PropTypes.func,
};

ButtonCell.defaultProps = {
    columnKey: undefined,
    classNameExtractor: () => 'btn-anchor',
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    disabled: false,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
    rowIndex: undefined,
    textExtractor: (data, columnKey) => objectGet(data, columnKey),
    subTextExtractor: () => '',
    tooltipExtractor: () => '',
    onClick: () => {},
};

export default ButtonCell;
