# Jobs feature

This directory contains a sample `Jobs` feature for the application.
This feature allows you to create batch processing jobs that will
tokenize a simple text input.

Data flows through the feature in a standard way:

1. The user creates a job by filling out a form with some text to
   be processed and clicking its submit button.
1. When the form is submitted, the `submitJob` callback function in
   the `CreateJobForm` component is called with the form's data.
   (Gathering the form's data from the DOM into the `formData` object
   passed to `submitJob` is handled by the `Form` component.) This
   callback dispatches the `runJob` action.
1. The `runJob` action is responsible for managing the whole
   request-response cycle that corresponds to running one job. It
   dispatches Redux actions which create the state for the new job in
   the Redux store, it submits the job to the server, and it
   dispatches actions to update the job state with the results after
   the server responds.
1. The state of all jobs is managed via Redux. The `jobs` reducer
   handles the different actions dispatched within `runJob` to update
   this state. This includes creating a new part of the state when a
   new job is submitted, recording the results when the job finishes,
   and recording an error message if something goes wrong.
1. Various components (e.g. `BrowseJobs`, `JobDetail`) get access to
   this state via react-redux's `connect` function. Whenever the Redux
   state changes, these components re-render, updating the user
   interface. Each of these components has a mapStateToProps function
   called `stateTo[Component]Props`. These mapStateToProps functions
   in turn call various *selector* functions to retrieve the piece(s)
   of state which they inject into the component's props.
   
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

