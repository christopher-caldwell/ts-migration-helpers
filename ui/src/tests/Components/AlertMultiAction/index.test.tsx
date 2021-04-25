import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ alerts: any; show: any; messageText: any; ... Remove this comment to see the full error message
import AlertMultiAction from 'components/AlertMultiAction';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type '{}'.
const mockStore = configureStore();
// @ts-expect-error ts-migrate(2339) FIXME: Property 'messageText' does not exist on type '{}'... Remove this comment to see the full error message
const store = mockStore({
    boardDetails: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alertType' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ alerts: any; show: any; messageText: any; ... Remove this comment to see the full error message
        layout: {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'alerts' does not exist on type '{}'.
            board: {
                id: 123456,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type '{}'.
            },
        },
    },
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'messageText' does not exist on type '{}'... Remove this comment to see the full error message
const defaultMockAlert = [{ message: 'test message', category: { label: 'test category' } }];

const renderAlertMultiAction = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ alerts: any; show: any; messageText: any; ... Remove this comment to see the full error message
        <AlertMultiAction
            alerts={options.alerts || defaultMockAlert}
            show={options.show}
            messageText={options.messageText || null}
            alertType={options.alertType || 'warning'}
            store={store}
        />,
    ).dive()
);

describe('<AlertMultiAction />', () => {
    it('should render component', () => {
        const component = renderAlertMultiAction({ show: true });
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'mockAlert' implicitly has type 'any[]' i... Remove this comment to see the full error message
        expect(component.find('.alert-multi-action__box')).toHaveLength(1);
    });

    it('component should not be rendered', () => {
        const component = renderAlertMultiAction({ show: false });
        expect(component.find('div')).toHaveLength(0);
    });

    it('title should be rendered correctly', () => {
        const component = renderAlertMultiAction({ show: true });
        component.update();
        expect(component.find('p').text())
            .toBe('Review or dismiss the following warnings before proceeding.');
    });

    it('should test onClick', () => {
        const component = renderAlertMultiAction({ show: true });
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'mockAlert' implicitly has type 'any[]' i... Remove this comment to see the full error message
        component.find('TextButton').at(0).simulate('click');
    });

    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'mockAlert' implicitly has an 'any[]' typ... Remove this comment to see the full error message
    it('should test component update', () => {
        const component = renderAlertMultiAction({ show: true });
        const shouldUpdate = component.instance().shouldComponentUpdate(
            { alerts: [] },
            { dismissedCategoryAlerts: [] },
        );
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'mockAlert' implicitly has type 'any[]' i... Remove this comment to see the full error message
        expect(shouldUpdate).toBe(true);
    });

    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'mockAlert' implicitly has an 'any[]' typ... Remove this comment to see the full error message
    it('should not render warning alerts', () => {
        const mockAlert = [];
        const component = renderAlertMultiAction({ alerts: mockAlert });
        expect(component.find('.alert-multi-action__body__message')).toHaveLength(0);
    });

    it('should render warning alerts with the correct messages', () => {
        const mockAlert = [
            {
                message: 'test message',
                category: { label: 'test category' },
            },
            {
                message: 'test message 2',
                category: { label: 'test category 2' },
            },
        ];
        const component = renderAlertMultiAction({ alerts: mockAlert });
        expect(component.find('.alert-multi-action__body__message')).toHaveLength(2);
    });

    it('should render only a single custom message', () => {
        const component = renderAlertMultiAction({
            messageText: 'Single custom message.',
            alerts: [],
        });
        expect(component.find('p').text()).toBe('Single custom message.');
        expect(component.find('.alert-multi-action__body')).toHaveLength(0);
    });

    it('should render an error icon alert', () => {
        const component = renderAlertMultiAction({
            messageText: 'Single custom message.',
            alerts: [],
            alertType: 'error',
        });
        expect(component.find('.alert-multi-action__box--error')).toHaveLength(1);
        expect(component.find('.fa-times-circle')).toHaveLength(1);
        expect(component.find('p').text()).toBe('Single custom message.');
    });
});
