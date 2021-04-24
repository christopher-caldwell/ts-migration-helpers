import React from 'react';

import { textCell } from './TextCell.module.css';

const TextCell = ({ width, text, addedStyle }) => (
    <div className={`${textCell} ${addedStyle || ''}`} style={{ width }}>
        {text}
    </div>
);

export default TextCell;
