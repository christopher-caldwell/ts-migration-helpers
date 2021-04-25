// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import rootReducer from './stores';
// @ts-expect-error ts-migrate(2339) FIXME: Property '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' do... Remove this comment to see the full error message
import Routes from './Routes';

import './sass/app.scss';
import './App.css';

moment.updateLocale('en', {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    // @ts-expect-error ts-migrate(2339) FIXME: Property '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' do... Remove this comment to see the full error message
    weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
