// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

const StationHeader = props => {
    const {
        station: { name, callLetters, market, format },
        className,
        children,
    } = props;

    return (
        <div className={classNames(`board-header ${className}`)}>
            <div className="board-header-content">
                <header className="board-header-title">
                    <h3>{name}</h3>
                    <div className="subtitle-container">
                        <div className="board-header-subtitle">
                            <span className="radio-subtitle">
                                {callLetters} 
                                {' '}
                                {market}
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            </span>
                            <span className="radio-subtitle radio-subtitle--border-left">
                                {format}
                            </span>
                        </div>
                    </div>
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                </header>
                {children}
            </div>
        </div>
    );
};

StationHeader.propTypes = {
    station: PropTypes.shape().isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
};

StationHeader.defaultProps = {
    className: '',
    children: null,
};

export default StationHeader;
