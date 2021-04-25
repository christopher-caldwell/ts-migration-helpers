// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{}'.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{}'.
// @ts-expect-error ts-migrate(6133) FIXME: 'component' is declared but its value is never rea... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(6133) FIXME: 'component' is declared but its value is never rea... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(1192) FIXME: Module '"/Users/chriscaldwell/Code/test/ts-migrate... Remove this comment to see the full error message
import UserBoard from 'components/UserBoard';

const renderUserBoard = (options = {}) => (
    shallow(
        <UserBoard
            match={options.match || {}}
        />,
    )
);

describe('<UserBoard />', () => {
    // @ts-expect-error ts-migrate(6133) FIXME: 'component' is declared but its value is never rea... Remove this comment to see the full error message
    it('should render component', () => {
        const component = renderUserBoard();
    });
});
