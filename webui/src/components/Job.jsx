import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Panel, Table, Button, Glyphicon, Modal, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';

import { toPairs } from '../utils/utils';
import * as actions from '../actions/actions';


export class Job extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Job {this.props.job.id}</h1>
                <h3>Original text</h3>
                <p>{this.props.job.originalText}</p>
                <h3>Tokenized text</h3>
                <p>{this.props.job.tokenizedText}</p>
            </div>
        );
    }
}

Job.propTypes = {
    jobs: PropTypes.object,
};
