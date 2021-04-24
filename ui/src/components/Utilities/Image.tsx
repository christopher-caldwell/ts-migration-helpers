import React from 'react';

import PropTypes from 'prop-types';

import defaultImage from 'images/default.png';

function onImageError(e) {
    const img = e.currentTarget;
    img.src = defaultImage;
}

class Image extends React.Component {
    static propTypes = {
        alt: PropTypes.string,
        className: PropTypes.string,
        src: PropTypes.string,
        onError: PropTypes.func,
    };

    static defaultProps = {
        src: defaultImage,
        alt: '',
        className: '',
        onError: onImageError,
    };

    render() {
        const src = this.props.src || this.constructor.defaultProps.src;

        return <img alt={this.props.alt} className={this.props.className} src={src} onError={this.props.onError} />;
    }
}

export default Image;
