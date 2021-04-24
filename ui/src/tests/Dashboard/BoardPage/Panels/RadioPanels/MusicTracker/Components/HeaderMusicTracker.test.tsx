import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import HeaderMusicTracker from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/HeaderMusicTracker';

const mockResetMusicTrackerFilter = jest.fn().mockReturnValue({ type: 'test action' });
const mockSetMusicTrackerFilter = jest.fn().mockReturnValue({ type: 'test action' });
jest.mock('stores/musicTracker/musicTrackerActions', () => ({
    resetMusicTrackerFilter: () => mockResetMusicTrackerFilter,
    setMusicTrackerFilter: () => mockSetMusicTrackerFilter,
}));
const mockOpenModal = jest.fn().mockReturnValue({ type: 'test action' });
jest.mock('stores/preferences/preferencesActions', () => ({
    openModal: () => mockOpenModal,
}));

const mockStore = configureStore([thunk]);
const store = mockStore({
    musicTracker: {
        filter: {
            search: '',
            changed: false,
            crg: [],
            category: {},
        },
    },
    musicTrackerData: {
        categoryDetails: {
            rawStationCategories: {},
        },
    },
});

const mockState = {
    dropDownDimensions: {
        minHeight: 257,
        maxHeight: 257,
        height: 257,
        width: 270,
        opened: false,
    },
    activeCategoryPanel: '',
    filtersOpened: false,
};

const renderHeaderMusicTracker = (options = {}) =>
    shallow(
        <HeaderMusicTracker
            loading={options.loading || false}
            musicTracker={options.musicTracker || {}}
            musicTrackerData={options.musicTrackerData}
            trendsEnabled={options.trendsEnabled || false}
            onFilterSave={options.onFilterSave || (() => {})}
            onToggleTrends={options.onToggleTrends || (() => {})}
            onSearchChange={options.onSearchChange || (() => {})}
            store={store}
        />,
        { context: mockState }
    ).dive();

describe('<HeaderMusicTracker />', () => {
    it('should render component', () => {
        const component = renderHeaderMusicTracker();
        expect(component.find('.music-tracker-header')).toHaveLength(1);
        expect(component.find('.music-tracker-filters')).toHaveLength(1);
        expect(component.find('.music-tracker-actions')).toHaveLength(1);
    });

    it('filter button should trigger open modal action', () => {
        mockOpenModal.mockClear();
        const component = renderHeaderMusicTracker();
        component.find('button').at(1).simulate('click');
        expect(mockOpenModal).toHaveBeenCalled();
    });

    it('onSearchChange should trigger setMusicTrackerFilter action', done => {
        mockSetMusicTrackerFilter.mockClear();
        const component = renderHeaderMusicTracker();
        const spyOnSearchChange = jest.spyOn(component.instance(), 'onSearchChange');
        component.instance().onSearchChange('ariana');
        expect(spyOnSearchChange).toHaveBeenCalled();
        setTimeout(() => {
            expect(mockSetMusicTrackerFilter).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('reset button should trigger setMusicTrackerFilter action', done => {
        mockSetMusicTrackerFilter.mockClear();
        const component = renderHeaderMusicTracker();
        component.instance().onSearchChange('ariana');
        setTimeout(() => {
            mockSetMusicTrackerFilter.mockClear();
            component.instance().handleResetSearch();
            expect(mockSetMusicTrackerFilter).toHaveBeenCalled();
            done();
        }, 600);
    });
});
