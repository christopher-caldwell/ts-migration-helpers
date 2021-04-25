// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnGroupHeader.module.css... Remove this comment to see the full error message
import { columnGroupName } from './ColumnGroupHeader.module.css';

// TODO: add tooltip, refresh button?
const ColumnGroupHeader = ({ name }) => <div className={columnGroupName}>{name}</div>;

export default ColumnGroupHeader;
