import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import DaypartSongsList from 'components/AsideModal/Panels/DaypartSongsList';

const mockStore = configureStore();
const store = mockStore({
    boardDetails: {
        layout: {
            board: {
                id: 123456,
            },
        },
    },
});

const mockDaypart = {
    id: 240,
    name: '3A-5A',
    synchronized: true,
    scheduling_order: 40,
    hours: [
        99,
        100,
        101,
        75,
        76,
        77,
        51,
        52,
        53,
        147,
        148,
        149,
        123,
        124,
        125,
    ],
    songs: [
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
            },
            order_by: 900,
        },
        {
            sId: 92807218,
            sNm: 'EMPIRE STATE OF MIND',
            aNm: 'Jay-Z / Alicia Keys',
            media_id: 707645,
            packet_id: null,
            restriction_id: null,
            version_name: '-',
            modified_date: '2019-10-30T20:18:38.131Z',
            gs_category: 'O1',
            alternate: {
                240: {
                    category_id: 17,
                    gs_category: null,
                },
            },
            order_by: 900,
        },
    ],
};

const mockVersions = [
    {
        sNm: 'YOU\'RE NOT THERE',
        aNm: 'Lukas Graham',
        media_id: 400123,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-07-11T20:52:18.957Z',
        dayparts: {},
        order_by: 999,
    },
    {
        sNm: 'IN THE END',
        aNm: 'Linkin Park',
        media_id: 702834,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-07-11T20:52:18.451Z',
        dayparts: {},
        order_by: 90,
    },
    {
        sNm: 'SINCE U BEEN GONE',
        aNm: 'Kelly Clarkson',
        media_id: 789743,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-08-06T21:07:50.122Z',
        dayparts: {},
        order_by: 50,
    },
];

const mockCategoriesList = [
    {
        label: 'A',
        description: 'Power',
        value: 17,
        orderBy: 100,
        group: 'CURRENT',
        groupId: 1,
        limit: 5,
        active: true,
    },
    {
        label: 'B',
        description: 'Sub Power',
        value: 18,
        orderBy: 110,
        group: 'CURRENT',
        groupId: 1,
        limit: 7,
        active: true,
    },
];

const renderDaypartSongsList = (options = {}) => (
    shallow(
        <DaypartSongsList
            handleClose={options.handleClose || (() => {})}
            daypart={options.daypart || mockDaypart}
            versions={options.versions || mockVersions}
            categoriesList={options.categoriesList || mockCategoriesList}
            store={store}
        />,
    ).dive()
);

describe('<DaypartSongsList />', () => {
    it('should render component with all components inside', () => {
        const component = renderDaypartSongsList();
        expect(component.find('.template-song')).toHaveLength(1);
        expect(component.find('.template-song__label')).toHaveLength(1);
        expect(component.find('.template-song__name')).toHaveLength(1);
        expect(component.find('GroupSongs')).toHaveLength(1);
        expect(component.find('SearchSong')).toHaveLength(1);
        expect(component.find('AsideModalControls')).toHaveLength(1);
    });

    it('cancel button should trigger handleClose', () => {
        const mockHandleClose = jest.fn();
        const component = renderDaypartSongsList({ handleClose: mockHandleClose });
        component.find('AsideModalControls').shallow().find('button').at(0)
            .simulate('click');
        expect(mockHandleClose).toHaveBeenCalled();
    });
});
