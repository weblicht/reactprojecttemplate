import { rootReducer } from './reducers';
import { fetchApiInfo } from './actions';
import { selectVersion } from './selectors';
import { JobDetail, BrowseJobs, CreateJob } from '../Jobs/component';

import { Button, Card, CardHeader, CardFooter } from '@sfstuebingen/germanet-common/components';

import React from 'react';
import { connect } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';


// Renders the nav bar, which is displayed in the header of the main content area.
// On smaller screens, the nav items collapse behind a "hamburger" menu button.
export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        // a flag indicating whether the nav menu is open or closed
        // (on screens below the breakpoint):
        this.state = {
            isOpen: false
        };

        // NB: in class components like this one, you need a line like
        // the following for any method in which 'this' should refer
        // to the component instance (e.g., so you can call this.setState).
        // This is extra boilerplate that you can avoid by writing components
        // as pure functions instead of classes.
        // See: https://reactjs.org/docs/handling-events.html
        this.closeNav = this.closeNav.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
    }

    closeNav(e) {
        this.setState({
            isOpen: false
        });
    }

    toggleNav(e) {
        // NB: note that we pass setState a function here in order to
        // safely set the new value of the flag based on the old value. See:
        // https://reactjs.org/docs/react-component.html#setstate
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        // NB: for more on the (fairly complicated) set of CSS classes
        // that make Bootstrap Navbars work, see:
        // https://getbootstrap.com/docs/4.3/components/navbar/

        // classes for the main <nav> element:
        const navClasses = classNames([
            "navbar", // make this nav a bootstrap nav bar
            "navbar-expand-sm", // ...which collapses at the "small" breakpoint
            "navbar-light", // light theme
            "bg-light" // light background
        ]);
        
        // classes for the collapsible menu of nav items:
        const menuClasses = classNames({
            "collapse": true, "navbar-collapse": true, // enable collapsing
            "show": this.state.isOpen, // show/hide the dropdown menu 
            "text-right":  this.state.isOpen, // show nav items on the right in the dropdown
        });
        
        return (
            <nav className={navClasses}>

              {/* A "branding" link that is always displayed slightly larger than nav items,
                * and never hidden in a menu: */}
              <Link className="navbar-brand" to='/'>ReactProject</Link>

              {/* The hamburger button displayed when the menu collapses: */}
              <Button className="navbar-toggler"
                      data-toggle="collapse" 
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent" 
                      aria-expanded="false"
                      aria-label="Toggle navigation" 
                      onClick={this.toggleNav}>
                <span className="navbar-toggler-icon"></span>
              </Button>
                
              {/* The actual nav items: */}
              <div id="navbarSupportedContent" className={menuClasses}>
                <ul className="navbar-nav mr-auto">
                  <NavBarItem text="Home" target="/" onClick={this.closeNav}/>
                  <NavBarItem text="Browse Jobs" target="/jobs" onClick={this.closeNav}/>
                  <NavBarItem text="Create Job" target="/jobs/new" onClick={this.closeNav}/>
                </ul>
              </div>
            </nav>
        );
    }
}

// Renders an item in the nav bar.
// props:
//   text: the text to display in the nav item  
//   target: the (relative) URL of the nav item's destination
//   onClick (optional): a callback to call when the nav item is clicked 
function NavBarItem(props) {
    const location = useLocation();

    const liClasses = classNames({
        'nav-item': true, // mark this item as a nav item 
        'active': location.pathname === props.target // mark as active depending on URL
    });

    const linkClasses = classNames([
        'nav-link'
    ]);

    return (
        <li key={props.target} className={liClasses}>
          <Link to={props.target} onClick={props.onClick} className={linkClasses}>
            {props.text}
          </Link>
        </li>
    );
}


// The component displayed at /
function Home(props) {
    return (
        <Card title="Home page" level={3}>
            <p>Please go to the Jobs section.</p>
        </Card>
    );
}

// A fallback component displayed at all unrecognized URLs
function NotFound(props) {
    return (
        <Card title="Not found" level={3}>
          <p>There's nothing to see here.</p>
        </Card>
    );
}

// Displays the footer in the main content area with version information 
function Footer(props) {
    return (
        <CardFooter extras="text-center">
          {props.version && <p>Version {props.version}</p>}
        </CardFooter>
    );
}

function stateToFooterProps(state) {
    return {
        version: selectVersion(state)
    };
}

Footer = connect(stateToFooterProps)(Footer);


// Initialize the Redux store with devtools and thunk middleware:
const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    || (f => f);

const middleware = compose(
    applyMiddleware(thunkMiddleware,
        createLogger()),
    devTools
);

const store = createStore(rootReducer, middleware);

// The top-level App component. This component is the entry point for
// the entire application. Its duties are:
//   - provide the Redux store to other components lower in the hierarchy
//   - set up the application router
//   - set up the outermost CSS container and render the header, footer, and content
//     on every page
export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // NB: this method is called by React after the App is
        // rendered for the first time, so it's a good place to run
        // one-time configuration that requires talking to the
        // backend, like getting the API info:
        store.dispatch(fetchApiInfo());
    }
 
    render() {

        const mainContentExtras = classNames(
            "h-100", // consume all vertical space
            "p-0", // remove default Card padding
            "border-0", // remove default Card border
        );

        return (
            <Provider store={store}>
              <div className="h-100 p-0 container-fluid">
                <Router>
                  <Card extras={mainContentExtras} header={<NavBar />} footer={<Footer />}>
                    <Switch>
                      <Route exact path='/jobs' component={BrowseJobs} />
                      <Route exact path='/jobs/new' component={CreateJob} />
                      <Route exact path='/jobs/:id' component={JobDetail} />
                      <Route exact path='/' component={Home} />
                      <Route path='*' component={NotFound} />
                    </Switch>
                  </Card>
                </Router>
              </div>
            </Provider>
        );
    }
}

