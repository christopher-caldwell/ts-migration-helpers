import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const Header = ({ children, detailOpened, title, subtitle }) => (
    <div className="board-header">
        <div
            className={classNames('board-header-content', {
                opened: detailOpened,
            })}
        >
            <header className="board-header-title">
                <h3>{title}</h3>
                <div className="subtitle-container">
                    {subtitle ? <div className="board-header-subtitle">{subtitle}</div> : null}
                </div>
            </header>
            {children}
        </div>
    </div>
);

Header.propTypes = {
    children: PropTypes.node.isRequired,
    subtitle: PropTypes.arrayOf(PropTypes.node).isRequired,
    title: PropTypes.string.isRequired,
    detailOpened: PropTypes.bool,
};

Header.defaultProps = {
    detailOpened: false,
};

export default Header;
