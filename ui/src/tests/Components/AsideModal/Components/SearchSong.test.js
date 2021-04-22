import React from 'react';
import { shallow } from 'enzyme';

import SearchSong from 'components/AsideModal/Components/SearchSong';

const mockTemplate = {
    packet_id: 34,
    name: 'Packet ABCD',
    synchronized: true,
    short_name: 'ABCD',
    packet_type: 'SHARE',
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

const renderSearchSong = (options = {}) => (
    shallow(
        <SearchSong
            canAddValidation={options.canAddValidation || (() => true)}
            template={options.template || mockTemplate}
            versions={options.versions || mockVersions}
            handleClick={options.handleClick || (() => {})}
            handleResetClickedSong={options.handleResetClickedSong || (() => {})}
        />,
    )
);

describe('<SearchSong />', () => {
    it('should render component', () => {
        const component = renderSearchSong();
        expect(component.find('.search-song')).toHaveLength(1);
        expect(component.find('SeachField')).toHaveLength(1);
    });

    it('search should trigger search results', done => {
        const component = renderSearchSong();
        const searchField = component.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            const songDetails = component.find('SongDetails').shallow();
            expect(songDetails.find('.song-details')).toHaveLength(1);
            expect(component.find('p').text()).toBe('1 Result ');
            done();
        }, 600);
    });

    it('should have the result label in plural', done => {
        const component = renderSearchSong();
        const searchField = component.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'IN' } });
        setTimeout(() => {
            expect(component.find('SongDetails')).toHaveLength(2);
            expect(component.find('p').text()).toBe('2 Results ');
            done();
        }, 600);
    });

    it('search should trigger search without value', done => {
        const component = renderSearchSong();
        const searchField = component.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: '' } });
        setTimeout(() => {
            expect(component.find('SongDetails').exists()).toBeFalsy();
            expect(component.state().songsResult).toHaveLength(0);
            done();
        }, 600);
    });

    it('should reset search when the reset button is called', done => {
        const mockHandleResetClickedSong = jest.fn();
        const component = renderSearchSong({ handleResetClickedSong: mockHandleResetClickedSong });
        const searchField = component.find('SeachField').shallow();
        searchField.find('input').simulate('change', { target: { value: 'END' } });
        setTimeout(() => {
            searchField.find('IconX').simulate('click');
            expect(mockHandleResetClickedSong).toHaveBeenCalled();
            done();
        }, 600);
    });

    it('should have default handleClick', () => {
        SearchSong.defaultProps.handleClick();
        expect(SearchSong.defaultProps.handleClick).toBeDefined();
    });

    it('should have default handleResetClickedSong', () => {
        SearchSong.defaultProps.handleResetClickedSong();
        expect(SearchSong.defaultProps.handleResetClickedSong).toBeDefined();
    });
});
