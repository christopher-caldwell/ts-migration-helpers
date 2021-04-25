// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'column' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'column' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HeaderButton = ({ column, columnKey, onClick, sort, clickExpand, expanded, className }) => {
    if (column.disableSort) {
        return <span className="custom fixed-data-table-header-text">{column.header}</span>;
    }
    const { ascending } = sort;
    const { key } = sort;
    const sortDirection = ascending ? 'asc' : 'desc';
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
    const headerClass = classNames('fixed-data-table-header-btn', {
        [`fixed-data-table-header-sort-${sortDirection}`]: columnKey === key,
    });
    return (
        <span className={`public_fixedDataTableCell_cellContent ${className}`}>
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'true | ((...args: any[]) => any)' is not ass... Remove this comment to see the full error message
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
