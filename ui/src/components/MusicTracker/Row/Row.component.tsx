// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Row.module.css' or its corre... Remove this comment to see the full error message
import { row } from './Row.module.css';

const Row = ({ cells }) => <div className={row}>{cells}</div>;

export default Row;
