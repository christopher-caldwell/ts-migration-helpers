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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Readonly... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'enabled' does not exist on type 'Readonl... Remove this comment to see the full error message
        super(props);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.state = { target: false };
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'left' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    handleMouseEnter = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'top' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'positionLeft' does not exist on type '{}... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { target } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'message' does not exist on type 'Readonl... Remove this comment to see the full error message
        target.setState({ show: true });
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'top' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    handleMouseLeave = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { target } = this.state;
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'positionLeft' does not exist on type '{}... Remove this comment to see the full error message
        target.setState({ show: false });
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'positionTop' does not exist on type '{}'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'enabled' does not exist on type 'Readonl... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            enabled,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'left' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            type,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
            title,
            message,
            left,
            top,
            keepOpened,
            songs,
            children,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            ...propsTooltip
        } = this.props;

        const customPropsTooltip = {
            ...propsTooltip,
            style: {
                left: propsTooltip.positionLeft + left,
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                top: propsTooltip.positionTop + top,
            },
            onMouseEnter: keepOpened ? this.handleMouseEnter : undefined,
            onMouseLeave: keepOpened ? this.handleMouseLeave : undefined,
        };

        const key = shortid.generate();
        return (
            enabled && (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                <Tooltip id={key} key={key} {...customPropsTooltip}>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    <div className="custom-tooltip__container">
                        <i
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                            className={`custom-tooltip__icon fa ${iconMapping[type]}`}
                            aria-hidden="true"
                        />
                        <div className="custom-tooltip__box">
                            {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                            {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                            <p className="custom-tooltip__title">{title}</p>
                            {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                            {songs.length > 0 && (
                                <div className="custom-tooltip__song-list custom-scrollbars--thin">
                                    {Object.values(songs).map(song => (
                                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                                        <div
                                            key={song.sNm}
                                            className="custom-tooltip__song-details"
                                        >
                                            {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                                            <p className="custom-tooltip__song-details-title">
                                                {'Title: '}
                                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                                {song.sNm}
                                            </p>
                                            {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                                            <p className="custom-tooltip__song-details-description">
                                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                                {'Artist: '}
                                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                                                {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                                                {song.aNm}
                                            </p>
                                            <p className="custom-tooltip__song-details-description">
                                                {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
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
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
