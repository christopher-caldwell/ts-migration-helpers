import React from 'react';
import { shallow } from 'enzyme';
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
