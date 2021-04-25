import React from 'react';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/default.png' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/default.png' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/default.png' or its cor... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
import defaultImage from 'images/default.png';

function onImageError(e) {
    const img = e.currentTarget;
    img.src = defaultImage;
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Readonly<{}... Remove this comment to see the full error message

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'Fu... Remove this comment to see the full error message
class Image extends React.Component {
    static propTypes = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alt' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        alt: PropTypes.string,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        className: PropTypes.string,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onError' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        src: PropTypes.string,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'Fu... Remove this comment to see the full error message
        onError: PropTypes.func,
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'alt' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    static defaultProps = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        src: defaultImage,
        alt: '',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onError' does not exist on type 'Readonl... Remove this comment to see the full error message
        className: '',
        onError: onImageError,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'Fu... Remove this comment to see the full error message
    };

    render() {
        const src = this.props.src || this.constructor.defaultProps.src;

        return <img alt={this.props.alt} className={this.props.className} src={src} onError={this.props.onError} />;
    }
}

export default Image;
