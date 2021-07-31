// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import RadioBoardBody from 'components/HomePage/RadioBoardBody';

jest.mock('components/Utilities/Image', () => <img alt="testimage" />);

const renderRadioBoardBody = () => (
    shallow(
        <RadioBoardBody
            href="test href"
            summary={{}}
        />,
    )
);

describe('<RadioBoardBody />', () => {
    it('should render component', () => {
        const component = renderRadioBoardBody();
        expect(component.find('.home-board-body')).toHaveLength(1);
    });
});
