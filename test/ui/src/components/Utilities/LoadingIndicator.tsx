import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
import classNames from 'classnames';

class LoadingIndicator extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        text: PropTypes.string,
    };

    static defaultProps = {
        className: null,
        text: 'Loading...',
    };

    render() {
        const { className, text } = this.props;

        // @ts-expect-error ts-migrate(2464) FIXME: A computed property name must be of type 'string',... Remove this comment to see the full error message
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
