import React from 'react';

import Board from 'components/HomePage/Board';
import RadioBoardBody from 'components/HomePage/RadioBoardBody';

class RadioBoard extends React.Component {
    render() {
        return (
            <Board className="home-board-radio" {...this.props}>
                <RadioBoardBody {...this.props} />
            </Board>
        );
    }
}

export default RadioBoard;
