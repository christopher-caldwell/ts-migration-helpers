import React from 'react';
import { shallow } from 'enzyme';

import ConfirmOverlay from 'components/ConfirmOverlay';

const mockFunction = () => {};

const renderConfirmOverlay = (options = {}) => (
    shallow(
        <ConfirmOverlay
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
