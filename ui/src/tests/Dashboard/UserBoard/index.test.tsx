import React from 'react';
import { shallow } from 'enzyme';

import UserBoard from 'components/UserBoard';

const renderUserBoard = (options = {}) => (
    shallow(
        <UserBoard
            match={options.match || {}}
        />,
    )
);

describe('<UserBoard />', () => {
    it('should render component', () => {
        const component = renderUserBoard();
    });
});
