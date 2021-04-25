import React from 'react';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnHeader.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnHeader.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnHeader.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
import { columnHeader, columnHeaderButton } from './ColumnHeader.module.css';
import ExpandButton from '../ExpandButton';

const ColumnHeader = ({ addedStyle, name, width, expandButton, expanded, onToggle }) => (
    <div className={`${columnHeader} ${addedStyle}`} style={{ width }}>
        <button className={columnHeaderButton}>{name}</button>
        {expandButton && <ExpandButton expanded={expanded} onToggle={onToggle} />}
    </div>
);

export default ColumnHeader;
