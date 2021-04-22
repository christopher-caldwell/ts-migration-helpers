import React from 'react';
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
