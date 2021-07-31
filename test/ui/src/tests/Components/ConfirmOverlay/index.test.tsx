import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelAction' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmAction' does not exist on type '{... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmMessage' does not exist on type '... Remove this comment to see the full error message
import ConfirmOverlay from 'components/ConfirmOverlay';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'cancelAction' does not exist on type '{}... Remove this comment to see the full error message
const mockFunction = () => {};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmAction' does not exist on type '{... Remove this comment to see the full error message
const renderConfirmOverlay = (options = {}) => (
    shallow(
        <ConfirmOverlay
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmMessage' does not exist on type '... Remove this comment to see the full error message
            cancelAction={options.cancelAction || mockFunction}
            confirmAction={options.confirmAction || mockFunction}
            confirmMessage={options.confirmMessage}
        />,
    )
);

describe('<ConfirmOverlay />', () => {
    it('should render component', () => {
        const component = renderConfirmOverlay();
        expect(component.find('.confirm-overlay')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(2);
        expect(component.find('.text').text()).toBe('Are you sure you want to confirm the action?');
    });

    it('should shows custom confirm message', () => {
        const component = renderConfirmOverlay({ confirmMessage: 'Test confirm message!' });
        expect(component.find('.text').text()).toBe('Test confirm message!');
    });
});
