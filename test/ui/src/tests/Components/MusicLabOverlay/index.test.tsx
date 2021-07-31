// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
import MusicLabOverlay from 'components/MusicLabOverlay';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
const mockStore = configureStore([thunk]);
const store = mockStore({
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showConfirm' does not exist on type '{}'... Remove this comment to see the full error message
    closeOverlayAction: () => {},
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type '{}'.
const mockOverlayAction = jest.fn().mockReturnValue({ type: 'OVERLAY_ACTION' });

jest.mock('stores/musicTrackerOverlay/musicTrackerOverlayActions', () => ({
    closeOverlay: mockOverlayAction,
}));

const renderMusicLabOverlay = (options = {}) =>
    shallow(
        <MusicLabOverlay
            loading={options.loading || false}
            showConfirm={options.showConfirm || false}
            error={options.error || false}
            store={store}
        />
    );

describe('<MusicLabOverlay />', () => {
    it('should render component in loading state', () => {
        const component = renderMusicLabOverlay({ loading: true }).shallow();
        expect(component.find('.musiclab-overlay')).toHaveLength(1);
        expect(component.find('.musiclab-overlay-content')).toHaveLength(1);
    });

    it('should render component in confirm state', () => {
        const component = renderMusicLabOverlay({ loading: false, showConfirm: true }).shallow();
        expect(component.find('.musiclab-overlay')).toHaveLength(1);
        expect(component.find('.fa-exclamation')).toHaveLength(1);
        expect(component.find('.btn-primary')).toHaveLength(2);
    });

    it('should render response page and back to music tracker button', () => {
        const component = renderMusicLabOverlay({ loading: false, showConfirm: false }).shallow();
        const errorComponent = renderMusicLabOverlay({
            loading: false,
            showConfirm: false,
            error: true,
        }).shallow();

        expect(component.find('.musiclab-overlay')).toHaveLength(1);
        expect(component.find('.btn-primary')).toHaveLength(1);
        expect(component.find('.fa-check')).toHaveLength(1);
        expect(errorComponent.find('.fa-exclamation')).toHaveLength(1);
    });
});
