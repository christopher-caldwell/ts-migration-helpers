import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const HeaderButton = ({ column, columnKey, onClick, sort, clickExpand, expanded, className }) => {
    if (column.disableSort) {
        return <span className="custom fixed-data-table-header-text">{column.header}</span>;
    }
    const { ascending } = sort;
    const { key } = sort;
    const sortDirection = ascending ? 'asc' : 'desc';
    const headerClass = classNames('fixed-data-table-header-btn', {
        [`fixed-data-table-header-sort-${sortDirection}`]: columnKey === key,
    });
    return (
        <span className={`public_fixedDataTableCell_cellContent ${className}`}>
            <button className={headerClass} onClick={() => onClick(columnKey, column)}>
                {column.header}
            </button>
            {clickExpand && (
                <button className="fixedDataTableCell-link" onClick={clickExpand} tabIndex="0">
                    {expanded ? '-' : '+'}
                </button>
            )}
        </span>
    );
};

HeaderButton.propTypes = {
    column: PropTypes.shape({
        disableSort: PropTypes.bool,
        header: PropTypes.string,
    }).isRequired,
    columnKey: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        ascending: PropTypes.bool,
        key: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    clickExpand: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    expanded: PropTypes.bool,
};

HeaderButton.defaultProps = {
    className: '',
    clickExpand: false,
    expanded: false,
};

export default HeaderButton;
