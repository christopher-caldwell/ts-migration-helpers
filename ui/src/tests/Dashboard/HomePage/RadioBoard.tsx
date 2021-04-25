// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import RadioBoard from 'components/HomePage/RadioBoard';

jest.mock('components/Utilities/Image', () => <div />);
jest.mock('react-router-dom', () => ({
    Link: () => <div />,
}));

describe('<RadioBoard />', () => {
    describe('component', () => {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        it('should render a board with a background', () => {
            const summary = {
                name: 'test name',
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                call_letters: 'test letters',
                location: 'test location',
                image_url: 'test image',
                owner: 'test owner',
            };
            const wrapper = shallow((
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                <RadioBoard config={{}} href="" id="" metrics={{}} objectPath={{}} name="" summary={summary} />
            )).dive();
            expect(wrapper.find('.home-board')).toHaveLength(1);
        });
    });
});
