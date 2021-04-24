import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PacketSongsList from 'components/AsideModal/Panels/PacketSongsList';

jest.mock('stores/packets/packetsActions', () => ({
    updateSongsPacket: () => ({ type: 'PACKET_PENDING' }),
}));

const mockBoardDetails = {
    layout: {
        board: {
            id: 3323404,
            name: 'Z100',
            type: 'RadioBoard',
            config: {
                layout: [{ id: 'playlist-overview' }, { id: 'musictracker' }],
            },
            callLetters: 'WHTZ-FM',
            format: 'Top 40',
            market: 'New York',
        },
    },
};

const mockPacket = {
    packet_id: 34,
    name: 'Packet ABCD',
    synchronized: true,
    short_name: 'ABCD',
    packet_type: 'SHARE',
    modified_date: '2019-07-11 20:52:18',
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
        },
    ],
};

const mockVersions = [
    {
        sNm: "YOU'RE NOT THERE",
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

const renderPacketSong = (options = {}) =>
    shallow(
        <PacketSongsList
            store={store}
            handleClose={options.handleClose || (() => {})}
            packet={options.packet || mockPacket}
            versions={options.versions || mockVersions}
        />
    ).dive();

describe('<PacketSongsList />', () => {
    it('should render component with all components inside', () => {
        const component = renderPacketSong();
        expect(component.find('.template-song')).toHaveLength(1);
        expect(component.find('.template-song__label')).toHaveLength(2);
        expect(component.find('.template-song__name')).toHaveLength(2);
        expect(component.find('GroupSongs')).toHaveLength(1);
        expect(component.find('SearchSong')).toHaveLength(1);
        expect(component.find('AsideModalControls')).toHaveLength(1);
    });

    it('cancel button should trigger handleClose', () => {
        const mockHandleClose = jest.fn();
        const component = renderPacketSong({ handleClose: mockHandleClose });
        component.find('AsideModalControls').shallow().find('button').at(0).simulate('click');
        expect(mockHandleClose).toHaveBeenCalled();
    });

    it('should select song after clicking it', done => {
        const component = renderPacketSong();
        const searchSong = component.find('SearchSong').shallow();
        const searchField = searchSong.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = searchSong.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.state().packetEdited.songs).toHaveLength(2);
            songDetails.find('button').simulate('click');
            expect(component.state().packetEdited.songs).toHaveLength(3);
            done();
        }, 600);
    });

    it('save button should trigger handleSave ', done => {
        const mockHandleClose = jest.fn();
        const component = renderPacketSong({
            handleClose: mockHandleClose,
        });
        const searchSong = component.find('SearchSong').shallow();
        const searchField = searchSong.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = searchSong.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.state().packetEdited.songs).toHaveLength(2);
            songDetails.find('button').simulate('click');
            expect(component.state().packetEdited.songs).toHaveLength(3);
            component.find('AsideModalControls').shallow().find('button').at(1).simulate('click');
            expect(mockHandleClose).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('remove button should trigger removeSongPacket', done => {
        const component = renderPacketSong();
        const searchSong = component.find('SearchSong').shallow();
        const searchField = searchSong.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = searchSong.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.state().packetEdited.songs).toHaveLength(2);
            songDetails.find('button').simulate('click');
            expect(component.state().packetEdited.songs).toHaveLength(3);
            component
                .find('GroupSongs')
                .shallow()
                .find('SongDetails')
                .at(1)
                .shallow()
                .find('button.btn-text')
                .simulate('click');
            expect(component.state().packetEdited.songs).toHaveLength(2);
            done();
        }, 600);
    });

    it('should show the complete packet name', () => {
        const component = renderPacketSong();
        expect(component.find('.template-song__name').at(0).text()).toBe('ABCD - Packet ABCD');
    });

    it('should show the last modified date', () => {
        const component = renderPacketSong();
        expect(component.find('.template-song__name').at(1).text()).toBe('07/11/19 8:52:18 PM');
    });

    it('should show the packet name with only the short name', () => {
        const mockPacketTest = {
            packet_id: 34,
            name: '',
            synchronized: true,
            short_name: 'ABCD',
            packet_type: 'SHARE',
            songs: [],
        };
        const component = renderPacketSong({ packet: mockPacketTest });
        expect(component.find('.template-song__name').at(0).text()).toBe('ABCD');
    });

    it('should show the packet name with only the long name', () => {
        const mockPacketTest = {
            packet_id: 34,
            name: 'Packet ABCD',
            synchronized: true,
            short_name: '',
            packet_type: 'SHARE',
            songs: [],
        };
        const component = renderPacketSong({ packet: mockPacketTest });
        expect(component.find('.template-song__name').at(0).text()).toBe('Packet ABCD');
    });

    it('should change the percentage value when the media_id exists', () => {
        const component = renderPacketSong();
        component.instance().setSongPercentage('51', 891529);
        expect(component.state().packetEdited.songs[0].value).toBe('51');
    });

    it('should not change the percentage value when the media_id does not exist', () => {
        const component = renderPacketSong();
        component.instance().setSongPercentage('22', 2000000);
        expect(component.state().packetEdited.songs[0].value).toBe('0');
    });
});
