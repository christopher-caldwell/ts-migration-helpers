import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
