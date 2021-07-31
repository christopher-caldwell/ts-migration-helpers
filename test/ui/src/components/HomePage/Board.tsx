// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ backgroundImage: string; backgroundSize: s... Remove this comment to see the full error message
        const backgroundImage = `
            linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%),
            url(${background})
        `;
        return { backgroundImage, backgroundSize: 'cover' };
    };

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ backgroundImage: string; backgroundSize: s... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ backgroundImage: string; backgroundSize: s... Remove this comment to see the full error message
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
