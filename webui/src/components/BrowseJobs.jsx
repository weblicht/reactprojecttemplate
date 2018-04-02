import React from 'react';
import PropTypes from 'prop-types';
import { Well, Label, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import moment from 'moment';

import { toPairs } from '../utils/utils';

export class BrowseJobs extends React.Component {
    constructor(props) {
        super(props);
    }

    renderJob(job) {
        return (
            <Well key={job.id}>
                <LinkContainer to={"/jobs/"+job.id}>
                    <div>
                        <p>Original text: {job.originalText}</p>
                        <p>Tokenized:</p>
                        <pre><code>{job.tokenizedText}</code></pre>
                        <Label bsStyle={job.status == "done" ? "success" : "danger"}>{job.status}</Label>
                    </div>
                </LinkContainer>
            </Well>
        );
    }

    renderJobList() {
        return (
            <div style={{borderBottom: '1px solid gray', marginBottom: 20}}>
                { this.props.jobs.map(this.renderJob) }
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3> Browse Jobs </h3>
                { this.props.jobs && this.props.jobs.length
                    ? this.renderJobList()
                    : <p>No jobs found</p>
                }

                <LinkContainer to="/jobs/new">
                    <Button bsStyle="primary" bsSize="large"> Add Job </Button>
                </LinkContainer>
            </div>
        );
    }
}

BrowseJobs.propTypes = {
    jobs: PropTypes.array, // can be null
};
