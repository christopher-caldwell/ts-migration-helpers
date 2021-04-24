import React from 'react';

import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import cn from 'classnames';

import objectGet from 'utils/objectGet';
import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

const ButtonCell = props => {
    const {
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
    const subText = subTextExtractor(data[rowIndex], columnKey);
    let tooltip = tooltipExtractor(data[rowIndex]);

    if (tooltip === '') {
        tooltip = text;
    }

    return (
        <Cell {...cellProps}>
            <button className={cn(buttonClassName)} disabled={disabled} title={tooltip} type="button" onClick={onClick}>
                {text}
            </button>
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
    disabled: false,
    rowIndex: undefined,
    textExtractor: (data, columnKey) => objectGet(data, columnKey),
    subTextExtractor: () => '',
    tooltipExtractor: () => '',
    onClick: () => {},
};

export default ButtonCell;
