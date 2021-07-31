// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import HomePage from 'components/HomePage/HomePage';

jest.mock('components/Utilities/Image', () => <div />);
jest.mock('images/default.png', () => <div />);
jest.mock('stores/boardGroups/boardGroupsActions', () => ({
    fetchBoardGroups: () => ({ type: 'test action' }),
}));

const mockStore = configureStore([thunk]);
const store = mockStore({
    boardGroups: {},
    dateIntegrity: {
        savedDate: 'test date',
    },
    radioBoardFilters: {},
});
const renderHomePage = () =>
    shallow(
        <HomePage
            match={{ params: { tabId: 'test id' } }}
            requestDateIntegrityAction={() => {}}
            update={() => {}}
            updateDateIntegrityAction={() => {}}
            updateRadioBoardFiltersAction={() => {}}
            store={store}
        />
    ).dive();

describe('<HomePage />', () => {
    it('should render a loading indicator on data load', () => {
        const component = renderHomePage();
        expect(component.find('.home-page')).toHaveLength(1);
    });
});
