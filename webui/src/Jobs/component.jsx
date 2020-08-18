import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { runJob } from './actions';
import { selectJob, selectAllJobs, nextJobId } from './selectors';

import { Button, Card, List, ListItem, Form, TextInput, SubmitButton } from '@sfstuebingen/germanet-common/components';
import classNames from 'classnames';

// Displays a card with information about a single job.
// props:
//   data: Object representing a job
function JobAsCard(props) {
    const statusBadge = props.data.tokens
          ? <span className="badge badge-success">Completed</span>
          : (props.data.error
             ? <span className="badge badge-danger">Error</span>
             : <span className="badge badge-warning">Processing...</span>);

    const titleLink = <Link to={"/jobs/" + props.data.id}>Job {props.data.id}</Link>;
         
    return (
        <Card title={titleLink} level={5}>
          {statusBadge}
          <h6>Original text</h6>
          <p>{props.data.originalText}</p>

          {props.data.tokens &&
           <>
             <h6>Tokens</h6>
             <TokensAsList data={props.data.tokens} />
           </>
          }

          {props.data.error &&
           <>
             <h6>Error details</h6>
             <p>{props.data.error}</p>
           </>
          }
        </Card>
    );
}

// Displays tokens (i.e., the results of a job) as a list.
// The list is displayed horizontally on screens size medium and up.
// props:
//   data: Array of tokens
function TokensAsList(props) {
    if (!props.data && props.data.length) return null;

    return (
        <List ordered={true} extras='list-group-horizontal-md'>
          {props.data.map(token => <ListItem key={token} data={token} />)}
        </List>
    );
    
}

// Top level component for /jobs/<id>
// Displays the details about job <id>, or an error message if there is no such job.
function JobDetail(props) {

    if (!props.data) {
        return (
            <Card title="Job not found" level={5}>
              There is no job with ID {props.match.params.id}
            </Card>
        );
    }

    return (
        <JobAsCard data={props.data} />
    );
}

function jobDetailStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    return {
        data: selectJob(state, id)
    };
}

JobDetail = withRouter(connect(jobDetailStateToProps)(JobDetail));
export { JobDetail };

// Top level component for /jobs
// Displays a title, the list of jobs, and a button to add a new job.
function BrowseJobs(props) {
        return (
            <Card title="Browse Jobs" level={3}>

              {props.jobs && props.jobs.length
               ? props.jobs.map(job => <JobAsCard key={job.id} data={job} />)
               : <p>No jobs found</p>
              }

              <Link to="/jobs/new">
                <Button extras="btn-primary">Add Job</Button>
              </Link>
            </Card>
        );
}

function browseJobsStateToProps(state) {
    return {
        jobs: selectAllJobs(state)
    };
}

BrowseJobs = connect(browseJobsStateToProps)(BrowseJobs);
export { BrowseJobs };

// Top level component for /jobs/new
// Displays the form to create a new job, including the text to be tokenized and
// a suggested job ID.
function CreateJobForm(props) {

    const history = useHistory();
    function submitJob(formData) {
        props.runJob(formData);

        // redirect to job detail page:
        history.push(`/jobs/${formData.jobId}`);
    }

    return (
        <Form submitTo={submitJob}>
          <TextInput name="jobId" label="Job ID"
                     value={props.suggestedId}
                     required={true}
                     readOnly={true}
                     asGroup={true} />
          <TextInput name="text" label="Text to tokenize"
                     required={true}
                     asGroup={true} />
          <SubmitButton text="Create job" extras="btn-primary" />
        </Form>
    );
}

function stateToCreateJobProps(state) {
    return {
        suggestedId: nextJobId(state)
    };
}

function dispatchToCreateJobProps(dispatch) {
    return {
        runJob: text => dispatch(runJob(text))
    };
}

CreateJobForm = connect(stateToCreateJobProps, dispatchToCreateJobProps)(CreateJobForm);

export function CreateJob(props) {
    return (
        <Card title="Create job" level={3}>
          <CreateJobForm />
        </Card>
    );
}
