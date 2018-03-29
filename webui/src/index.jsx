import PropTypes from 'prop-types';
import React from 'react';
import {render} from 'react-dom';
import {compose, applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import {Grid, Row, Col, Alert, Well} from 'react-bootstrap';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import rootReducers from './actions/reducers';
import {fetchApiInfo} from './actions/actions';

import {BrowseJobsContainer, CreateJobContainer, JobContainer} from './containers/JobsContainer';
import {HomeContainer} from './containers/HomeContainer';
import {FooterContainer} from './containers/FooterContainer';


const middleware = compose(
    applyMiddleware(thunkMiddleware,
                    routerMiddleware(browserHistory),
                    createLogger()),
    window.devToolsExtension || (f=>f)
);
const store = createStore(rootReducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

// TODO: show alerts
// TODO: make sure there are forms

class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(fetchApiInfo());
    }

    render() {
        return (
            <Provider store={store}>
                <div style={{paddingBottom: 70, paddingTop:50}}>
                    <Router history={history}>
                        <Route path='/' component={Frame}>
                            <IndexRoute component={HomeContainer}/>
                            <Route path='jobs' component={BrowseJobsContainer} >
                                <Route path='new' component={CreateJobContainer}  />
                                <Route path=':id' component={JobContainer}  />
                            </Route>
                            <Route path='*' component={NotFound} />
                        </Route>
                    </Router>
                    <FooterContainer />
                </div>
            </Provider>
        );
    }
}

const Frame = (props) => (
    <Grid fluid={true}>
        <Row>
        <Navbar fixedTop={true} fluid={true} collapseOnSelect>
            <Navbar.Header>
                <LinkContainer to={'/'}>
                    <Navbar.Brand> reactprojecttemplate </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to={'/jobs'}>
                        <NavItem> Jobs </NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title="Help" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </Row>

        <Row>
            <Col xs={12} sm={12} md={1}/>
            <Col xs={12} sm={12} md={10}>
                {props.children}
            </Col>
        </Row>
    </Grid>
);


const NotFound = () => (
    <div>This page is not found!</div>
);


render(<App />, document.getElementById('react') );
