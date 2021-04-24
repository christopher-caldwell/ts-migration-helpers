import React from 'react';
import reactGuard from 'react-guard';
import moment from 'moment';
import { defaultErrorRender } from 'components/Utilities/errorWrapper';

// Add polyfill support in IE browsers
import 'core-js/es/array';
import 'core-js/es/object';
import 'core-js/es/promise';
import 'core-js/es/string';
import 'element-closest';
import 'whatwg-fetch';
import 'url-search-params-polyfill';
import 'utils/Function.prototype.name';

// Config moment
moment.updateLocale('en', {
    weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});

// Set render default error handling
reactGuard(React, (err, componentInfo) => {
    // Print stacktrace to the console
    console.error(err.message, err.stack);

    const { props, state } = componentInfo;

    if (props.renderError) {
        return props.renderError(props, state);
    }

    return defaultErrorRender();
});
// TODO: do we need this file?
