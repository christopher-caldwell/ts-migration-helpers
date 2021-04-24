import React from 'react';

import ColumnHeader from '../ColumnHeader';

import { columnHeadersContainer } from './ColumnHeaders.module.css';

const ColumnHeaders = ({ columnKeys, headerSetup }) => (
    <div className={columnHeadersContainer}>
        {columnKeys.map((column) => {
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
