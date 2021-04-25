import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'history' does not exist on type 'Browser... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'component' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
import ProtectedRoute from 'components/ProtectedRoute';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type '{}'.
const mockUserRoles = [{ roleName: 'test role' }];
// @ts-expect-error ts-migrate(2339) FIXME: Property 'requiredRoles' does not exist on type '{... Remove this comment to see the full error message
const mockStore = configureStore();
const store = mockStore({
    user: {
        getIn: () => ({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'component' does not exist on type '{}'.
            toJS: () => mockUserRoles,
        }),
    },
});
const router = {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
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
