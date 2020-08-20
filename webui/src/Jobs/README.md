# Jobs feature

This directory contains a sample `Jobs` feature for the application.
This feature allows you to create batch processing jobs that will
tokenize a simple text input.

Data flows through the feature in a standard way:

1. The user creates a job by submitting a form with some text to
   be processed.
2. The `runJob` action dispatches Redux actions which create the state
   for the new job in the Redux store, submit the job to the server,
   and update the job state with the results when the server responds.
3. The state of all jobs is managed via Redux. The `jobs` reducer
   handles the different actions dispatched within `runJob` to update
   this state.
4. Different parts of this state can be retrieved via selector
   functions like `selectJob`. Components get access to this state via
   react-redux's `connect` function. Whenever the Redux state changes,
   these components re-render, updating the user interface.
   
## Components defined here

The main components defined and exported here are:

- `BrowseJobs`: displays a page with a list showing the current state of all jobs
- `JobDetail`: displays a page with details about the state of one job
- `CreateJob`: displays a page with the form to create a new job

These components are rendered at particular URLs from the main app
component via react-router.

In addition, there are several lower-level helper components:

- `JobAsCard`: displays the state for a single job as a Bootstrap
  "card"
- `TokensAsList`: when a job completes, the server returns an array of
  tokens from the original text; this component displays that array as
  an HTML list
- `CreateJobForm`: displays the HTML form for creating a job and
  dispatches the `runJob` action when this form is submitted

