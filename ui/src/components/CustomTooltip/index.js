import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';
import shortid from 'shortid';

const iconMapping = {
    warning: 'fa-exclamation-triangle gold',
    error: 'fa-times-circle red',
    info: 'fa fa-info-circle purpley',
    synced: 'fa fa-info-circle tealish-green',
};

class CustomTooltip extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { target: false };
    }

    handleMouseEnter = () => {
        const { target } = this.state;
        target.setState({ show: true });
    };

    handleMouseLeave = () => {
        const { target } = this.state;
        target.setState({ show: false });
    };

    render() {
        const {
            enabled,
            type,
            title,
            message,
            left,
            top,
            keepOpened,
            songs,
            children,
            ...propsTooltip
        } = this.props;

        const customPropsTooltip = {
            ...propsTooltip,
            style: {
                left: propsTooltip.positionLeft + left,
                top: propsTooltip.positionTop + top,
            },
            onMouseEnter: keepOpened ? this.handleMouseEnter : undefined,
            onMouseLeave: keepOpened ? this.handleMouseLeave : undefined,
        };

        const key = shortid.generate();
        return (
            enabled && (
                <Tooltip id={key} key={key} {...customPropsTooltip}>
                    <div className="custom-tooltip__container">
                        <i
                            className={`custom-tooltip__icon fa ${iconMapping[type]}`}
                            aria-hidden="true"
                        />
                        <div className="custom-tooltip__box">
                            <p className="custom-tooltip__title">{title}</p>
                            {songs.length > 0 && (
                                <div className="custom-tooltip__song-list custom-scrollbars--thin">
                                    {Object.values(songs).map(song => (
                                        <div
                                            key={song.sNm}
                                            className="custom-tooltip__song-details"
                                        >
                                            <p className="custom-tooltip__song-details-title">
                                                {'Title: '}
                                                {song.sNm}
                                            </p>
                                            <p className="custom-tooltip__song-details-description">
                                                {'Artist: '}
                                                {song.aNm}
                                            </p>
                                            <p className="custom-tooltip__song-details-description">
                                                {'Version:  '}
                                                {song.version_name || '-'}
                                            </p>
                                            {song.gs_category && (
                                                <p className="custom-tooltip__song-details-description">
                                                    {'GSelector Category:  '}
                                                    {song.gs_category}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {children}
                            {message ? (
                                <p className={`custom-tooltip__text ${type}`}>{message}</p>
                            ) : null}
                        </div>
                    </div>
                </Tooltip>
            )
        );
    }
}

CustomTooltip.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    enabled: PropTypes.bool,
    keepOpened: PropTypes.bool,
    left: PropTypes.number,
    message: PropTypes.string,
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    songs: PropTypes.arrayOf(PropTypes.shape()),
    top: PropTypes.number,
};

CustomTooltip.defaultProps = {
    enabled: true,
    positionLeft: 0,
    positionTop: 0,
    left: 0,
    top: 0,
    keepOpened: false,
    songs: [],
    children: null,
    message: '',
};

export default CustomTooltip;
