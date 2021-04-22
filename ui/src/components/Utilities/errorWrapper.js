import React from 'react';

function defaultErrorRender(props = {}, children = 'An unexpected error has occurred.') {
    return (
        <div className="alert alert-danger" {...props}>
            {children}
        </div>
    );
}

function wrapRender(callback, errorCallback = defaultErrorRender) {
    try {
        return callback();
    } catch (e) {
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
