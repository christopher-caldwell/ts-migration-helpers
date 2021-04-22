import React from 'react';
import { render } from 'enzyme';

import TargetComponent from 'components/TargetComponent/index';

jest.mock('components/Utilities/LoadingIndicator', () => <div />);

const testComponentText = 'test component';
const renderTargetComponent = () => (
    render(
        <TargetComponent
            navbar={[
                {
                    active: true,
                    targetComponent: () => <div>{testComponentText}</div>,
                },
            ]}
        />,
    )
);

describe('<TargetComponent />', () => {
    it('should render component', () => {
        const component = renderTargetComponent();
        expect(component.html()).toBe(testComponentText);
    });
});
