import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import AlertMultiAction from 'components/AlertMultiAction';

const mockStore = configureStore();
const store = mockStore({
    boardDetails: {
        layout: {
            board: {
                id: 123456,
            },
        },
    },
});
const defaultMockAlert = [{ message: 'test message', category: { label: 'test category' } }];

const renderAlertMultiAction = (options = {}) => (
    shallow(
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
        component.find('TextButton').at(0).simulate('click');
    });

    it('should test component update', () => {
        const component = renderAlertMultiAction({ show: true });
        const shouldUpdate = component.instance().shouldComponentUpdate(
            { alerts: [] },
            { dismissedCategoryAlerts: [] },
        );
        expect(shouldUpdate).toBe(true);
    });

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
