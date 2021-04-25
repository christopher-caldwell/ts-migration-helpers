import React from 'react';

type Props = {
    loading?: boolean;
};

class ButtonLoadingIndicator extends React.Component<Props> {

    static defaultProps = {
        loading: false,
    };

    render() {
        return this.props.loading && <span className="fa fa-circle-notch fa-spin" />;
    }
}

export default ButtonLoadingIndicator;
