import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeStep' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeStep' does not exist on type '{}'.

import StepBar from 'components/StepBar';

const renderStepBar = (options = {}) => (
    shallow(
        <StepBar
            activeStep={options.activeStep || 0}
            steps={[
                {
                    title: 'Select Stations',
                },
                {
                    title: 'Select Category',
                },
                {
                    title: 'Reconcile Songs',
                },
            ]}
        />,
    )
);

describe('<StepBar />', () => {
    it('should render component', () => {
        const component = renderStepBar();
        expect(component.find('.step-bar-container')).toHaveLength(1);
        expect(component.find('.step-bar-step')).toHaveLength(3);
        expect(component.find('.step-bar-active')).toHaveLength(1);
    });
});
