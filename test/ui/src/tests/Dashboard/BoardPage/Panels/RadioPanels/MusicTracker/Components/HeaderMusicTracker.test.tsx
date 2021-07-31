import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ loading: any; musicTracker: any; musicTrac... Remove this comment to see the full error message
    },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
    musicTrackerData: {
        categoryDetails: {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type '{}... Remove this comment to see the full error message
            rawStationCategories: {},
        },
    },
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerData' does not exist on type... Remove this comment to see the full error message
const mockState = {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trendsEnabled' does not exist on type '{... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ loading: any; musicTracker: any; musicTrac... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggleTrends' does not exist on type '... Remove this comment to see the full error message
    dropDownDimensions: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSearchChange' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
        minHeight: 257,
        maxHeight: 257,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type '{}... Remove this comment to see the full error message
        height: 257,
        width: 270,
        opened: false,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerData' does not exist on type... Remove this comment to see the full error message
    },
    activeCategoryPanel: '',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trendsEnabled' does not exist on type '{... Remove this comment to see the full error message
    filtersOpened: false,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type '{}... Remove this comment to see the full error message
const renderHeaderMusicTracker = (options = {}) =>
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggleTrends' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ loading: any; musicTracker: any; musicTrac... Remove this comment to see the full error message
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
