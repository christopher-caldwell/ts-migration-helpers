import React from 'react';
import { shallow } from 'enzyme';

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
