import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

import SongOverview from 'components/Director/Contents/SongOverview';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';

// unit tests
const mockStore = configureStore([thunk]);

test('should render song table when there are songs', () => {
    const store = mockStore({
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
        songs: {
            data: [
                {
                    title: 'hello', artist: 'him', version: 'original', number: 123456,
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
                },
                {
                    title: 'goodbye', artist: 'her', version: 'Radio Edit', number: 123456,
                },
            ],
            loading: false,
            error: null,
            count: 2,
        },
    });
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    const component = shallow(<SongOverview store={store} selectedSong={(() => {})} />);
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    expect(component.dive().find('.music-point-table')).toHaveLength(1);
    expect(component.dive().find('.musicpoint-table-header')).toHaveLength(1);
    expect(component.dive().find('.musicpoint-table-ul')).toHaveLength(1);
});

test('should render loading indicator when loading is true', () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    const store = mockStore({
        songs: {
            data: [
                {
                    title: 'hello', artist: 'him', version: 'original', number: 412393,
                },
                {
                    title: 'goodbye', artist: 'her', version: 'Radio Edit', number: 412157,
                },
            ],
            loading: true,
            error: null,
            count: 2,
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
        },
    });
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    const component = shallow(<SongOverview store={store} selectedSong={(() => {})} />);
    expect(component.dive().contains(<LoadingIndicator />)).toBeTruthy();
});

test('should render no songs message when count is 0', () => {
    const store = mockStore({
        songs: {
            data: [],
            loading: false,
            error: null,
            count: 0,
        },
    });
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    const component = shallow(<SongOverview store={store} selectedSong={(() => {})} />);
    expect(component.dive()
        .containsMatchingElement(<h4 className="musicpoint-table-header">No songs to display</h4>)).toBeTruthy();
});

test('should render error message if error is not null', () => {
    const store = mockStore({
        songs: {
            data: [
                {
                    title: 'hello', artist: 'him', version: 'original', number: 412393,
                },
                {
                    title: 'goodbye', artist: 'her', version: 'Radio Edit', number: 412157,
                },
            ],
            loading: false,
            error: 'Something is wrong!',
            count: 0,
        },
    });
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ store: any; selectedSong: () => void; }' i... Remove this comment to see the full error message
    const component = shallow(<SongOverview store={store} selectedSong={(() => {})} />);
    expect(component.dive().contains(
        <div className="music-point-table">
            <h4 className="musicpoint-table-header">
                An error occured, please try again or contact your administrator.
            </h4>
        </div>,
    )).toBeTruthy();
});
