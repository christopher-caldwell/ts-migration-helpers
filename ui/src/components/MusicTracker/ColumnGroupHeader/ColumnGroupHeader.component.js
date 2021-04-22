import React from 'react';

import { columnGroupName } from './ColumnGroupHeader.module.css';

// TODO: add tooltip, refresh button?
const ColumnGroupHeader = ({ name }) => <div className={columnGroupName}>{name}</div>;

export default ColumnGroupHeader;
