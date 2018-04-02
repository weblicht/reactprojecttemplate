import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Row, Col, Grid, Panel, Table, Button, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import moment from 'moment';

import { toPairs } from '../utils/utils';
import * as actions from '../actions/actions';


export class CreateJob extends React.Component {
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
        browserHistory.push('/jobs');
    }

    render() {
        return (
            <div>
                <h3> Create Job </h3>

                <form>
                    <FormGroup bsSize="large">
                        <ControlLabel> Insert text here </ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon> Text </InputGroup.Addon>
                            <FormControl type="text" placeholder="Enter text"
                                value={this.state.text}
                                onChange={this.onInputText} />
                        </InputGroup>
                    </FormGroup>

                    <Button bsStyle="primary" onClick={this.onCreateJob}> Submit </Button>
                </form>
            </div>
        );
    }
}

CreateJob.propTypes = {
    createJob: PropTypes.func.isRequired,
};
