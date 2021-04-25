// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

import SongDetails from 'components/AsideModal/Components/SongDetails';

const mockSong = {
    sId: '84876225',
    sNm: 'CLOSER',
    aNm: 'Ne-Yo',
    media_id: 827990,
    packet_id: 34,
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    restriction_id: 1342,
    version_name: '-',
    gs_category: 'H1',
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableClick' does not exist on type '{}... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type '{}'... Remove this comment to see the full error message
    modified_date: '2019-07-11T20:52:18.072Z',
    alternate: {
        240: {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{}'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableClick' does not exist on type '{}... Remove this comment to see the full error message
            category_id: 17,
            gs_category: null,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesList' does not exist on type '... Remove this comment to see the full error message
        },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartId' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'enablePercentage' does not exist on type... Remove this comment to see the full error message
    },
    order_by: 999,
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type '{}'... Remove this comment to see the full error message
const renderSongDetails = (options = {}) => (
    mount(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChangePercentage' does not exist on ty... Remove this comment to see the full error message
        <SongDetails
            song={options.song || mockSong}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'enableAlternateCategory' does not exist ... Remove this comment to see the full error message
            disableClick={options.disableClick || false}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesList' does not exist on type '... Remove this comment to see the full error message
            enablePercentage={options.enablePercentage || false}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartId' does not exist on type '{}'.
            handleClick={options.handleClick || (() => {})}
            icon={options.icon || 'fa-plus'}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            onChangePercentage={options.onChangePercentage || (() => {})}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            enableAlternateCategory={options.enableAlternateCategory || false}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            categoriesList={options.categoriesList || []}
            daypartId={options.daypartId}
        />,
    )
// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
);

describe('<SongDetails />', () => {
    it('should render component', () => {
        const component = renderSongDetails();
        expect(component.find('.song-details')).toHaveLength(1);
        expect(component.find('p').at(0).text()).toBe('CLOSER');
        expect(component.find('p').at(1).text()).toBe('Ne-Yo ');
        expect(component.find('button')).toHaveLength(1);
        expect(component.find('i')).toHaveLength(1);
        expect(component.find('Select')).toHaveLength(0);
    });

    it('should render a song with version', () => {
        const mockSongResult = {
            sNm: 'CLOSER',
            aNm: 'Ne-Yo',
            media_id: 827990,
            packet_id: 34,
            version_name: 'Radio Edit',
            modified_date: '2019-07-11T20:52:18.072Z',
            dayparts: {},
            order_by: 999,
            value: '0',
        };
        const component = renderSongDetails({ song: mockSongResult });
        expect(component.find('p').at(1).text()).toBe('Ne-Yo | Radio Edit');
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    it('should test onClick', () => {
        const mockFunction = jest.fn();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        const component = renderSongDetails({
            handleClick: mockFunction,
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        component.find('button').simulate('click');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should have default handleClick', () => {
        SongDetails.defaultProps.handleClick();
        expect(SongDetails.defaultProps.handleClick).toBeDefined();
    });

    it('should have default onChangePercentage', () => {
        SongDetails.defaultProps.onChangePercentage();
        expect(SongDetails.defaultProps.onChangePercentage).toBeDefined();
    });

    it('should call plus onClick', () => {
        const mockOnChangePercentage = jest.fn();
        const component = renderSongDetails({
            enablePercentage: true,
            onChangePercentage: mockOnChangePercentage,
        });
        component.find('.btn-plus').simulate('click');
        expect(mockOnChangePercentage).toHaveBeenCalled();
    });

    it('should call minus onClick', () => {
        const mockOnChangePercentage = jest.fn();
        const component = renderSongDetails({
            enablePercentage: true,
            onChangePercentage: mockOnChangePercentage,
        });
        component.find('.btn-minus').simulate('click');
        expect(mockOnChangePercentage).toHaveBeenCalled();
    });

    it('should numberInput set to 0 when number is less then 0', () => {
        const mockOnChangePercentage = jest.fn();
        const component = renderSongDetails({
            enablePercentage: true,
            onChangePercentage: mockOnChangePercentage,
        });
        component.find('.percentage__field').simulate('change', { target: { value: '-1' } });
        expect(mockOnChangePercentage).toHaveBeenCalledWith('0', mockSong.media_id);
    });

    it('should numberInput set to 100 when number is greater then 100', () => {
        const mockOnChangePercentage = jest.fn();
        const component = renderSongDetails({
            enablePercentage: true,
            onChangePercentage: mockOnChangePercentage,
        });
        component.find('.percentage__field').simulate('change', { target: { value: '200' } });
        expect(mockOnChangePercentage).toHaveBeenCalledWith('100', mockSong.media_id);
    });

    it('should set value equal 0 when input is empty', () => {
        const mockOnChangePercentage = jest.fn();
        const component = renderSongDetails({
            enablePercentage: true,
            onChangePercentage: mockOnChangePercentage,
        });
        component.find('.percentage__field').simulate('change', { type: 'blur', target: { value: '' } });
        expect(mockOnChangePercentage).toHaveBeenCalledWith('0', mockSong.media_id);
    });

    it('should have Alternate Category enabled', () => {
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
        const component = renderSongDetails({
            enableAlternateCategory: true,
            categoriesList: mockCategoriesList,
            daypartId: 240,
        });
        expect(component.find('Select')).toHaveLength(1);
        expect(component.find('span.Select-value-label').text()).toBe('A');
    });
});
