import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MusicLabOverlay from 'components/MusicLabOverlay';

const mockStore = configureStore([thunk]);
const store = mockStore({
    closeOverlayAction: () => {},
});
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
