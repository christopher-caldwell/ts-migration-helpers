/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/loading-indicator.js
 *
 * A simple loading indicator, modeled after react-select.  Since react styles
 * don't support animations, hack it so we inject the keyframe animation
 * into the document.
 */
import React, { Component } from 'react';

class LoadingIndicator extends Component {
    render() {
        return <span className="multiselect-loading" />;
    }
}

export default LoadingIndicator;
