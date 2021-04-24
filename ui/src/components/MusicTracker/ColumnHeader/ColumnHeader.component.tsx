import React from 'react';

import { columnHeader, columnHeaderButton } from './ColumnHeader.module.css';
import ExpandButton from '../ExpandButton';

const ColumnHeader = ({ addedStyle, name, width, expandButton, expanded, onToggle }) => (
    <div className={`${columnHeader} ${addedStyle}`} style={{ width }}>
        <button className={columnHeaderButton}>{name}</button>
        {expandButton && <ExpandButton expanded={expanded} onToggle={onToggle} />}
    </div>
);

export default ColumnHeader;
