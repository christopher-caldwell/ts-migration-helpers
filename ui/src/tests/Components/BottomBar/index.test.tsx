import React from 'react';
import { shallow } from 'enzyme';
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

const mockStore = configureStore([thunk]);
const store = mockStore({
    musicTrackerOverlay: {
        error: null,
    },
    featureToggle: {
        station: {
            CategoryApprove: {
                FeatureName: 'CategoryApprove',
                Enabled: true,
            },
        },
    },
});

const renderBottomBar = (options = {}) =>
    shallow(
        <BottomBar
            approveBoxAction={mockAction || (() => {})}
            boardId={options.boardId || 3323404}
            categoriesNotFoundOnGselector={options.categoriesNotFoundOnGselector || []}
            closeReviewPage={options.closeReviewPage || (() => {})}
            isReviewOpen={options.isReviewOpen || false}
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
