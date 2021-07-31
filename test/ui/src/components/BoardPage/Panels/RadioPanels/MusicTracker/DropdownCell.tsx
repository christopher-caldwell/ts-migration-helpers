import React from 'react';

import { Cell } from 'fixed-data-table-2';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
import classnames from 'classnames';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'textExtractor' does not exist on type 'R... Remove this comment to see the full error message
import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ chi... Remove this comment to see the full error message
class DropdownCell extends React.PureComponent {
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const { data, rowIndex, textExtractor, ...cellProps } = this.props;
        const { className } = cellProps;
        const row = data[rowIndex];

        const output = textExtractor(row);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ tog... Remove this comment to see the full error message
        if (!output) {
            return (
                // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
                <Cell
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                    className={classnames('dropdown-txt-cell', className)}
                    title={EMPTY_VALUE_PLACEHOLDER}
                >
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    rowIndex: PropTypes.number,
    textExtractor: PropTypes.func,
};

DropdownCell.defaultProps = {
    rowIndex: undefined,
    textExtractor: null,
};

export default DropdownCell;
