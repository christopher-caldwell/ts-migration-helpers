import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';

import ProtectedRoute from 'components/ProtectedRoute';

const mockUserRoles = [{ roleName: 'test role' }];
const mockStore = configureStore();
const store = mockStore({
    user: {
        getIn: () => ({
            toJS: () => mockUserRoles,
        }),
    },
});
const router = {
    history: new BrowserRouter().history,
    route: {
        location: {},
        match: {},
    },
};

const renderProtectedRoute = (options = {}) => (
    mount(
        <ProtectedRoute
            component={options.component || (() => <div className="test-class" />)}
            location={options.location || {}}
            requiredRoles={options.requiredRoles || ['test role']}
            store={store}
        />,
        {
            context: { router },
            childContextTypes: { router: shape({}) },
        },
    )
);

describe('<ProtectedRoute />', () => {
    it('should render component', () => {
        const component = renderProtectedRoute();
        expect(component.find('.test-class')).toBeTruthy();
    });

    it('should not render component when user lacks permission', () => {
        const component = renderProtectedRoute({ requiredRoles: ['test role 2'] });
        expect(component.find('.test-class')).toHaveLength(0);
    });

    it('should redirect when user lacks permission', () => {
        const component = renderProtectedRoute({ requiredRoles: ['test role 2'] });
        expect(component.find('Redirect')).toHaveLength(1);
    });
});
