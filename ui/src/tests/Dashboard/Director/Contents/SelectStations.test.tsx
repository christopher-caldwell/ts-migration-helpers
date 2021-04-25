// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import SelectStations from 'components/Director/Contents/SelectStations';

jest.mock('components/Utilities/Image', () => <img alt="testimage" />);

const mockStations = [{
    id: 1,
    summary: {
        call_letters: 'test name 1',
        image_url: 'test image_url',
        location: 'test location',
        owner: 'test owner',
    },
},
{
    id: 2,
    summary: {
        call_letters: 'test name 2',
        image_url: 'test image_url',
        location: 'test location',
        owner: 'test owner',
    },
}];

const mockFormatsList = [{
    label: 'test format 1',
    value: 1,
}, {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    label: 'test format 2',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChecked' does not exist on type '{... Remove this comment to see the full error message
    value: 2,
}];

const mockMarketsList = [{
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stations' does not exist on type '{}'.
    label: 'test market 1',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleSelection' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    value: 1,
}, {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedStations' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChecked' does not exist on type '{... Remove this comment to see the full error message
    label: 'test market 2',
    value: 2,
}];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'stations' does not exist on type '{}'.
const mockOrderedStations = {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type '{}'... Remove this comment to see the full error message
    field: 'nielsen_rank',
    ascending: true,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type '{}'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleSelection' does not exist on type ... Remove this comment to see the full error message
const renderSelectStations = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedStations' does not exist on type ... Remove this comment to see the full error message
        <SelectStations
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
            handleChecked={options.handleChecked || (() => {})}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
            stations={options.stations || mockStations}
            toggleSelection={options.toggleSelection || (() => {})}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type '{}'... Remove this comment to see the full error message
            checkedStations={options.checkedStations || []}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type '{}'... Remove this comment to see the full error message
            className={options.className || 'test-class'}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
            filteredFormats={options.filteredFormats || []}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
            filteredMarkets={options.filteredMarkets || []}
            selectedSong={{ title: 'test title', artist: 'test artist' }}
            formatsList={options.formatsList || []}
            marketsList={options.marketsList || []}
            handleStationFilter={options.handleStationFilter || (() => {})}
            orderedStations={options.orderedStations || mockOrderedStations}
        />,
    )
);

describe('<SelectStations />', () => {
    it('should render component with correct structure', () => {
        const component = renderSelectStations();
        expect(component.find('.test-class')).toHaveLength(1);
        expect(component.find('.director__song-header-details')).toHaveLength(1);
        expect(component.find('SongHeader')).toHaveLength(1);
        expect(component.find('.director__header-actions')).toHaveLength(1);
        expect(component.find('TextButton')).toHaveLength(1);
        expect(component.find('.director__stations-list')).toHaveLength(1);
        expect(component.find('StationCard')).toHaveLength(2);
    });

    it('checkbox should trigger onCheck to select and deselect a station', () => {
        const mockHandleChecked = jest.fn();
        const component = renderSelectStations({ handleChecked: mockHandleChecked });
        const componentCheckbox = component.find('StationCard').at(0).shallow().find('CustomCheckbox')
            .shallow()
            .find('input');
        componentCheckbox.simulate('change', { target: { checked: true } });
        expect(mockHandleChecked).toHaveBeenCalled();
        mockHandleChecked.mockClear();
        componentCheckbox.simulate('change', { target: { checked: false } });
        expect(mockHandleChecked).toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
    it('Select All button should work when no stations are checked', () => {
        const mockToggleSelection = jest.fn();
        const component = renderSelectStations({
            toggleSelection: mockToggleSelection,
        });
        component.find('TextButton').at(0).simulate('click');
        expect(mockToggleSelection).toHaveBeenCalled();
        mockToggleSelection.mockClear();
        expect(component.find('TextButton').at(0).shallow().find('button')
            .at(0)
            .text()).toBe('Select All');
        component.find('TextButton').at(0).simulate('click');
        expect(mockToggleSelection).toHaveBeenCalled();
    });

    it('Unselect All button should work when all stations are checked', () => {
        const mockToggleSelection = jest.fn();
        const component = renderSelectStations({
            toggleSelection: mockToggleSelection,
            checkedStations: mockStations,
        });
        component.find('TextButton').at(0).simulate('click');
        expect(mockToggleSelection).toHaveBeenCalled();
        mockToggleSelection.mockClear();
        expect(component.find('TextButton').at(0).shallow().find('button')
            .at(0)
            .text()).toBe('Unselect All');
        component.find('TextButton').at(0).simulate('click');
        expect(mockToggleSelection).toHaveBeenCalled();
    });

    it('onToggleFilters should update state', () => {
        const component = renderSelectStations();
        const oldState = component.state();
        component.instance().onToggleFilters(true);
        const newState = component.state();
        expect(oldState.filterOpen).not.toBe(newState.filterOpen);
    });

    it('reset button should trigger handleResetFilter, triggering handleStationFilter', () => {
        const mockHandleStationFilter = jest.fn();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        component.find('.dropdown-filter__reset-button').simulate('click');
        expect(mockHandleStationFilter).toHaveBeenCalled();
    });

    it('handleExpand should open and close Format filter', () => {
        global.document.getElementsByClassName = () => [{
            offsetTop: 10,
        }];
        const component = renderSelectStations();
        component.instance().handleExpand('Format'); // Open Filter
        const openState = component.state();
        expect(openState.activeExpandableFilter).toBe('Format');
        component.instance().handleExpand('Format'); // Close Filter
        const closeState = component.state();
        expect(closeState.activeExpandableFilter).toBe(null);
    });

    it('handleSelectFormat should trigger handleStationFilter', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
        component.instance().handleSelectFormat(mockFormatsList[0], false);
        expect(mockHandleStationFilter).toHaveBeenCalled();
    });

    it('handleSelectFormat with select all should clone formatsList', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            formatsList: mockFormatsList,
        });
        component.instance().handleSelectFormat(null, true);
        expect(mockHandleStationFilter).toHaveBeenCalled();
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: mockFormatsList,
            filteredMarkets: [],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
    });

    it('handleSelectFormat should unselect all', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            formatsList: mockFormatsList,
            filteredFormats: mockFormatsList,
        });
        component.instance().handleSelectFormat(null, true);
        expect(mockHandleStationFilter).toHaveBeenCalled();
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredMarkets: [],
            filteredFormats: [],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
    });

    it('handleSelectFormat with all items selected and unselect one', () => {
        const mockHandleStationFilter = jest.fn();
        const mockFormatItem = mockFormatsList[0];
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            formatsList: mockFormatsList,
            filteredFormats: mockFormatsList,
        });
        component.instance().handleSelectFormat(mockFormatItem, false);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
        expect(mockHandleStationFilter).toHaveBeenCalled();
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: mockFormatsList,
            filteredMarkets: [],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
    });

    it('handleExpand should open and close Market filter', () => {
        global.document.getElementsByClassName = () => [{
            offsetTop: 10,
        }];
        const component = renderSelectStations();
        component.instance().handleExpand('Market'); // Open Filter
        const openState = component.state();
        expect(openState.activeExpandableFilter).toBe('Market');
        component.instance().handleExpand('Market'); // Close Filter
        const closeState = component.state();
        expect(closeState.activeExpandableFilter).toBe(null);
    });

    it('handleSelectMarket should trigger handleStationFilter', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        component.instance().handleSelectMarket(mockMarketsList[0], false);
        expect(mockHandleStationFilter).toHaveBeenCalled();
    });

    it('handleSelectMarket with select all should clone marketsList', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            marketsList: mockMarketsList,
        });
        component.instance().handleSelectMarket(null, true);
        expect(mockHandleStationFilter).toHaveBeenCalled();
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredMarkets: mockMarketsList,
            filteredFormats: [],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
    });

    it('handleSelectMarket should unselect all', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            marketsList: mockMarketsList,
            filteredMarkets: mockMarketsList,
        });
        component.instance().handleSelectMarket(null, true);
        expect(mockHandleStationFilter).toHaveBeenCalled();
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredMarkets: [],
            filteredFormats: [],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
    });

    it('handleSelectMarket with all items selected and unselect one', () => {
        const mockHandleStationFilter = jest.fn();
        const mockMarketItem = mockMarketsList[0];
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            marketsList: mockMarketsList,
            filteredMarkets: mockMarketsList,
        });
        component.instance().handleSelectMarket(mockMarketItem, false);
        expect(mockHandleStationFilter).toHaveBeenCalled();
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: [],
            filteredMarkets: mockMarketsList,
            orderedStations: mockOrderedStations,
            searchString: '',
        });
    });

    it('onSortChange should trigger handleStationFilter', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        component.instance().onSortChange('nielsen_rank');
        expect(mockHandleStationFilter).toHaveBeenCalled();
    });

    it('onSortChange should sort by asc', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        component.instance().onSortChange('call_letters');
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: [], filteredMarkets: [], orderedStations: { ascending: true, field: 'call_letters' }, searchString: '',
        });
    });

    it('onSortChange should sort by desc', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
            orderedStations: mockOrderedStations,
        });
        component.instance().onSortChange('nielsen_rank');
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: [], filteredMarkets: [], orderedStations: { ascending: false, field: 'nielsen_rank' }, searchString: '',
        });
    });

    it('search should trigger onChange', done => {
        const mockHandleSearchChange = jest.fn();
        const component = renderSelectStations();
        const searchField = component.find('SeachField').shallow();
        searchField.setProps({ onSearchChange: mockHandleSearchChange }).find('input').simulate('change', { target: { value: 'WHTZ' } });
        setTimeout(() => {
            expect(mockHandleSearchChange).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('reset button should trigger onHandleReset', done => {
        const component = renderSelectStations();
        const spy = jest.spyOn(component.instance(), 'handleSearchChange');
        const searchField = component.find('SeachField').shallow();
        searchField.setState({ searchValue: 'WHTZ' }).find('IconX').simulate('click');
        setTimeout(() => {
            expect(spy).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('handleSearchChange should filter the stations', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        component.instance().handleSearchChange('WHTZ');
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: [], filteredMarkets: [], orderedStations: { ascending: true, field: 'nielsen_rank' }, searchString: 'WHTZ',
        });
    });

    it('handleSearchChange should reset stations when search field is empty', () => {
        const mockHandleStationFilter = jest.fn();
        const component = renderSelectStations({
            handleStationFilter: mockHandleStationFilter,
        });
        component.instance().handleSearchChange('');
        expect(mockHandleStationFilter).toHaveBeenCalledWith({
            filteredFormats: [], filteredMarkets: [], orderedStations: { ascending: true, field: 'nielsen_rank' }, searchString: '',
        });
    });
});
