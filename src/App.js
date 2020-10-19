import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';
import './sass/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ScrollToP from './scrolltop'
import ErrorBoundary from './errorboundry'
import Container from './containers'

library.add(fas);
export const store = configureStore ();

class App extends Component {

    render() {
        return (
            <div className="app">
                <Provider store={store}>
                    <Router>
                        <ScrollToP>
                            <ErrorBoundary>
                                <Container/>
                            </ErrorBoundary>
                        </ScrollToP>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
