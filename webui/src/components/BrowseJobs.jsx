import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Panel, Table, Button, Glyphicon, Modal, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';

import { toPairs } from '../utils/utils';
import * as actions from '../actions/actions';


export class BrowseJobs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchJobs();
    }

    removeSelectedJobs() {
        let selectedJobs = this.refs.table.state.selectedRowKeys;
        let jobIDs = [];
        if (this.props.jobs) {
            this.props.jobs.map((job) => {
                if (selectedJobs.indexOf(job.ID)>-1) {
                    jobIDs.push(job.ID);
                }
            });
        }
        this.props.actions.removeJobs(jobIDs);
    }

    render() {
        const options = {
            defaultSortName: 'created', // default sort column name
            defaultSortOrder: 'desc',  // default sort order
            expandBy: 'row'
        };
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToExpand: true
        };

        let activeJobs = 0;;
        let inactiveJobs = 0;;
        let failedJobs = 0;;

        if (this.props.jobs) {
            return (
                <div>
                    <h3>Browse Jobs</h3>
                    <Panel>
                        <Col sm={8}>
                            Out of {this.props.jobs.length} jobs <span>{activeJobs} are active</span>, <span>{inactiveJobs} are finished successfully</span>,  <span>{failedJobs} failed</span>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={this.removeSelectedJobs.bind(this)} className="btn pull-right"><Glyphicon glyph="trash"/> Remove selected jobs</Button>
                        </Col>
                    </Panel>
                    <div>
                        Body
                    </div>
                </div>
            );
        } else {
            return (
                <div><h4>No jobs found</h4></div>
            )
        }
    }
}

BrowseJobs.propTypes = {
    jobs: PropTypes.array, // can be null
    fetchJobs: PropTypes.func.isRequired,
};
