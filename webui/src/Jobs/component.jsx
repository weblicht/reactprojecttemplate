import { runJob } from './actions';
import { selectJob, selectAllJobs, nextJobId } from './selectors';

import { Button, Card, List, ListItem, Form, TextInput, SubmitButton } from '@sfstuebingen/germanet-common/components';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

// NB: the components in this file exhibit a style that will serve you
// well: they are all simple, reusable function components. They do
// not need to keep their own state; instead, all the state in the
// application is managed via Redux. I recommend you stick to this
// style as much as possible, because it makes frontend development
// easier, more flexible, and faster. Also, notice that the
// germanet-common library provides a lot of low-level components
// which help simplify the code here (e.g. Card and TextInput). I
// recommend familiarizing yourself with the components in that
// library before you build your own.

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
            <Card title="Job not found" level={3}>
              There is no job with ID {props.match.params.id}
            </Card>
        );
    }

    return (
        <Card title="Job details" level={3}>
          <JobAsCard data={props.data} />
          <Link to="/jobs">Back to jobs list</Link>
        </Card>
    );
}

// NB: this is the mapStateToProps function for the JobDetail
// component; notice that it is passed to connect() below. Since we
// declare multiple mapStateToProps functions in this file, they have
// different names, but they are all named like:
//   stateTo<Component>Props
// where <Component> is the name of the component passed to connect().
//
// When this function is called, state contains the Redux store state,
// and ownProps contains the props given to the component where it was
// instantiated. In this case, ownProps is important because it
// contains the id forwarded to the component from the URL by
// react-router. For more see:
// https://react-redux.js.org/using-react-redux/connect-mapstate
function stateToJobDetailProps(state, ownProps) {
    const id = ownProps.match.params.id;
    return {
        data: selectJob(state, id)
    };
}

// NB: the react-router withRouter() function, like react-redux's
// connect(), wraps the component with another that passes routing
// information down as props.  For more see:
// https://reactrouter.com/web/api/withRouter
JobDetail = withRouter(connect(stateToJobDetailProps)(JobDetail));
export { JobDetail };

// Top level component for /jobs
// Displays a title, the list of jobs, and a button to add a new job.
function BrowseJobs(props) {
        return (
            <Card title="Browse Jobs" level={3}>
              <p>
                <Link to="/jobs/new">Click here to create a new job.</Link>
              </p>

              {props.jobs && props.jobs.length
               ? props.jobs.map(job => <JobAsCard key={job.id} data={job} />)
               : <p>No current jobs.</p>
              }
            </Card>
        );
}

function stateToBrowseJobsProps(state) {
    return {
        jobs: selectAllJobs(state)
    };
}

BrowseJobs = connect(stateToBrowseJobsProps)(BrowseJobs);
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

// NB: this is the mapDispatchToProps function for CreateJob.
// mapDispatchToProps functions are named like:
//   dispatchTo<Component>Props
// for the same reason that mapStateToProps functions have different names.
// See comment above.
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
