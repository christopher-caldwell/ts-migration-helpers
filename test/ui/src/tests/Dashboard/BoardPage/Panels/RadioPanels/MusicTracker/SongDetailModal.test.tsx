import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prop' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prop' implicitly has an 'any' type.
import configureStore from 'redux-mock-store';
import SongDetailModal from 'components/BoardPage/Panels/RadioPanels/MusicTracker/SongDetailModal';

const mockStore = configureStore([thunk]);
jest.mock('images/default.png', () => <div className="test-class" />);

const createMockStore = {
    boardDetails: {
        // @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
        get: prop => createMockStore.boardDetails[prop],
        fetching: false,
        error: null,
        filters: {
            applied: {
                dateRange: {
                    startDate: '2019-05-19',
                    endDate: '2019-05-25',
                    period: 'weekly',
                    type: 'airplay',
                },
                overview: {
                    gcr: 'current,recurrent',
                    daypart: '6am7pm',
                },
                options: {
                    sort: {
                        key: 'enhanced.pop.rnk',
                        field: 'enhanced_pop_rank',
                        defaultSort: true,
                        ascending: true,
                    },
                    hasTAA: true,
                },
                competitors: [

                ],
            },
        },
        layout: {
            board: {
                id: 3323404,
                name: 'Z100',
                type: 'RadioBoard',
                background: '',
                avatar: '//i.iheart.com/v3/re/assets/images/1469.png',
                config: {
                    layout: [
                        {
                            id: 'musictracker',
                            name: 'Music Tracker',
                            order: 1,
                            rows: [
                                {
                                    columns: [
                                        {
                                            size: 12,
                                            panels: [
                                                'MusicTracker',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                meta: {
                    latestBreakoutDate: '2019-05-19T00:00:00.000Z',
                },
                loading: false,
            },
            activeId: 'musictracker',
            activeIndex: 1,
            activeLayout: [
                {
                    columns: [
                        {
                            size: 12,
                            panels: [

                            ],
                        },
                    ],
                },
                {
                    columns: [
                        {
                            size: 12,
                            panels: [
                                'MusicTracker',
                            ],
                        },
                    ],
                },
            ],
        },
    },
    breakout: {
        data: {
            id: 717339768,
            name: '',
            artist: '',
            avatar: '',
            rank: {
                corePop: {
                    thisPeriod: 0,
                    lastPeriod: 1,
                },
                totalPop: {
                    thisPeriod: 0,
                    lastPeriod: 1,
                },
            },
        },
        loading: false,
    },
    breakoutPreferences: {
        loading: false,
        error: null,
    },
};

const defaultProps = {
    songs: [
        {
            sId: 84879718,
            metadata: {
                sNm: 'Toxic',
                aNm: 'BRITNEY SPEARS',
                sRlseDate: '2003-11-10',
            },
        },
        {
            sId: 717339768,
            metadata: {
                sNm: 'Sucker',
                aNm: 'JONAS BROTHERS',
                sRlseDate: '2019-03-01',
            },
        },
        {
            sId: 446779556,
            metadata: {
                sNm: 'Eastside',
                aNm: 'BENNY BLANCO, HALSEY & KHALID',
                sRlseDate: '2018-07-01',
            },
        },
    ],
    selectedSongId: 717339768,
    onClose: () => {},
    onCustomizeBreakout: () => {},
    setNewSelectedSong: () => {},
    store: mockStore(createMockStore),
    onSelectedSong: () => {},
};

const renderSongDetailModal = (options = {}) => {
    const props = { ...defaultProps, ...options };
    return shallow(
        <SongDetailModal {...props} />,
    );
};

describe('<SongDetailModal />', () => {
    it('it should renderTrackVertical properties', () => {
        const component = mount(
            <SongDetailModal {...defaultProps} />,
        );
        expect(component.find('SongDetailModal').exists()).toEqual(true);
    });

    it('it should render component', () => {
        const component = renderSongDetailModal().dive();
        expect(component.find('.music-tracker-detail-modal').exists()).toEqual(true);
    });

    it('it cannot render component', () => {
        const component = renderSongDetailModal({ selectedSongId: null });
        expect(component.find('.music-tracker-detail-modal').exists()).toEqual(false);
    });

    it('it should render a next and previuos song', () => {
        const component = renderSongDetailModal();
        const currentInstance = component.dive();
        const { onCycleSong } = currentInstance.find('SongDetailModalTitle').props();
        const mockFn = jest.fn(onCycleSong);
        mockFn(717339768, 'next');
        mockFn(446779556, 'prev');
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('it should call a function afer close modal', () => {
        const mockFunc = jest.fn();
        const component = renderSongDetailModal({ onClose: mockFunc }).dive();
        component.find('.music-tracker-detail-modal').simulate('hide');
        expect(mockFunc).toHaveBeenCalled();
    });
});
