import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConfigDayparts from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Contents/ConfigDayparts';

const mockAction = jest.fn().mockReturnValue({ type: 'ACTION' });
jest.mock('stores/dayparts/daypartsActions', () => ({
    updateSongsAlternateCategory: mockAction,
}));

const mockStore = configureStore();
const store = mockStore({
    updateSongsAlternateCategoryAction: jest.fn(),
});

const mockDayparts = [
    {
        id: 1,
        name: 'test-daypart-1',
        synchronized: false,
        scheduling_order: 0,
        hours: [6, 7, 8, 9],
    },
    {
        id: 2,
        name: 'test-daypart-2',
        synchronized: true,
        scheduling_order: 0,
        hours: [10, 11, 12],
    },
];

const mockStagedDayparts = [
    {
        id: 1,
        name: 'test daypart 1',
        hours: [0, 1, 2, 6, 7, 8, 9],
    },
];

const mockSongs = [
    {
        sId: '1',
        aNm: 'Eminem',
        sNm: 'Lose yourself',
        alternate: {
            2: {
                category_id: 1,
            },
        },
    },
];

const mockCategories = [
    {
        label: 'A',
        value: 1,
    },
    {
        label: 'B',
        value: 2,
    },
    {
        label: 'C',
        value: 3,
    },
    {
        label: 'D',
        value: 4,
    },
];

const mockDaypartsChanges = [
    {
        sId: 84876225,
        sNm: 'FALLIN',
        aNm: 'Alicia Keys',
        media_id: 700189,
        packet_id: null,
        restriction_id: 1342,
        version_name: '-',
        modified_date: '2019-10-30T20:18:38.131Z',
        gs_category: 'H1',
        alternate: {
            240: {
                category_id: 30,
                gs_category: null,
            },
            241: {
                category_id: null,
            },
        },
        order_by: 900,
        getChanges: {
            actualChanges: {
                alternate: {
                    240: {
                        category_id: 30,
                        gs_category: null,
                    },
                    241: {
                        category_id: null,
                    },
                },
            },
            previousChanges: {
                packet_id: null,
                restriction_id: 1342,
                category: '',
                alternate: {
                    240: {
                        category_id: 30,
                        gs_category: null,
                    },
                    241: {
                        category_id: 17,
                        gs_category: null,
                    },
                },
            },
            undoneChanges: {},
            isEqualMedia: false,
        },
    },
];

const renderConfigDayparts = (options = {}) =>
    shallow(
        <ConfigDayparts
            createDaypart={options.createDaypart || (() => {})}
            dayparts={options.dayparts || mockDayparts}
            categories={options.a || mockCategories}
            songs={options.songs || mockSongs}
            stagedSongs={options.mockStagedSongs || [{}]}
            currentSongs={options.mockCurrentSongs || [{}]}
            stagedDayparts={options.stagedDayparts || mockStagedDayparts}
            store={store}
            updateSongsAlternateCategoryAction={mockAction}
            daypartsChanges={options.daypartsChanges || mockDaypartsChanges}
        />
    );

describe('<ConfigDayparts />', () => {
    it('should render component', () => {
        const component = renderConfigDayparts().shallow();
        expect(component.find('.station-configs__table')).toHaveLength(2);
        expect(component.find('.station-configs__add-action')).toHaveLength(1);
        expect(component.find('.station-configs__input')).toHaveLength(1);
        expect(component.find('.station-configs__button')).toHaveLength(2);
        expect(component.find('.station-configs__error-message')).toHaveLength(1);
    });

    it('should have the create daypart button disabled', () => {
        const component = renderConfigDayparts().shallow();
        expect(component.find('p.station-configs__button.disabled')).toHaveLength(1);
    });

    it('should type a new daypart name and do the validation', () => {
        const component = renderConfigDayparts().shallow();
        component
            .find('input.station-configs__input')
            .simulate('change', { target: { value: 'New Daypart' } });
        expect(component.state().newDaypartName).toBe('New Daypart');
        expect(component.state().createDaypartError).toBe(false);
        expect(component.find('.ml-error-message')).toHaveLength(0);
        expect(component.find('.station-configs__button').at(0).prop('disabled')).toBe(false);
    });

    it('should not allow to create a new daypart with a existing name', () => {
        const component = renderConfigDayparts().shallow();
        component
            .find('input.station-configs__input')
            .simulate('change', { target: { value: 'test-daypart-1' } });
        expect(component.state().newDaypartName).toBe('test-daypart-1');
        expect(component.state().createDaypartError).toBe(true);
        expect(component.find('.ml-error-message')).toHaveLength(1);
        expect(component.find('.station-configs__button').at(0).prop('disabled')).toBe(true);
    });

    it('should create a new daypart', () => {
        const mockCreateDaypart = jest.fn();
        const component = renderConfigDayparts({
            createDaypart: mockCreateDaypart,
        }).shallow();
        component
            .find('input.station-configs__input')
            .simulate('change', { target: { value: 'Daypart Test' } });
        component.find('.station-configs__button').at(0).simulate('click');
        expect(mockCreateDaypart).toHaveBeenCalled();
    });

    it('should handleExpandHeader update state when item is not collapsed', () => {
        const component = renderConfigDayparts().shallow();
        const spyHandleExpandHeader = jest.spyOn(component.instance(), 'handleExpandHeader');
        component.find('ExpandableHeader').at(1).simulate('toggle');
        expect(spyHandleExpandHeader).toHaveBeenCalled();
    });

    it('should select value change update state', () => {
        const component = renderConfigDayparts().shallow();
        const oldState = component.state();
        component.find('input').simulate('change', { target: { value: 'test' } });
        const newState = component.state();
        expect(oldState).not.toBe(newState);
    });

    it('should onSearchChange update state', () => {
        const component = renderConfigDayparts().shallow();
        component.instance().onSearchChange('test');
        const newState = component.state();
        expect(newState.searchValue).toBe('test');
    });

    it('should onSearchChange update state when input is null', () => {
        const component = renderConfigDayparts().shallow();
        component.instance().onSearchChange(null);
        const newState = component.state();
        expect(newState.searchValue).toBe('');
    });

    it('should handleResetSearch update state', () => {
        const component = renderConfigDayparts().shallow();
        component.setState({ searchValue: 'test' });
        component.instance().handleResetSearch();
        const newState = component.state();
        expect(newState.searchValue).toBe('');
    });

    it('should open assignment panel', () => {
        const component = renderConfigDayparts().shallow();
        component.find('.station-configs__button').at(1).simulate('click');
        expect(component.find('.station-configs__button').at(1).text()).toBe('Assignment');
        expect(component.state().assignmentPanelOpened).toBeTruthy();
    });

    it('should restoreState and saveChangeAlternate update state', () => {
        const component = renderConfigDayparts().shallow();
        component.setState({
            categoryChanges: {
                1: {
                    204: { value: 17 },
                },
                2: {
                    100: { value: 1 },
                },
            },
        });
        component.instance().saveChangeAlternate({ media_id: 1 }, 204);
        const newState = component.state();
        expect(newState.categoryChanges).toEqual({
            1: {
                204: { value: 17 },
            },
            2: {
                100: { value: 1 },
            },
        });
    });

    it('should show no data found message to station dayparts', () => {
        const component = renderConfigDayparts({
            dayparts: [],
        }).shallow();
        expect(component.find('p.station-configs--no-data-found').at(0).text()).toBe(
            'No data found.'
        );
        expect(component.find('SeachField')).toHaveLength(0);
        expect(component.find('button')).toHaveLength(0);
    });
});
