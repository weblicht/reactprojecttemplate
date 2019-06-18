import React from 'react';
import { Link } from 'react-router-dom';

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
