import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'opened' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'opened' does not exist on type '{}'.
import MinusPlus from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/MinusPlus';

const renderMinusPlus = (options = {}) => (
    shallow(
        <MinusPlus
            opened={options.opened || true}
        />,
    )
);

describe('<MinusPlus />', () => {
    it('should render component', () => {
        const component = renderMinusPlus();
        expect(component.find('.minus-plus')).toHaveLength(1);
    });
});
