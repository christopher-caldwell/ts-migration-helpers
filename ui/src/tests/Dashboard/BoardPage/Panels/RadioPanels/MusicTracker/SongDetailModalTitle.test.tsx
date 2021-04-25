import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import SongDetailModalTitle from 'components/BoardPage/Panels/RadioPanels/MusicTracker/SongDetailModalTitle';

jest.mock('images/default.png', () => <div className="test-class" />);

const defaultProps = {
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
    onCustomizeBreakout: () => {},
    onCycleSong: () => {},
};

const renderSongDetailModalTitle = (options = {}) => {
    const props = { ...defaultProps, ...options };
    return shallow(
        <SongDetailModalTitle {...props} />,
    );
};

describe('<SongDetailModalTitle />', () => {
    it('it should render component', () => {
        const component = renderSongDetailModalTitle();
        expect(component.find('.music-tracker-detail-header')).toHaveLength(1);
    });


    it('it should handle a next a previos func', () => {
        const mockFunction = jest.fn();
        const component = renderSongDetailModalTitle({ onCycleSong: mockFunction });
        component.find('.music-tracker-song-detail-cycle-arrow').at(0).simulate('click');
        component.find('.music-tracker-song-detail-cycle-arrow').at(1).simulate('click');
        expect(mockFunction).toHaveBeenCalledTimes(2);
    });

    it('it should handle a customize breakout action', () => {
        const mockFunction = jest.fn();
        const component = renderSongDetailModalTitle({ onCustomizeBreakout: mockFunction });
        component.find('Button').at(0).simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });
});
