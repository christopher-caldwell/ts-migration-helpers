import React from 'react';

import PropTypes from 'prop-types';

class Button extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"button "' is not assignable to type '"butto... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"button "' is not assignable to type '"butto... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"button "' is not assignable to type '"butto... Remove this comment to see the full error message
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
