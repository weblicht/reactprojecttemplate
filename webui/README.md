# Webui

This directory contains the frontend code for a sample web application
built with React and Redux. You can study this application to see how
to build such an application.

## Code organization

The actual frontend code is in the `src` directory. The
`node_modules` directory contains packages installed by
[NPM](https://www.npmjs.com/). These are Javascript libraries needed
for building the frontend application.

Within the `src` directory, each logical unit of the application has
its own folder. Let's call these logical units *features* in the
application.  In this sample application, the two features are:

  - `Jobs`: an example feature for creating batch processing jobs.
    Contains the code for creating new jobs, submitting them to the
    backend server for processing, and managing and displaying their
    status to the user.
  - `Main`: the global entry point for the application. Contains the
    top-level components and performs global configuration, such as
    setting up the Redux store. If you are basing a new project off
    this repository, you probably won't need to modify this code much.
    Every application will need a Main feature (or something
    equivalent).

Within these feature directories, the code is organized as follows:

  - `component.jsx`: defines the React components for the feature 
  - `actions.js`: defines Redux actions for the feature
  - `reducers.js`: defines Redux reducers for handling those actions
    and managing the feature's state
  - `selectors.js`: defines selector functions that retrieve from the
    Redux store the parts of the state needed in the feature
    
For example, the action to create a new batch processing job is in
`Jobs/actions.js`; the application's root reducer is
`Main/reducers.js`.

There are a few other important files here in the `webui` directory:

  - `package.json`: contains metadata about the application, such as
    its name and version, and the packages it depends on. NPM commands
    will expect to find this file and will sometimes modify it. You
    might also need to modify it directly sometimes.
  - `webpack.config.js`: configuration for
    [Webpack](https://webpack.js.org/), which is used to build the
    application into a single bundle that can be shipped to browsers.
    You probably won't need to modify this much.
  - `.babelrc`: configuration for [Babel](https://babeljs.io/), which
    is used to compile component defintions in JSX syntax to plain
    Javascript, prior to bundling by Webpack. You probably won't need
    to modify this much.

## Some advice for beginners

If you are using this project to learn React and Redux, here are some
recommended steps:

1. Install the appropriate frontend development tools.  These include:

   - a good text editor that understands Javascript and JSX syntax
   - the Firefox and Chrome browsers (you should test against both)
   - the React Developer Tools plugin
     ([FF](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/),
     [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi))
   - the Redux DevTools plugin
     ([FF](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/),
     [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd))
   
1. Work through the [official React tutorial](https://reactjs.org/tutorial/tutorial.html).

1. Work through the [official Redux tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts).

1. Read the documentation and components in
   [germanet-common](https://weblicht.sfs.uni-tuebingen.de/gitlab/germanet/germanet-common).

1. Read through the code in this project. Look in particular at
   comments marked `NB:` (for "Notes for beginners"). These help
   explain why the code here is written the way it is.

