import React from 'react';
import { shallow } from 'enzyme';

import AuthenticatedPage from 'components/AuthenticatedPage';

const renderAuthenticatedPage = () => (
    shallow(
        <AuthenticatedPage />,
    )
);

describe('<AuthenticatedPage />', () => {
    it('should render component', () => {
        const component = renderAuthenticatedPage();
        expect(component.find('.authenticated-page')).toHaveLength(1);
    });
});
