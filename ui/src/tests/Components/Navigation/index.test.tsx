import React from 'react';
import { render } from 'enzyme';
import configureStore from 'redux-mock-store';

import Navigation from 'components/Navigation/index';

const mockStore = configureStore();
const store = mockStore({
    navbar: [
        {
            description: 'test description',
            href: 'test href',
            active: true,
        },
    ],
});
const renderNavigation = () => (
    render(
        <Navigation
            navActiveItem={() => { }}
            navUnmountItems={() => { }}
            store={store}
        />,
    )
);

describe('<Navigation />', () => {
    it.skip('should render component', () => {
        const component = renderNavigation();
        expect(component.find('.active').length).toBe(1);
    });
});
