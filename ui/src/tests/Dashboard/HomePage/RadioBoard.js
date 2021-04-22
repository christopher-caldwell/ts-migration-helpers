import React from 'react';
import { shallow } from 'enzyme';

import RadioBoard from 'components/HomePage/RadioBoard';

jest.mock('components/Utilities/Image', () => <div />);
jest.mock('react-router-dom', () => ({
    Link: () => <div />,
}));

describe('<RadioBoard />', () => {
    describe('component', () => {
        it('should render a board with a background', () => {
            const summary = {
                name: 'test name',
                call_letters: 'test letters',
                location: 'test location',
                image_url: 'test image',
                owner: 'test owner',
            };
            const wrapper = shallow((
                <RadioBoard config={{}} href="" id="" metrics={{}} objectPath={{}} name="" summary={summary} />
            )).dive();
            expect(wrapper.find('.home-board')).toHaveLength(1);
        });
    });
});
