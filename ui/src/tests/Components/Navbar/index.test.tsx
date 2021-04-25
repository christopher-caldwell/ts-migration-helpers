// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import NavbarHeader from 'components/Navbar/index';

jest.mock('components/Utilities/Image', () => <img alt="testimage" />);
jest.mock('images/i-heart.svg', () => <svg />);
jest.mock('images/musiclab.svg', () => <svg />);

const mockUser = {
    getIn: () => ({
        roles: [],
    }),
};
const mockStore = configureStore();
const store = mockStore({
    user: mockUser,
});
const mockContext = {
    user: mockUser,
};
const renderNavbarHeader = () => (
    shallow(
        <NavbarHeader
            store={store}
            location="/"
        />,
        {
            context: mockContext,
            childContextTypes: {
                user: PropTypes.any,
            },
        },
    ).dive()
);

describe('<NavbarHeader />', () => {
    it('should render component', () => {
        const component = renderNavbarHeader();
        expect(component.find('.profile')).toHaveLength(1);
    });
});
