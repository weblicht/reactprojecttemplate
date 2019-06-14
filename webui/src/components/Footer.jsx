import React from 'react';
import PropTypes from 'prop-types';

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
