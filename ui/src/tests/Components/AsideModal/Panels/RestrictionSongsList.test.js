import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import RestrictionSongsList from 'components/AsideModal/Panels/RestrictionSongsList';

const mockBoardDetails = {
    layout: {
        board: {
            id: 3323404,
            name: 'Z100',
            type: 'RadioBoard',
            config: {
                layout: [
                    { id: 'playlist-overview' },
                    { id: 'musictracker' },
                ],
            },
            callLetters: 'WHTZ-FM',
            format: 'Top 40',
            market: 'New York',
        },
    },
};

const mockRestriction = {
    id: 1,
    stationId: 3323404,
    name: 'Rescriction Name',
    last_update: '2019-07-11T20:52:18.957Z',
    restritionHour: [
        { hour: 1 },
        { hour: 2 },
    ],
    songs: [
        {
            sNm: 'INTO YOU',
            aNm: 'Ariana Grande',
            media_id: 891529,
            packet_id: 34,
            version_name: '-',
            modified_date: '2019-07-11T20:52:18.772Z',
            dayparts: {},
            order_by: 999,
            value: '0',
            restriction_id: 1,
        },
        {
            sNm: 'EVERYTIME WE TOUCH',
            aNm: 'Cascada',
            media_id: 700831,
            packet_id: 34,
            version_name: 'Radio Mix',
            modified_date: '2019-07-11T20:52:18.241Z',
            dayparts: {},
            order_by: 90,
            value: '0',
            restriction_id: 1,
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

const mockStore = configureStore([thunk]);
const store = mockStore({
    boardDetails: mockBoardDetails,
});

const renderRestrictionSong = (options = {}) => (
    shallow(
        <RestrictionSongsList
            store={store}
            handleClose={options.handleClose || (() => { })}
            handleUpdateSongsRestriction={options.handleClose || (() => { })}
            restriction={options.restriction || mockRestriction}
            versions={options.versions || mockVersions}
        />,
    )
).dive();

describe('<RestrictionSongsList />', () => {
    it('should render component with all components inside', () => {
        const component = renderRestrictionSong();
        expect(component.find('.template-song')).toHaveLength(1);
        expect(component.find('GroupSongs')).toHaveLength(1);
        expect(component.find('SearchSong')).toHaveLength(1);
        expect(component.find('AsideModalControls')).toHaveLength(1);
    });

    it('cancel button should trigger handleClose', () => {
        const mockHandleClose = jest.fn();
        const component = renderRestrictionSong({ handleClose: mockHandleClose });
        component.find('AsideModalControls').shallow().find('button').at(0)
            .simulate('click');
        expect(mockHandleClose).toHaveBeenCalled();
    });

    it('should select song after clicking it', done => {
        const component = renderRestrictionSong();
        const searchSong = component.find('SearchSong').shallow();
        const searchField = searchSong.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = searchSong.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.state().restrictionEdited.songs).toHaveLength(2);
            songDetails.find('button').simulate('click');
            expect(component.state().restrictionEdited.songs).toHaveLength(3);
            done();
        }, 600);
    });

    it('save button should trigger handleSave ', done => {
        const mockHandleClose = jest.fn();
        const component = renderRestrictionSong({
            handleClose: mockHandleClose,
        });
        const searchSong = component.find('SearchSong').shallow();
        const searchField = searchSong.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = searchSong.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.state().restrictionEdited.songs).toHaveLength(2);
            songDetails.find('button').simulate('click');
            expect(component.state().restrictionEdited.songs).toHaveLength(3);
            component.find('AsideModalControls').shallow().find('button').at(1)
                .simulate('click');
            expect(mockHandleClose).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('remove button should trigger removeSong', done => {
        const component = renderRestrictionSong();
        const searchSong = component.find('SearchSong').shallow();
        const searchField = searchSong.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = searchSong.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.state().restrictionEdited.songs).toHaveLength(2);
            songDetails.find('button').simulate('click');
            expect(component.state().restrictionEdited.songs).toHaveLength(3);
            component.find('GroupSongs').shallow().find('SongDetails').at(1)
                .shallow()
                .find('button')
                .simulate('click');
            expect(component.state().restrictionEdited.songs).toHaveLength(2);
            done();
        }, 600);
    });
});
