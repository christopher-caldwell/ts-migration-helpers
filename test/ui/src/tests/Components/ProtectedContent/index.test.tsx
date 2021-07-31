import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'requiredRoles' does not exist on type '{... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'fallback' does not exist on type '{}'.
import ProtectedContent from 'components/ProtectedContent';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'requiredRoles' does not exist on type '{... Remove this comment to see the full error message
const mockUserRoles = [{ roleName: 'test role' }];
const mockStore = configureStore();
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fallback' does not exist on type '{}'.
const store = mockStore({
    user: {
        getIn: () => ({
            toJS: () => mockUserRoles,
        }),
    },
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
const renderProtectedContent = (options = {}) => (
    shallow(
        <ProtectedContent
            requiredRoles={options.requiredRoles || ['test role']}
            fallback={options.fallback || <div className="test-class-fallback" />}
            store={store}
        >
            {options.children || <div className="test-class" />}
        </ProtectedContent>,
    ).dive()
);

describe('<ProtectedContent />', () => {
    it('should render component', () => {
        const component = renderProtectedContent();
        expect(component.find('.test-class')).toBeTruthy();
        expect(component.find('.test-class-fallback')).toBeTruthy();
    });

    it('should not render component when user lacks permission', () => {
        const component = renderProtectedContent({ requiredRoles: ['test role 2'] });
        expect(component.find('.test-class')).toHaveLength(0);
    });

    it('should render fallback when user lacks permission', () => {
        const component = renderProtectedContent({ requiredRoles: ['test role 2'] });
        expect(component.find('.test-class-fallback')).toHaveLength(1);
    });
});
