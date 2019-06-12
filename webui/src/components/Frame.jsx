import React from 'react';
import { Link } from 'react-router-dom';

export class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.openElement = this.openElement.bind(this);
        this.closeElement = this.closeElement.bind(this);
        this.toggleElement = this.toggleElement.bind(this);
        this.state = {
            showDropdown: false,
            showCollapsedNavbar: false
        };
    }

    openElement(e) {
        switch (e.currentTarget.id) {
            case 'dd1':
                this.setState({
                    showDropdown: true
                });
                break;
            case 'navCollapse':
                this.setState({
                    showCollapsedNavbar: true
                });
                break;
            default:
                e.preventDefault();
        }
    }

    closeElement(e) {
        switch (e.currentTarget.id) {
            case 'dd1':
                this.setState({
                    showDropdown: false
                });
                break;
            case 'navCollapse':
                this.setState({
                    showCollapsedNavbar: false
                });
                break;
            default:
                e.preventDefault();
        }
    }

    toggleElement(e) {
        switch (e.currentTarget.id) {
            case 'dd1':
                this.setState((prevState) => ({
                    showDropdown: !prevState.showDropdown
                }));
                break;
            case 'navCollapse':
                this.setState((prevState) => ({
                    showCollapsedNavbar: !prevState.showCollapsedNavbar
                }));
                break;
            default:
                e.preventDefault();
        }
    }

    render() {
        const dropdownClass = this.state.showDropdown ? "dropdown-menu dropdown-menu-right text-right show" : "dropdown-menu";
        const navCollapseClass = this.state.showCollapsedNavbar ? "collapse navbar-collapse text-right show" : "collapse navbar-collapse";
        
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>ReactProject</Link>

                <button id="navCollapse" className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation" 
                        onClick={this.toggleElement}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div id="navbarSupportedContent" className={navCollapseClass}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/'>Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/jobs'>Jobs</Link>
                        </li>
                        <li id="dd1" className="nav-item dropdown" onClick={this.toggleElement}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className={dropdownClass} aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/">Home</Link>
                                <Link className="dropdown-item" to="/jobs">Jobs</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/jobs/new">New Job</Link>
                            </div>
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
