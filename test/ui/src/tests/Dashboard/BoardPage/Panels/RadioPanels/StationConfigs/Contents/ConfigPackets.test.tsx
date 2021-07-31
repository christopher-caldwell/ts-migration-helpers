// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import ConfigPackets from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Contents/ConfigPackets';

const mockPackets = [{
    packet_id: '0',
    name: 'Packet ABCD',
    short_name: 'ABCD',
    type: 'share',
    synchronized: true,
    songs: [{
        mediaId: '708309',
        id: 84851516,
        aNm: 'JONAS BROTHERS',
        sNm: 'Sucker',
        version: '-',
        value: 33,
    }, {
        id: 84851516,
        mediaId: '708309',
        aNm: 'POST MALONE',
        sNm: 'Better Now',
        version: '-',
        value: 33,
    }],
},
{
    packet_id: 35,
    name: 'Packet EFGH',
    short_name: 'EFGH',
    packet_type: 'share',
    synchronized: false,
    songs: [
        {
            media_id: '704376',
            id: 84851666,
            aNm: 'T.I. / Rihanna',
            sNm: 'LIVE YOUR LIFE',
            version: 'Radio Edit',
            value: 33,
        },
        {
            media_id: '829236',
            id: 84851544,
            aNm: 'Jay-Z / Alicia Keys',
            sNm: 'EMPIRE STATE OF MIND',
            version: null,
            value: 33,
        },
    ],
}];

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

const mockPacketsChanges = [
    {
        sId: 84846481,
        sNm: 'COULD YOU BE LOVED',
        aNm: 'Bob Marley & The Wailers',
        media_id: 791573,
        packet_id: 3600,
        restriction_id: null,
        version_name: '-',
        modified_date: '2019-11-19T18:21:14.128Z',
        gs_category: 'H1',
        alternate: {
            241: {
                category_id: 18,
                gs_category: null,
            },
            247: {
                category_id: 18,
                gs_category: null,
            },
        },
        order_by: 900,
        getChanges: {
            actualChanges: {
                packet_id: 3600,
            },
            previousChanges: {
                packet_id: null,
                restriction_id: null,
                category: '',
                alternate: {
                    241: {
                        category_id: 18,
                        gs_category: null,
                    },
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ createPacket: any; packets: any; versions:... Remove this comment to see the full error message
                    247: {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'createPacket' does not exist on type '{}... Remove this comment to see the full error message
                        category_id: 18,
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type '{}'.
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ createPacket: any; packets: any; versions:... Remove this comment to see the full error message
                        gs_category: null,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'createPacket' does not exist on type '{}... Remove this comment to see the full error message
                    },
                },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type '{}'.
            undoneChanges: {},
            isEqualMedia: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type '{}'.
        },
    },
];

const renderConfigPackets = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packetsChanges' does not exist on type '... Remove this comment to see the full error message
    shallow(
        <ConfigPackets
            createPacket={options.createPacket || (() => {})}
            packets={options.packets || mockPackets}
            versions={options.versions || mockVersions}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ createPacket: any; packets: any; versions:... Remove this comment to see the full error message
            packetsChanges={options.packetsChanges || mockPacketsChanges}
        />,
    )
);

describe('<ConfigPackets />', () => {
    it('should render component', () => {
        const component = renderConfigPackets();
        expect(component.find('.station-configs__table-container')).toHaveLength(1);
        expect(component.find('table')).toHaveLength(1);
        expect(component.find('.station-configs__add-action')).toHaveLength(1);
        expect(component.find('.station-configs__input')).toHaveLength(1);
        expect(component.find('.station-configs__button')).toHaveLength(1);
        expect(component.find('.station-configs__error-message')).toHaveLength(1);
    });

    it('should show the sync icon on syncronized column', () => {
        const mockTestPackets = [{
            packet_id: '0',
            name: 'Packet ABCD',
            short_name: 'ABCD',
            synchronized: true,
            songs: [{
                artist: 'JONAS BROTHERS',
                categoryId: 18,
                id: 84851516,
                mediaId: '708309',
                title: 'Sucker',
                version: '-',
                value: 33,
            }],
        }];

        const component = renderConfigPackets({
            packets: mockTestPackets,
        });
        expect(component.find('OverlayTrigger').at(1).props().overlay.props.title).toBe('Synchronized');
    });

    it('should show "no data found" message to station packets', () => {
        const component = renderConfigPackets({
            packets: [],
        });
        expect(component.find('p').at(1).text()).toBe('No data found.');
    });

    it('should have the create packet button disabled', () => {
        const component = renderConfigPackets();
        expect(component.find('p.station-configs__button.disabled')).toHaveLength(1);
    });

    it('should typing a new packet name and do the validation', () => {
        const component = renderConfigPackets();
        component.find('input.station-configs__input').simulate('change', { target: { value: 'New Packet' } });
        expect(component.state().newPacketName).toBe('New Packet');
        expect(component.state().createPacketError).toBe(false);
        expect(component.find('.ml-error-message')).toHaveLength(0);
        expect(component.find('button.station-configs__button').prop('disabled')).toBe(false);
    });

    it('should not allow to create a new packet with a existing name', () => {
        const component = renderConfigPackets();
        component.find('input.station-configs__input').simulate('change', { target: { value: 'Packet ABCD' } });
        expect(component.state().newPacketName).toBe('Packet ABCD');
        expect(component.state().createPacketError).toBe(true);
        expect(component.find('.ml-error-message')).toHaveLength(1);
        expect(component.find('button.station-configs__button').prop('disabled')).toBe(true);
    });

    it('should create a new packet', () => {
        const mockCreatePacket = jest.fn();
        const component = renderConfigPackets({
            createPacket: mockCreatePacket,
        });
        component.find('input.station-configs__input').simulate('change', { target: { value: 'Packet Test' } });
        component.find('button.station-configs__button').simulate('click');
        expect(mockCreatePacket).toHaveBeenCalled();
    });

    it('should open and close the edit packet modal', () => {
        const component = renderConfigPackets();
        component.find('TextButton').at(0).shallow().find('button')
            .simulate('click');
        expect(component.state().editPacketOpened).toBe(true);
        component.find('AsideModal').shallow().find('IconX').simulate('click');
        expect(component.state().editPacketOpened).toBe(false);
    });
});
