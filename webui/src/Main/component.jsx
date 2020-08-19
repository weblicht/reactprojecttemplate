import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { rootReducer } from './reducers';
import { fetchApiInfo } from './actions';

import { JobDetail, BrowseJobs, CreateJob } from '../Jobs/component';

export const Footer = ({ version }) => (
    <div className="d-flex flex-row justify-content-center fixed-bottom bg-light" >
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-center">
                v.{version || ""}
            </div>
            <div className="d-flex flex-row justify-content-center">
            <a target="_blank" href="#">Contact</a>
            </div>
        </div>
    </div>
);

Footer.propTypes = {
    version: PropTypes.string,
};

export class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            showCollapsedNavbar: false
        };
    }

    openNav(e) {
        this.setState({
            showCollapsedNavbar: true
        });
    }

    closeNav(e) {
        this.setState({
            showCollapsedNavbar: false
        });
    }

    toggleNav(e) {
        this.setState((prevState) => ({
            showCollapsedNavbar: !prevState.showCollapsedNavbar
        }));
    }

    render() {
        const navCollapseClass = this.state.showCollapsedNavbar ? "collapse navbar-collapse text-right show" : "collapse navbar-collapse";
        
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                <Link className="navbar-brand" to='/'>ReactProject</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation" 
                        onClick={this.toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div id="navbarSupportedContent" className={navCollapseClass}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/' onClick={this.closeNav}>Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/jobs' onClick={this.closeNav}>Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/jobs/new' onClick={this.closeNav}>New</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" tabIndex="-1" aria-disabled="true" to="/">Disabled</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export const Home = () => (
        <div>
            <h1>Home page</h1>
            <p style={{fontSize:20}}>Please go to the Jobs section.</p>
        </div>
);

const mapStateToFooterProps = (state) => state.apiinfo;
export const FooterContainer = connect(mapStateToFooterProps)(Footer);

const mapStateToHomeProps = (state) => ({});
export const HomeContainer = connect(mapStateToHomeProps)(Home);

const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    || (f => f);

const middleware = compose(
    applyMiddleware(thunkMiddleware,
        createLogger()),
    devTools
);
const store = createStore(rootReducer, middleware);

export class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(fetchApiInfo());
    }
 
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div style={{ paddingBottom: 70, paddingTop: 70 }}>
                        <Route path='/' component={Frame} />
                        <Switch>
                            <Route exact path='/jobs' component={BrowseJobs} />
                            <Route exact path='/jobs/new' component={CreateJob} />
                            <Route exact path='/jobs/:id' component={JobDetail} />
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

