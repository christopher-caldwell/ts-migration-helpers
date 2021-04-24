import React from 'react';

import PropTypes from 'prop-types';

class Button extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {
        children: null,
    };

    render() {
        return (
            <button type="button " {...this.props}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;
