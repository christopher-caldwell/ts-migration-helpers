// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchFormats' does not exist on type '{}... Remove this comment to see the full error message
import RadioListFilter from 'components/HomePage/Filters/RadioFilters/RadioListFilter';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchMarkets' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchFormats' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingFormats' does not exist on type ... Remove this comment to see the full error message
const mockStore = configureStore([thunk]);
const store = mockStore({
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingMarkets' does not exist on type ... Remove this comment to see the full error message
    radioList: [],
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type '{}'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchMarkets' does not exist on type '{}... Remove this comment to see the full error message
const mockAction = jest.fn().mockReturnValue({ type: 'test action' });
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type '{}... Remove this comment to see the full error message
jest.mock('stores/lookupTables/lookupTablesActions', () => ({
    fetchFormats: () => mockAction,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingFormats' does not exist on type ... Remove this comment to see the full error message
    fetchMarkets: () => mockAction,
}));
// @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingMarkets' does not exist on type ... Remove this comment to see the full error message
const renderRadioListFilter = (options = {}) =>
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type '{}'... Remove this comment to see the full error message
        <RadioListFilter
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type '{}'... Remove this comment to see the full error message
            fetchFormats={options.fetchFormats || (() => {})}
            fetchMarkets={options.fetchMarkets || (() => {})}
            filters={options.filters || {}}
            onFilterSave={options.onFilterSave || (() => {})}
            fetchingFormats={options.fetchingFormats}
            fetchingMarkets={options.fetchingMarkets}
            formatsList={options.formatsList || [{}]}
            marketsList={options.marketsList || [{}]}
            store={store}
        />
    ).dive();

describe('<RadioListFilter />', () => {
    it('Should render component', () => {
        const mockFetchFormats = jest.fn();
        const mockFetchMarkets = jest.fn();
        const mockOnFilterSave = jest.fn();
        const component = renderRadioListFilter({
            fetchFormats: mockFetchFormats,
            fetchMarkets: mockFetchMarkets,
            filters: {
                domain: 'test-domain',
                sort: {
                    field: 'test-field',
                    ascending: true,
                },
                formats: [1, 2, 3],
                markets: [1, 2, 3],
            },
            onFilterSave: mockOnFilterSave,
            fetchingFormats: true,
            fetchingMarkets: true,
            formatsList: [
                {
                    label: 'testlabel',
                    value: 1,
                },
            ],
            marketsList: [
                {
                    label: 'test-label',
                    value: 'test-value',
                },
            ],
        });
        expect(component.find('.radio-board-filters')).toHaveLength(1);
    });

    it('onChange should be triggered', () => {
        const mockEvent = { currentTarget: { name: 'test', value: 'test' } };
        const mockFetchFormats = jest.fn();
        const mockFetchMarkets = jest.fn();
        const mockOnFilterSave = jest.fn();
        const component = renderRadioListFilter({
            fetchFormats: mockFetchFormats,
            fetchMarkets: mockFetchMarkets,
            filters: {
                domain: 'test-domain',
                sort: {
                    field: 'test-field',
                    ascending: true,
                },
                formats: [1, 2, 3],
                markets: [1, 2, 3],
            },
            onFilterSave: mockOnFilterSave,
            fetchingFormats: true,
            fetchingMarkets: true,
            formatsList: [
                {
                    label: 'testlabel',
                    value: 1,
                },
            ],
            marketsList: [
                {
                    label: 'test-label',
                    value: 'test-value',
                },
            ],
        });
        const spyOnChange = jest.spyOn(component.instance(), 'onChange');
        component.instance().onChange(mockEvent);
        expect(spyOnChange).toHaveBeenCalled();
    });

    it('onChange should not trigger onFilterSave', () => {
        const mockEvent = { currentTarget: { name: 'test', value: 'test' } };
        const mockFetchFormats = jest.fn();
        const mockFetchMarkets = jest.fn();
        const mockOnFilterSave = jest.fn();
        const component = renderRadioListFilter({
            fetchFormats: mockFetchFormats,
            fetchMarkets: mockFetchMarkets,
            filters: {
                domain: 'test',
                sort: {
                    field: 'test-field',
                    ascending: true,
                },
                formats: [1, 2, 3],
                markets: [1, 2, 3],
            },
            onFilterSave: mockOnFilterSave,
            fetchingFormats: true,
            fetchingMarkets: true,
            formatsList: [
                {
                    label: 'testlabel',
                    value: 1,
                },
            ],
            marketsList: [
                {
                    label: 'test-label',
                    value: 'test-value',
                },
            ],
        });
        const spyOnChange = jest.spyOn(component.instance(), 'onChange');
        component.instance().onChange(mockEvent);
        expect(spyOnChange).toHaveBeenCalled();
    });

    it('onSortChange should be triggered', () => {
        const mockEvent = { currentTarget: { name: 'test', value: 'test' } };
        const mockFetchFormats = jest.fn();
        const mockFetchMarkets = jest.fn();
        const mockOnFilterSave = jest.fn();
        const component = renderRadioListFilter({
            fetchFormats: mockFetchFormats,
            fetchMarkets: mockFetchMarkets,
            filters: {
                domain: 'test',
                sort: {
                    field: 'test-field',
                    ascending: true,
                },
                formats: [1, 2, 3],
                markets: [1, 2, 3],
            },
            onFilterSave: mockOnFilterSave,
            fetchingFormats: true,
            fetchingMarkets: true,
            formatsList: [
                {
                    label: 'testlabel',
                    value: 1,
                },
            ],
            marketsList: [
                {
                    label: 'test-label',
                    value: 'test-value',
                },
            ],
        });
        const spyOnChange = jest.spyOn(component.instance(), 'onSortChange');
        component.instance().onSortChange(mockEvent);
        expect(spyOnChange).toHaveBeenCalled();
    });

    it('handleSelectedChangedMarkets should  be triggered ', () => {
        const component = renderRadioListFilter();
        const marketsSelected = { test: 'test' };
        const spyhandleSelectedChangedMarkets = jest.spyOn(
            component.instance(),
            'handleSelectedChangedMarkets'
        );
        component.instance().handleSelectedChangedMarkets(marketsSelected);
        expect(spyhandleSelectedChangedMarkets).toHaveBeenCalled();
    });

    it('handleSelectedChangedFormats should  be triggered ', () => {
        const component = renderRadioListFilter();
        const marketsSelected = { test: 'test' };
        const spyHandleSelectedChangedFormats = jest.spyOn(
            component.instance(),
            'handleSelectedChangedFormats'
        );
        component.instance().handleSelectedChangedFormats(marketsSelected);
        expect(spyHandleSelectedChangedFormats).toHaveBeenCalled();
    });
});
