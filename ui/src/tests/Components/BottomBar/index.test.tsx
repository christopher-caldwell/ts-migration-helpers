import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BottomBar from 'components/BottomBar';

const mockAction = jest.fn().mockReturnValue({ type: 'ACTION' });

jest.mock('stores/musicTrackerOverlay/musicTrackerOverlayActions', () => ({
    openOverlay: mockAction,
}));

jest.mock('stores/musicTrackerOverlay/musicTrackerOverlayActions', () => ({
    approveBox: mockAction,
}));

// @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type '{}'.
const mockStore = configureStore([thunk]);
const store = mockStore({
    musicTrackerOverlay: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesNotFoundOnGselector' does not ... Remove this comment to see the full error message
        error: null,
    },
    featureToggle: {
        station: {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeReviewPage' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type '{}'.
            CategoryApprove: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSaveAndReview' does not exist on type ... Remove this comment to see the full error message
                FeatureName: 'CategoryApprove',
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableApprove' does not exist on type '... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesNotFoundOnGselector' does not ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipMessage' does not exist on type '... Remove this comment to see the full error message
                Enabled: true,
            },
        },
    },
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipType' does not exist on type '{}'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'closeReviewPage' does not exist on type ... Remove this comment to see the full error message
const renderBottomBar = (options = {}) =>
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isReviewOpen' does not exist on type '{}... Remove this comment to see the full error message
        <BottomBar
            approveBoxAction={mockAction || (() => {})}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSaveAndReview' does not exist on type ... Remove this comment to see the full error message
            boardId={options.boardId || 3323404}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableApprove' does not exist on type '... Remove this comment to see the full error message
            categoriesNotFoundOnGselector={options.categoriesNotFoundOnGselector || []}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'overlayError' does not exist on type '{}... Remove this comment to see the full error message
            closeReviewPage={options.closeReviewPage || (() => {})}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipMessage' does not exist on type '... Remove this comment to see the full error message
            isReviewOpen={options.isReviewOpen || false}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltipType' does not exist on type '{}'... Remove this comment to see the full error message
            openOverlayAction={mockAction}
            onSaveAndReview={options.onSaveAndReview || (() => {})}
            disableApprove={options.disableApprove || false}
            overlayError={options.overlayError || null}
            tooltipMessage={options.tooltipMessage || null}
            tooltipType={options.tooltipType || 'warning'}
            store={store}
        />
    ).dive();

describe('<BottomBar />', () => {
    it('should render component', () => {
        const component = renderBottomBar();
        expect(component.find('.cat-bottom-bar')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(2);
        expect(component.find('button').at(0).text()).toBe('Cancel');
        expect(component.find('button').at(1).text()).toBe('Save and Review');
    });

    it('should have Review Page opened', () => {
        const component = renderBottomBar({ isReviewOpen: true });
        expect(component.find('button').at(0).text()).toBe('Back');
        expect(component.find('button').at(1).text()).toBe('Approve');
    });

    it('should have Approve button disabled', () => {
        const component = renderBottomBar({ isReviewOpen: true, disableApprove: true });
        expect(component.find('button').at(1).prop('disabled')).toBeTruthy();
    });

    it('should have Approve button disabled with a custom tooltip error message', () => {
        const component = renderBottomBar({
            isReviewOpen: true,
            disableApprove: true,
            tooltipMessage: 'Disabled tooltip custom message.',
            tooltipType: 'error',
        });
        expect(component.find('button.bottom-bar-disable')).toHaveLength(1);
        expect(component.find('OverlayTrigger')).toHaveLength(1);
        expect(component.find('OverlayTrigger').props().overlay.props.message).toBe(
            'Disabled tooltip custom message.'
        );
        expect(component.find('OverlayTrigger').props().overlay.props.type).toBe('error');
        expect(component.find('OverlayTrigger').props().overlay.props.title).toBe('IMPORTANT');
    });

    it('should have Approve button disabled with one category that does not exist on gSelector', () => {
        const component = renderBottomBar({
            isReviewOpen: true,
            categoriesNotFoundOnGselector: ['Z'],
        });
        expect(component.find('button.bottom-bar-disable')).toHaveLength(1);
        expect(component.find('OverlayTrigger')).toHaveLength(1);
        expect(
            component
                .find('OverlayTrigger')
                .props()
                .overlay.props.message.includes(
                    'The following category is missing in GSelector: Z.'
                )
        ).toBeTruthy();
    });

    it('should have Approve button disabled with MORE THEN ONE category that does not exist on gSelector', () => {
        const component = renderBottomBar({
            isReviewOpen: true,
            categoriesNotFoundOnGselector: ['X', 'Y', 'Z'],
        });
        expect(component.find('button.bottom-bar-disable')).toHaveLength(1);
        expect(component.find('OverlayTrigger')).toHaveLength(1);
        expect(
            component
                .find('OverlayTrigger')
                .props()
                .overlay.props.message.includes(
                    'The following categories are missing in GSelector: X, Y and Z.'
                )
        ).toBeTruthy();
    });

    it('should handle onSaveAndReview', () => {
        const mockOnSaveAndReview = jest.fn();
        const component = renderBottomBar({
            onSaveAndReview: mockOnSaveAndReview,
        });
        component.find('button').at(1).simulate('click');
        expect(mockOnSaveAndReview).toHaveBeenCalled();
    });

    it('should handle closeReviewPage ', () => {
        const mockCloseReviewPage = jest.fn();
        const component = renderBottomBar({
            isReviewOpen: true,
            closeReviewPage: mockCloseReviewPage,
        });
        component.find('button').at(0).simulate('click');
        expect(mockCloseReviewPage).toHaveBeenCalled();
    });

    it('should handle openOverlayAction ', () => {
        const component = renderBottomBar();
        component.find('button').at(0).simulate('click');
        expect(mockAction).toHaveBeenCalled();
    });

    it('should handle approveBoxAction ', () => {
        const component = renderBottomBar({ isReviewOpen: true });
        component.find('button').at(1).simulate('click');
        expect(mockAction).toHaveBeenCalled();
    });
});
