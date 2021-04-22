import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

class LoadingIndicator extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        text: PropTypes.string,
    };

    static defaultProps = {
        className: null,
        text: 'Loading...',
    };

    render() {
        const { className, text } = this.props;

        const loadingClassName = classNames({
            loading: true,
            [className]: typeof className === 'string',
        });

        return (
            <div className={loadingClassName}>
                <p>
                    <i className="fa fa-circle-notch fa-spin" />
                </p>
                {text ? <p>{text}</p> : null}
            </div>
        );
    }
}

export default LoadingIndicator;
