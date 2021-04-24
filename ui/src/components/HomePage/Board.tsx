import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const Board = props => {
    const {
        background, renderBackground, children, className, id,
    } = props;
    const getStyle = () => {
        if (!renderBackground) {
            return null;
        }
        const backgroundImage = `
            linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%),
            url(${background})
        `;
        return { backgroundImage, backgroundSize: 'cover' };
    };

    const boardClassName = classNames({
        'home-board': true,
        [className]: true,
    });

    return (
        <div className={boardClassName} id={`board-${id}`} style={getStyle()}>
            {children}
        </div>
    );
};

Board.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    background: PropTypes.string,
    renderBackground: PropTypes.bool,
};

Board.defaultProps = {
    background: '',
    renderBackground: false,
};

export default Board;
