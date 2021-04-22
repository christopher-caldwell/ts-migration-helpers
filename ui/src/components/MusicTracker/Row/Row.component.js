import React from 'react';

import { row } from './Row.module.css';

const Row = ({ cells }) => <div className={row}>{cells}</div>;

export default Row;
