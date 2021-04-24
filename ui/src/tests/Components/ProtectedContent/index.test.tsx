import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ProtectedContent from 'components/ProtectedContent';

const mockUserRoles = [{ roleName: 'test role' }];
const mockStore = configureStore();
const store = mockStore({
    user: {
        getIn: () => ({
            toJS: () => mockUserRoles,
        }),
    },
});

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
