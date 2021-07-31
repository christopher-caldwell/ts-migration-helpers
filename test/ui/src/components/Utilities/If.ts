import React from 'react';
import PropTypes from 'prop-types';
class If extends React.Component {
    static propTypes = {
        test: PropTypes.bool.isRequired,
        children: PropTypes.node,
    };
    static defaultProps = {
        children: null,
    };
    render() {
        if ((this.props as any).test) {
            return this.props.children;
        }
        return false;
    }
}
export default If;
