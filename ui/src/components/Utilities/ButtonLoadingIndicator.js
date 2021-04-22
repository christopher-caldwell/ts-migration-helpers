import React from 'react';

import PropTypes from 'prop-types';

class ButtonLoadingIndicator extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
    };

    static defaultProps = {
        loading: false,
    };

    render() {
        return this.props.loading && <span className="fa fa-circle-notch fa-spin" />;
    }
}

export default ButtonLoadingIndicator;
