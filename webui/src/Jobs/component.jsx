import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { runJob } from './actions';
import { selectJob, selectAllJobs } from './selectors';

import { Button, Card, List, ListItem } from '@sfstuebingen/germanet-common/components';
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

         
    return (
        <Card title={"Job " + props.data.id} level={5}>
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
            <>
              <h3>Browse Jobs</h3>

              {props.jobs && props.jobs.length
               ? props.jobs.map(job => <JobAsCard key={job.id} data={job} />)
               : <p>No jobs found</p>
              }

              <Card>
                <Link to="/jobs/new">
                  <button type="button" className="btn btn-primary">Add Job</button>
                </Link>
              </Card>
            </>
        );
}

function browseJobsStateToProps(state) {
    return {
        jobs: selectAllJobs(state)
    };
}

BrowseJobs = connect(browseJobsStateToProps)(BrowseJobs);
export { BrowseJobs };

class CreateJobComp extends React.Component {
    constructor(props) {
        super(props);
        this.onInputText = this.onInputText.bind(this);
        this.onCreateJob = this.onCreateJob.bind(this);
        this.state = {
            text: ''
        };
    }

    onInputText(e) {
        this.setState({ text: e.target.value });
    }

    onCreateJob(e) {
        e.preventDefault();
        this.props.runJob(this.state.text);
        // send the user to the BrowseJobs page
        // using the history object from react-router-dom
        this.props.history.push('/jobs');
    }

    render() {
        return (
            <div>
                <h3> Create Job </h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputText">Insert text here</label>

                        <div className="input-group  mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend">Tokenized Text</span>
                            </div>

                            <input type="text" className="form-control" id="inputText"  aria-describedby="inputGroupPrepend"
                                placeholder="Enter text"
                                value={this.state.text} onChange={this.onInputText} />
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={this.onCreateJob}> Submit </button>
                </form>
            </div>
        );
    }
}

const createJobStateToProps = (state) => ({ jobs: state.jobs });

const createJobDispatchToProps = (dispatch) => ({
    runJob: (text) => dispatch(runJob(text)),
});

CreateJobComp.propTypes = {
    runJob: PropTypes.func.isRequired,
};

export const CreateJob = withRouter(connect(createJobStateToProps, createJobDispatchToProps)(CreateJobComp));

