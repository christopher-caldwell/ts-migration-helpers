import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Board from 'components/HomePage/Board';

describe('<Board />', () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'CSSProperti... Remove this comment to see the full error message
    it('should the render id, class, and children', () => {
        const wrapper = shallow((
            <Board className="home-board-artist" id="500">
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'CSSProperti... Remove this comment to see the full error message */}
                <span>Test</span>
            </Board>
        ));

        expect(wrapper.contains(
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'CSSProperti... Remove this comment to see the full error message
            <div className="home-board home-board-artist" id="board-500" style={null}>
                <span>Test</span>
            </div>,
        )).toBe(true);
    });

    describe('renderBackground', () => {
        it('should render a background image when set', () => {
            const wrapper = shallow((
                <Board background="/test.png" className="home-board-artist" id="500" renderBackground>
                    <span>Test</span>
                </Board>
            ));

            expect(wrapper.find('.home-board').prop('style').backgroundImage.includes('url(/test.png)')).toBe(true);
        });

        it('should create a dark gradient when set', () => {
            const wrapper = shallow((
                <Board background="/test.png" className="home-board-artist" id="500" renderBackground>
                    <span>Test</span>
                </Board>
            ));

            expect(
                wrapper.find('.home-board').prop('style').backgroundImage.includes(
                    'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%)',
                ),
            ).toBe(true);
        });
    });
});
