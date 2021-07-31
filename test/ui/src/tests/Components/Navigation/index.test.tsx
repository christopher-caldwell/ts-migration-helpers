import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { render } from 'enzyme';
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ navActiveItem: () => void; navUnmountItems... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ navActiveItem: () => void; navUnmountItems... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ navActiveItem: () => void; navUnmountItems... Remove this comment to see the full error message
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
