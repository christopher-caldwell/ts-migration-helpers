import React from 'react';

import { shallow } from 'enzyme';

import Board from 'components/HomePage/Board';

describe('<Board />', () => {
    it('should the render id, class, and children', () => {
        const wrapper = shallow((
            <Board className="home-board-artist" id="500">
                <span>Test</span>
            </Board>
        ));

        expect(wrapper.contains(
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
