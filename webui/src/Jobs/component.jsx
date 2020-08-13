import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createJob } from './actions';

class JobComp extends React.Component {
    constructor(props) {
        super(props);
    }

    renderNotFound() {
        return (
            <div>
                <h1>Job ?</h1>
                <p>Job Not Found</p>
            </div>
        );
    }

    render() {
        // get the jobId from the router or from passed props
        const id = this.props.match.params.id || this.props.jobId || {};

        if (!this.props.jobs || !id) {
            return this.renderNotFound();
        }

        const job = this.props.jobs.find(j => j.id == id);
        if (!job) {
            return this.renderNotFound();
        }

        let statusReport = "";
        if (job.status === 'done') {
            statusReport = 
            <div>
                <p className="card-text">Untokenized: {job.tokenizedText}</p>
                <span className="badge badge-pill badge-success">{job.status}</span>
            </div>
        } else {
            statusReport = 
            <div>
                <span className="badge badge-pill badge-warning">{job.status}</span>
            </div>
        }

        return (
            <div className="card">
                <div className="card-body">
                    {this.props.linkTo
                    ? <Link to={this.props.linkTo}><h5 className="card-title">Job {job.id}</h5></Link>
                    : <h5 className="card-title">Job {job.id}</h5>
                    }
                    <p className="card-text">Original text: {job.originalText}</p>
                    {statusReport}
                </div>
            </div>
        );
    }
}

JobComp.propTypes = {
    jobs: PropTypes.array,
    jobId: PropTypes.number, // optional, in case jobId is not determined by the router
    linkTo: PropTypes.string // optional
};

const jobStateToProps = (state) => ({jobs: state.jobs});

export const Job = withRouter(connect(jobStateToProps)(JobComp));


class BrowseJobsComp extends React.Component {
    constructor(props) {
        super(props);
    }

   renderJob(job) {
    return (
        <Job key={job.id} jobId={job.id} linkTo={"/jobs/" + job.id}/>
    );
    }
    renderJobList() {
        return (
            <div style={{ borderBottom: '1px solid gray', marginBottom: 20 }}>
                {this.props.jobs.map(this.renderJob)}
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3> Browse Jobs </h3>
                {this.props.jobs && this.props.jobs.length
                    ? this.renderJobList()
                    : <p>No jobs found</p>
                }

                <Link to="/jobs/new">
                    <button type="button" className="btn btn-primary">Add Job</button>
                </Link>
            </div>
        );
    }
}

const browseJobsStateToProps = (state) => ({jobs: state.jobs});

BrowseJobsComp.propTypes = {
    jobs: PropTypes.array, // can be null
};

export const BrowseJobs = connect(browseJobsStateToProps)(BrowseJobsComp);

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
        this.props.createJob(this.state.text);
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
    createJob: (text) => dispatch(createJob(text)),
});

CreateJobComp.propTypes = {
    createJob: PropTypes.func.isRequired,
};

export const CreateJob = withRouter(connect(createJobStateToProps, createJobDispatchToProps)(CreateJobComp));

