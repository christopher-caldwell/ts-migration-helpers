// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Search from 'components/Search';

jest.mock('react-router-dom', () => ({
    Link: () => <div />,
}));

const mockStore = configureStore([thunk]);
const store = mockStore({});
const renderSearch = () => (
    shallow(
        <Search
            requestDateIntegrityAction={() => {}}
            updateDateIntegrityAction={() => {}}
            store={store}
        />,
    ).dive()
);

describe('<Search />', () => {
    it('should render component', () => {
        const component = renderSearch();
        expect(component.find('.navbar-search')).toHaveLength(1);
    });
});
