import React from 'react';
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
                            </span>
                            <span className="radio-subtitle radio-subtitle--border-left">
                                {format}
                            </span>
                        </div>
                    </div>
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
