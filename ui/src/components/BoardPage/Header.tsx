// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'detailOpened' implicitly has an '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
