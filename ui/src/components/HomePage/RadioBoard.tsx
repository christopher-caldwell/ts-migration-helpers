import React from 'react';

import Board from 'components/HomePage/Board';
import RadioBoardBody from 'components/HomePage/RadioBoardBody';

class RadioBoard extends React.Component {
    render() {
        return (
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'id' is missing in type '{ children: Elem... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'id' is missing in type '{ children: Elem... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'id' is missing in type '{ children: Elem... Remove this comment to see the full error message
            <Board className="home-board-radio" {...this.props}>
                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                <RadioBoardBody {...this.props} />
            </Board>
        );
    }
}

export default RadioBoard;
