import React from 'react';

import { expandButton } from './ExpandButton.module.css';

const ExpandButton = ({ expanded, onToggle }) => (
    <button className={expandButton} onClick={onToggle}>
        {expanded ? '-' : '+'}
    </button>
);

export default ExpandButton;
