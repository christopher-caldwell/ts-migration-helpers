import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PacketSingleSong from 'components/AsideModal/Panels/PacketSingleSong';

const mockAction = jest.fn().mockReturnValue({ type: 'ACTION' });
jest.mock('stores/packets/packetsActions', () => ({
    updateSongsPacket: () => mockAction,
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

const mockPackets = {
    data: [
        {
            packet_id: 1,
            name: 'test packet 1',
            short_name: 't1',
        },
        {
            packet_id: 2,
            name: 'test packet 2',
            short_name: 't2',
        },
    ],
};

const mockSelectedSong = {
    packet_id: 1,
    media_id: 1,
};

const mockSongVersions = {
    data: {
        current: {
            1: [
                {
                    packet_id: 1,
                    media_id: 1,
                },
            ],
            2: [
                {
                    packet_id: 2,
                    media_id: 2,
                },
            ],
            3: [
                {
                    packet_id: 2,
                    media_id: 3,
                },
            ],
            4: [
                {
                    packet_id: 2,
                    media_id: 4,
                },
            ],
        },
        staged: {},
    },
};

const mockStore = configureStore([thunk]);
const store = mockStore({
    boardDetails: mockBoardDetails,
    songVersions: mockSongVersions,
    packets: mockPackets,
});

const renderSinglePacketSong = (options = {}) =>
    shallow(
        <PacketSingleSong
            store={store}
            bottomBarOpen={options.bottomBarOpen || false}
            handleClose={options.handleClose || (() => {})}
            handleUpdateSongsPacket={options.handleUpdateSongsPacket || (() => {})}
            selectedSong={options.selectedSong || mockSelectedSong}
            stagedSongs={options.stagedSongs || []}
        />
    ).dive();

describe('<PacketSingleSong />', () => {
    it('component should render', () => {
        const component = renderSinglePacketSong();
        expect(component.find('.template-song')).toHaveLength(1);
        expect(component.find('SongDetails')).toHaveLength(1);
        expect(component.find('AsideModalControls')).toHaveLength(1);
    });

    it('component should open without a packet selected', () => {
        const component = renderSinglePacketSong({
            selectedSong: {
                packet_id: null,
                media_id: 1,
            },
        });
        expect(component.state().selectedPacket.value).toBe(undefined);
    });

    it('component should open with a packet selected', () => {
        const component = renderSinglePacketSong();
        expect(component.state().selectedPacket.value).toBe(mockSelectedSong.packet_id);
    });

    it('changing the selected packet should work', () => {
        const component = renderSinglePacketSong();
        component.instance().selectPacket({
            value: mockPackets.data[1].packet_id,
            label: mockPackets.data[1].name,
        });
        expect(component.state().selectedPacket.value).toBe(mockPackets.data[1].packet_id);
    });

    it('adding a song to the packet should work', () => {
        mockAction.mockClear();
        const component = renderSinglePacketSong({
            selectedSong: {
                packet_id: null,
                media_id: 1,
            },
        });
        component.instance().selectPacket({
            value: mockPackets.data[0].packet_id,
            label: mockPackets.data[0].name,
        });
        component.instance().handleSave();
        expect(mockAction).toHaveBeenCalled();
    });

    it('removing a song of the packet should work', () => {
        mockAction.mockClear();
        const component = renderSinglePacketSong({
            selectedSong: {
                packet_id: 1,
                media_id: 1,
            },
        });
        expect(component.find('SongDetails')).toHaveLength(1);
        component.instance().handleRemove();
        expect(component.find('SongDetails')).toHaveLength(0);
    });

    it('component should render with multiple songs in the packet', () => {
        const component = renderSinglePacketSong({
            selectedSong: {
                packet_id: 2,
                media_id: 1,
            },
        });
        expect(component.find('.template-song')).toHaveLength(1);
        expect(component.find('SongDetails')).toHaveLength(4);
        expect(component.find('AsideModalControls')).toHaveLength(1);
    });
});
