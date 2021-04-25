// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
function defaultErrorRender(props = {}, children = 'An unexpected error has occurred.') {
    return (
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'Component' implicitly has an 'any' type... Remove this comment to see the full error message
        <div className="alert alert-danger" {...props}>
            {children}
        </div>
    );
}

function wrapRender(callback, errorCallback = defaultErrorRender) {
    try {
        return callback();
    } catch (e) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'Component' implicitly has an 'any' type... Remove this comment to see the full error message
        console.error(e.message, e);
        return errorCallback();
    }
}

function wrapComponent(Component, errorCallback = defaultErrorRender) {
    class ErrorWrappedComponent extends Component {
        render() {
            try {
                return super.render();
            } catch (e) {
                console.error(e.message, e);
                return errorCallback(this.props, this.state);
            }
        }
    }

    return ErrorWrappedComponent;
}

export {
    defaultErrorRender, wrapRender, wrapComponent, wrapComponent as default,
};
