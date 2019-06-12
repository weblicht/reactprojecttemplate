import React from 'react';
import { render } from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import rootReducers from './actions/reducers';
import { fetchApiInfo } from './actions/actions';

import { BrowseJobs } from './containers/BrowseJobs';
import { Job } from './containers/Job';
import { CreateJob } from  './containers/CreateJob';
import { HomeContainer } from './containers/HomeContainer';
import { FooterContainer } from './containers/FooterContainer';
import { Frame } from './components/Frame';

const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    || (f => f);

const middleware = compose(
    applyMiddleware(thunkMiddleware,
        createLogger()),
    devTools
);
const store = createStore(rootReducers, middleware);

// TODO: show alerts when backend fails

class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(fetchApiInfo());
    }
 
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div style={{ paddingBottom: 70, paddingTop: 5 }}>
                        <Route path='/' component={Frame} />
                        <Switch>
                            <Route exact path='/jobs' component={BrowseJobs} />
                            <Route exact path='/jobs/new' component={CreateJob} />
                            <Route exact path='/jobs/:id' component={Job} />
                            <Route exact path='/' component={HomeContainer} />
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </div>
                </Router>
                <FooterContainer />
            </Provider>
        );
    }
}

const NotFound = () => (
    <div>This page is not found!</div>
);


render(<App />, document.getElementById('react') );
