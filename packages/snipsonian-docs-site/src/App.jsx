import React from 'react';
import {Router, Link} from 'react-static';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
// eslint-disable-next-line import/no-unresolved
import Routes from 'react-static-routes';

import store from './connectors/redux';

import './app.css';

/* eslint-disable jsx-a11y/anchor-is-valid */
const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/blog">Blog</Link>
                </nav>
                <div className="content">
                    <Routes />
                </div>
            </div>
        </Router>
    </Provider>
)
/* eslint-enable jsx-a11y/anchor-is-valid */

export default hot(module)(App);
