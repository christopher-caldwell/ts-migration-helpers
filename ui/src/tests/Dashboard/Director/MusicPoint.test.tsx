import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import MusicPoint from 'components/Director/MusicPoint';

jest.mock('react-router-dom', () => ({
    Route: props => props.render(),
}));

jest.mock('components/Utilities/Image', () => 'img');
jest.mock('stores/boardGroups/boardGroupsActions', () => ({
    fetchDirectorStations: () => ({ type: 'test action' }),
}));
jest.mock('stores/lookupTables/lookupTablesActions', () => ({
    fetchFormats: () => ({ type: 'test action' }),
    fetchMarkets: () => ({ type: 'test action' }),
}));
jest.mock('components/Director/Contents/SongOverview', () => 'SongOverview');

const mockSongs = {
    data: [
        { number: 11111, title: 'song title 1', artist: 'artist name 1' },
        { number: 22222, title: 'song title 2', artist: 'artist name 2' },
        { number: 33333, title: 'song title 3', artist: 'artist name 3' },
    ],
};

const mockStations = [
    {
        id: 1,
        summary: {
            name: 'test name 1',
            image_url: 'test image_url',
            location: 'test location',
            owner: 'test owner',
            call_letters: 'test callletters 1',
            nielsen_rank: 0,
            format_id: 1,
            market_id: 1,
        },
    },
    {
        id: 2,
        summary: {
            name: 'test name 2',
            image_url: 'test image_url',
            location: 'test location',
            owner: 'test owner',
            call_letters: 'test callletters 2',
            nielsen_rank: 1,
            format_id: 2,
            market_id: 2,
        },
    },
];

const mockStore = configureStore([thunk]);
const store = mockStore({
    boardGroups: {
        data: {
            boards: mockStations,
        },
    },
    lookupTables: {
        formats: [
            {
                value: 1,
                label: 'test format',
            },
        ],
        markets: [
            {
                value: 1,
                label: 'test market',
            },
        ],
    },
    songs: mockSongs,
});
const mockState = {
    checkedStations: [],
    activeStep: 0,
};

const mockOrderedStations = {
    field: 'nielsen_rank',
    ascending: true,
};

const renderMusicPoint = (options = {}) =>
    shallow(
        <MusicPoint
            onClick={options.onClick || (() => {})}
            store={options.store || store}
            songs={options.songs || mockSongs.data}
            stations={options.stations || mockStations}
        />,
        { context: mockState }
    ).dive();

describe('<MusicPoint />', () => {
    it.skip('should render component with correct structure', () => {
        const component = renderMusicPoint();
        const songOverviewComponent = component.find('Route').at(0).shallow();
        expect(component.find('section')).toHaveLength(1);
        expect(songOverviewComponent.find('SongOverview')).toHaveLength(1);
        component.instance().onSelectedSong(11111);
        const stationComponent = component.find('Route').at(1).shallow();
        expect(stationComponent.find('.director__steps')).toHaveLength(1);
        expect(stationComponent.find('.director__header')).toHaveLength(1);
        expect(stationComponent.find('.director__step-bar')).toHaveLength(1);
        expect(stationComponent.find('.back-button-director')).toHaveLength(1);
        expect(stationComponent.find('BackButton')).toHaveLength(1);
        expect(stationComponent.find('StepBar')).toHaveLength(1);
        // expect(stationComponent.find('BottomBarActions')).toHaveLength(1);
        expect(stationComponent.find('SelectStations')).toHaveLength(1);
        const reconcileComponent = component.find('Route').at(2).shallow();
        expect(reconcileComponent.find('ReconcileSongs')).toHaveLength(1);
    });

    it.skip('cancel button should trigger onCancel', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const stationComponent = component.find('Route').at(1).shallow();
        const spy = jest.spyOn(component.instance(), 'onCancel');
        stationComponent.find('BottomBarActions').shallow().find('button').at(0).simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it.skip('next button should trigger goTo', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const spy = jest.spyOn(component.instance(), 'goTo');
        const componentCheckbox = component
            .find('Route')
            .at(1)
            .shallow()
            .find('SelectStations')
            .shallow()
            .find('StationCard')
            .at(0)
            .shallow()
            .find('CustomCheckbox')
            .shallow()
            .find('input');
        componentCheckbox.simulate('change', { target: { checked: true } });
        // component.find('Route').at(1).shallow().find('BottomBarActions')
        // .shallow().find('button').at(1).simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it.skip('next button should be disabled', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const stationComponent = component.find('Route').at(1).shallow();
        expect(
            stationComponent.find('BottomBarActions').shallow().find('button.disabled')
        ).toHaveLength(1);
    });

    it.skip('clear selections button should trigger onClear', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const stationComponent = component.find('Route').at(1).shallow();
        const spy = jest.spyOn(component.instance(), 'onClear');
        stationComponent
            .find('BottomBarActions')
            .shallow()
            .find('DirectorBottomBarActions')
            .shallow()
            .setProps({ count: 2 })
            .find('TextButton')
            .at(0)
            .simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('checkbox should trigger handleChecked to select and deselect a station', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const stationComponent = component.find('Route').at(1).shallow();
        const mockHandleChecked = jest.fn();
        stationComponent
            .find('SelectStations')
            .shallow()
            .setProps({ handleChecked: mockHandleChecked })
            .find('StationCard')
            .at(0)
            .shallow()
            .find('CustomCheckbox')
            .shallow()
            .find('input')
            .simulate('change', { target: { checked: true } });
        expect(mockHandleChecked).toHaveBeenCalled();
        stationComponent
            .find('SelectStations')
            .shallow()
            .find('StationCard')
            .at(0)
            .shallow()
            .find('CustomCheckbox')
            .shallow()
            .find('input')
            .simulate('change', { target: { checked: true } });
        expect(component.state().checkedStations[0]).toHaveProperty('id', 1);
        stationComponent
            .find('SelectStations')
            .shallow()
            .find('StationCard')
            .at(0)
            .shallow()
            .find('CustomCheckbox')
            .shallow()
            .find('input')
            .simulate('change', { target: { checked: false } });
        expect(component.state().checkedStations).toEqual([]);
    });

    it('select button should trigger toggleSelection to Select All and Unselect All', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const mockToggleSelection = jest.fn();
        component
            .find('Route')
            .at(1)
            .shallow()
            .find('SelectStations')
            .shallow()
            .setProps({ toggleSelection: mockToggleSelection })
            .find('TextButton')
            .at(0)
            .simulate('click');
        expect(mockToggleSelection).toHaveBeenCalled();
        component
            .find('Route')
            .at(1)
            .shallow()
            .find('SelectStations')
            .shallow()
            .find('TextButton')
            .at(0)
            .simulate('click');
        expect(
            component
                .find('Route')
                .at(1)
                .shallow()
                .find('SelectStations')
                .shallow()
                .find('TextButton')
                .at(0)
                .shallow()
                .find('button')
                .at(0)
                .text()
        ).toBe('Unselect All');
        component
            .find('Route')
            .at(1)
            .shallow()
            .find('SelectStations')
            .shallow()
            .find('TextButton')
            .at(0)
            .simulate('click');
        expect(
            component
                .find('Route')
                .at(1)
                .shallow()
                .find('SelectStations')
                .shallow()
                .find('TextButton')
                .at(0)
                .shallow()
                .find('button')
                .at(0)
                .text()
        ).toBe('Select All');
    });

    it('handleStationFilter should update state', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const oldState = component.state();
        component.instance().handleStationFilter({
            filteredFormats: [
                {
                    label: 'test format',
                    value: 1,
                },
            ],
            filteredMarkets: [
                {
                    label: 'test market',
                    value: 1,
                },
            ],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
        const newState = component.state();
        expect(oldState.filteredFormats.length).toBe(0);
        expect(oldState.filteredMarkets.length).toBe(0);
        expect(oldState.orderedStations).toEqual(mockOrderedStations);
        expect(newState.filteredFormats.length).toBe(1);
        expect(newState.filteredMarkets.length).toBe(1);
        expect(newState.orderedStations).toHaveProperty('field');
        expect(newState.orderedStations).toHaveProperty('ascending');
    });

    it('should select no format and market', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const oldState = component.state();
        component.instance().handleStationFilter({
            filteredFormats: [],
            filteredMarkets: [],
            orderedStations: mockOrderedStations,
            searchString: '',
        });
        const newState = component.state();
        expect(oldState).toEqual(newState);
    });

    it('sortStations should sort by asc and desc', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const spy = jest.spyOn(component.instance(), 'sortStations');
        component.instance().sortStations(mockStations); // Sort by asc
        expect(spy).toHaveBeenCalled();
        const stateAsc = component.state();
        expect(stateAsc.orderedStations.ascending).toBe(true);
        component.setState({
            orderedStations: {
                field: 'nielsen_rank',
                ascending: false,
            },
        });
        component.instance().sortStations(mockStations); // Sort by desc
        const stateDesc = component.state();
        expect(stateDesc.orderedStations.ascending).toBe(false);
    });

    it('validateSearch should be true', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const spyValidateSearch = jest.spyOn(component.instance(), 'validateSearch');
        const result = component.instance().validateSearch(
            {
                summary: {
                    name: 'test name',
                    call_letters: 'test call_letters',
                },
            },
            'test'
        );
        expect(result).toBe(true);
        expect(spyValidateSearch).toHaveBeenCalled();
    });

    it('validateSearch should be false ', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const spyValidateSearch = jest.spyOn(component.instance(), 'validateSearch');
        const result = component.instance().validateSearch(
            {
                summary: {
                    name: 'test name',
                    call_letters: 'test call_letters',
                },
            },
            'abcd'
        );
        expect(result).toBe(false);
        expect(spyValidateSearch).toHaveBeenCalled();
    });

    it('filterStations should not filter when no filters are applied ', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        const spyFilterStations = jest.spyOn(component.instance(), 'filterStations');
        const result = component.instance().filterStations(mockStations);
        expect(typeof result).toBe('object');
        expect(result).toHaveLength(2);
        expect(spyFilterStations).toHaveBeenCalled();
    });

    it('filterStations should filter by format', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        component.setState({
            filteredFormats: [
                {
                    value: 1,
                },
            ],
        });
        const spyFilterStations = jest.spyOn(component.instance(), 'filterStations');
        const result = component.instance().filterStations(mockStations);
        expect(typeof result).toBe('object');
        expect(result).toHaveLength(1);
        expect(result[0].summary.format_id).toBe(1);
        expect(spyFilterStations).toHaveBeenCalled();
    });

    it('filterStations should filter by market', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        component.setState({
            filteredMarkets: [
                {
                    value: 1,
                },
            ],
        });
        const spyFilterStations = jest.spyOn(component.instance(), 'filterStations');
        const result = component.instance().filterStations(mockStations);
        expect(typeof result).toBe('object');
        expect(result).toHaveLength(1);
        expect(result[0].summary.market_id).toBe(1);
        expect(spyFilterStations).toHaveBeenCalled();
    });

    it('filterStations should filter by searchString', () => {
        const component = renderMusicPoint();
        component.instance().onSelectedSong(11111);
        component.setState({
            searchString: '1',
        });
        const result = component.instance().filterStations(mockStations);
        expect(typeof result).toBe('object');
        expect(result).toHaveLength(1);
        expect(result[0].summary.name).toBe('test name 1');
    });

    it('filterStations should filter by format, market and searchString', () => {
        const component = renderMusicPoint();
        component.setState({
            searchString: '1',
            filteredMarkets: [
                {
                    value: 1,
                },
            ],
            filteredFormats: [
                {
                    value: 1,
                },
            ],
        });
        const result = component.instance().filterStations(mockStations);
        expect(typeof result).toBe('object');
        expect(result).toHaveLength(1);
        expect(result[0].summary.name).toBe('test name 1');
    });
});
