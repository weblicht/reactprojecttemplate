# Jobs app

The `Jobs/` directory contains a simple sample application.  This
application allows you to create batch processing jobs that will
tokenize a simple text input. 

You can study this application to see how to build an app with React
and Redux.

## Code organization

Data flows through the application in a standard way: the user creates
a job by submitting a form with some text to process; after the server
finishes processing the text, the results are stored in the Redux
store. The state of all jobs is managed via Redux; access to this
state, and the ability to dispatch actions to the store, is provided
by react-redux's `connect` function.

The code is organized as follows:

  - `actions.js`: defines Redux actions for creating and managing jobs
  - `reducers.js`: defines Redux reducers for creating and managing jobs
  - `selectors.js`: defines selector functions that retrieve
    job-related state from the Redux store
  - `component.jsx`: defines the React components which create jobs
  and display information about the current jobs 
  


## Some advice for beginners

If you are using this project to learn React and Redux, here are some
recommended steps:

1. Work through the [official React tutorial](https://reactjs.org/tutorial/tutorial.html).

1. Work through the [official Redux tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts).

1. Read the documentation and components in [germanet-common](https://weblicht.sfs.uni-tuebingen.de/gitlab/germanet/germanet-common).

1. Read through the code in this project. Look in particular at
   comments marked `NB:` (for "Notes for beginners"). These help
   explain why the code here is written the way it is.
   
  
   

