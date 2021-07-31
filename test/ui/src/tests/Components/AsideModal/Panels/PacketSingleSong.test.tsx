import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; bottomBarOpen: any; handleClos... Remove this comment to see the full error message
            4: [
                {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bottomBarOpen' does not exist on type '{... Remove this comment to see the full error message
                    packet_id: 2,
                    media_id: 4,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type '{}'... Remove this comment to see the full error message
                },
            ],
        },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsPacket' does not exist ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; bottomBarOpen: any; handleClos... Remove this comment to see the full error message
        staged: {},
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedSongs' does not exist on type '{}'... Remove this comment to see the full error message
    },
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'bottomBarOpen' does not exist on type '{... Remove this comment to see the full error message
const mockStore = configureStore([thunk]);
const store = mockStore({
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type '{}'... Remove this comment to see the full error message
    boardDetails: mockBoardDetails,
    songVersions: mockSongVersions,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsPacket' does not exist ... Remove this comment to see the full error message
    packets: mockPackets,
});

const renderSinglePacketSong = (options = {}) =>
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type '{}... Remove this comment to see the full error message
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedSongs' does not exist on type '{}'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; bottomBarOpen: any; handleClos... Remove this comment to see the full error message
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
