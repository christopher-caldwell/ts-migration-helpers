import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
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
