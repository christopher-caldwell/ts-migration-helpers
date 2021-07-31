import React from 'react';

import ColumnHeader from '../ColumnHeader';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnHeaders.module.css' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnHeaders.module.css' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
import { columnHeadersContainer } from './ColumnHeaders.module.css';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'columnKeys' implicitly has an 'an... Remove this comment to see the full error message
const ColumnHeaders = ({ columnKeys, headerSetup }) => (
    <div className={columnHeadersContainer}>
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type. */}
        {columnKeys.map(column => {
            const { name, addedStyle = '', width, expandButton, expanded, onToggle } = headerSetup[column];
            return (
                <ColumnHeader
                    key={column}
                    addedStyle={addedStyle}
                    width={width}
                    name={name}
                    expandButton={expandButton}
                    expanded={expanded}
                    onToggle={onToggle}
                />
            );
        })}
    </div>
);

export default ColumnHeaders;
