import React from 'react';
import PropTypes from 'prop-types';
import { Well, Label, Button } from 'react-bootstrap';
import moment from 'moment';

import { toPairs } from '../utils/utils';
import * as actions from '../actions/actions';


export class Job extends React.Component {
    constructor(props) {
        super(props);
    }

    renderNotFound() {
        return (
            <div>
                <h1>Job ?</h1>
                <p>Job not found</p>
            </div>
        );
    }

    render() {
        const {id} = this.props.params || {};
        if (!this.props.jobs || !id) {
            return this.renderNotFound();
        }

        const job = this.props.jobs.find(j => j.id == id);
        if (!job) {
            return this.renderNotFound();
        }

        return (
            <div>
                <h1>Job {job.id}</h1>
                <p>Original text: {job.originalText}</p>
                <p>Tokenized:</p>
                <pre><code>{job.tokenizedText}</code></pre>
                <Label bsStyle={job.status == "done" ? "success" : "danger"}>{job.status}</Label>
            </div>
        );
    }
}

Job.propTypes = {
    jobs: PropTypes.array,
};
