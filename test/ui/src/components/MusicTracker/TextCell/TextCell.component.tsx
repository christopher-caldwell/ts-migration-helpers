// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TextCell.module.css' or its ... Remove this comment to see the full error message
import { textCell } from './TextCell.module.css';

const TextCell = ({ width, text, addedStyle }) => (
    <div className={`${textCell} ${addedStyle || ''}`} style={{ width }}>
        {text}
    </div>
);

export default TextCell;
