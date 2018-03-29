import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap'


const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 70,   /* Height of the footer */
    background: '#F7F3E9 repeat-x top left',
    padding: '20px 10px 0px 10px',
    fontSize: 12,
};

export const Footer = ({version}) => (
    <Grid style={footerStyle}>
        <Row>
            <Col xs={12} sm={6} md={6}>
                <ul className="list-inline pull-right" style={{marginLeft: 20}}>
                    <li><span style={{color:'#173b93', fontWeight:'500'}}> v.{version || ""}</span></li>
                </ul>
                <ul className="list-inline pull-right">
                    <li><a target="_blank" href="#">Contact</a></li>
                </ul>
            </Col>
        </Row>
    </Grid>
);

Footer.propTypes = {
    version: PropTypes.string,
};
