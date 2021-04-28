import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './store/reducers/index';
import reduxThunk from 'redux-thunk';
import './Components/css/Grid.css';
import './Components/css/Global.css';

const store = createStore(combineReducers, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById('root')
        );

serviceWorker.unregister();
