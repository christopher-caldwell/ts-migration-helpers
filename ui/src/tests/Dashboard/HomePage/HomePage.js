import React from 'react';
import { shallow } from 'enzyme';
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
