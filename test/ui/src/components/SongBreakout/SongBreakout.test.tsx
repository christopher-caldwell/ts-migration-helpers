import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount, shallow } from 'enzyme';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import BreakoutWithModal, { SongBreakout } from './SongBreakout.component';
import Modal from '../Modal';
import SongBar from './SongBar';
import RankSpinsBar from './RankSpinsBar';
import BreakoutTable from './BreakoutTable';
import TabsBar from './TabsBar';

test('modal and song breakout output', () => {
    const component = shallow(<BreakoutWithModal {...props} />);
    expect(component).toBeDefined();
    expect(component.find(Modal)).toHaveLength(1);
    expect(component.find(SongBreakout)).toHaveLength(1);
});

test('song breakout output without modal', () => {
    const component = shallow(<SongBreakout {...props} />);
    expect(component.find('div.breakout')).toHaveLength(1);
    expect(component.find(SongBar)).toHaveLength(1);
    expect(component.find(RankSpinsBar)).toHaveLength(1);
    expect(component.find(BreakoutTable)).toHaveLength(1);

    // when loading
    component.setProps({ dataLoading: true });
    expect(component.find('div.breakout')).toHaveLength(1);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'comp' implicitly has an 'any' type.
    expect(component.find(LoadingIndicator)).toHaveLength(1);
    expect(component.find(RankSpinsBar)).toHaveLength(0);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
    expect(component.find(BreakoutTable)).toHaveLength(0);
});

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'comp' implicitly has an 'any' type.
test('when breakouts are empty, send to song bar disabled variables', () => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
    const component = shallow(<SongBreakout {...props} />);
    const tabButtons = comp => comp.find(SongBar).dive().find(TabsBar).dive().find('button.tab');
    tabButtons(component).forEach(tab => expect(tab.prop('disabled')).toBeFalsy());
    component.setProps({ callout: { breakouts: {} } });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
    expect(tabButtons(component).at(0).prop('disabled')).toBeTruthy();
    expect(tabButtons(component).at(1).prop('disabled')).toBeFalsy();
    component.setProps({ omt: { breakouts: {} }, callout: { breakouts: { test: {} } } });
    expect(tabButtons(component).at(0).prop('disabled')).toBeFalsy();
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
    expect(tabButtons(component).at(1).prop('disabled')).toBeTruthy();
    component.setProps({ omt: { breakouts: {} }, callout: { breakouts: {} } });
    tabButtons(component).forEach(tab => expect(tab.prop('disabled')).toBeTruthy());
});

test('song has no breakouts available', () => {
    const contextProps = {
        ...props,
        callout: { ...props.callout, breakouts: {} },
        omt: { ...props.omt, breakouts: {} },
    };
    const component = mount(<SongBreakout {...contextProps} />);
    expect(component.find('div.breakout')).toHaveLength(1);
    expect(component.find(SongBar)).toHaveLength(1);
    expect(component.find('div.noBreakouts')).toHaveLength(1);
});

const props = {
    songOrder: [654321, 123456, 4567869],
    selectedSongId: 123456,
    songs: [
        {
            sId: 123456,
            metadata: { aNm: 'Artist Name 1', sNm: 'Song Name 1' },
            metrics: {
                callout: {
                    pop: {
                        cRnk: 1,
                        tRnk: 2,
                    },
                },
                spins: {},
            },
        },
        {
            sId: 4567869,
            metadata: { aNm: 'Artist Name 2', sNm: 'Song Name 2' },
            metrics: {
                callout: {
                    pop: {
                        cRnk: 1,
                        tRnk: 2,
                    },
                },
                spins: {},
            },
        },
    ],
    onClose: jest.fn(),
    avatar: 'image.src',
    callout: {
        breakouts: { 'Test Breakout Name': { POP: 12 } },
        rank: { corePop: 22, totalPop: 22 },
    },
    omt: {
        breakouts: { 'Test Breakout Name': { POP: 22 } },
        rank: { corePop: 22, totalPop: 22 },
    },
    spins: {
        '6a12m': 1234,
        '24hr': 4567,
        totalMrkt: 123456,
        totalStn: 789456,
    },
    dataLoading: false,
    getSongDetails: jest.fn(),
    calloutPrefs: ['TOTAL', 'CORE (WHTZ)', 'HISPANIC'],
    omtPrefs: ['Total', 'omt core', 'omt hispanic'],
    getBreakoutPrefs: jest.fn(),
    omtData: {
        '123456_123456': {
            songId: 123465,
        },
        '123456_12321': {
            songId: 123421,
        },
    },
};
