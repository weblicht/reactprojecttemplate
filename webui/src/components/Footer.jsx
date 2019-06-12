import React from 'react';
import PropTypes from 'prop-types';

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 40,   /* Height of the footer */
    background: '#6699ff repeat-x top left',
    padding: '3px 0px 0px 0px',
    fontSize: 12
};

export const Footer = ({ version }) => (
    <div className="d-flex" style={footerStyle}>
        <ul className="list-unstyled mx-auto justify-content-center">
            <li><span style={{ color: '#173b93', fontWeight: '500' }}> v.{version || ""}</span></li>
            <li><a target="_blank" href="#">Contact</a></li>
        </ul>
    </div>
);

Footer.propTypes = {
    version: PropTypes.string,
};
