# Webui

This directory contains the frontend code for a sample web application
built with React and Redux. You can study this application to see how
to build such an application, and use it as a template for new
projects.

## Code organization

The actual frontend code is in the `src` directory. The
`node_modules` directory contains packages installed by
[NPM](https://www.npmjs.com/). These are Javascript libraries needed
for building the frontend application.

Within the `src` directory, each logical unit of the application has
its own subdirectory. Let's call these logical units *features* in the
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
  
1. Work through the [official React tutorial](https://reactjs.org/tutorial/tutorial.html).

1. Work through the [official Redux tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts).

1. Read the documentation and components in the
   [curb](https://weblicht.sfs.uni-tuebingen.de/gitlab/clarind/libraries/curb)
   library.

1. Read through the code in this project. Look in particular at
   comments marked `NB:` (for "Notes for beginners"). These help
   explain why the code here is written the way it is.

### Tools

When you are ready to begin developing this code, you should install
the appropriate frontend development tools. These include:

   - a good text editor that understands Javascript and JSX syntax
   - the Firefox and Chrome browsers (you should test against both)
   - the React Developer Tools plugin
     ([FF](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/),
     [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi))
   - the Redux DevTools plugin
     ([FF](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/),
     [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd))
     
You should also learn to use the developer tools in your browser
effectively, such as the DOM inspector and JS debugger.
     
### Documentation and learning more

Good documentation is essential for writing good code. When you have a
question, these docs should be the first places you look for the
answer:

1. [Mozilla Developer Network](https://developer.mozilla.org/en-US/) is
   the best source of documentation for all web standards.  See
   especially their core documentation on

   - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
   - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
   - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
     (especially the tutorials on [responsive
     design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
     and
     [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox),
     which are useful for understanding Bootstrap's CSS)
   
   *Tip*: to search this documentation directly with
   [DuckDuckGo](https://duckduckgo.com/), use their `!mdn` bang.

2. We use [Bootstrap](https://getbootstrap.com/docs/4.3/) as a CSS
   framework. (We do not use their Javascript components, though.)
   Essentially all styling is done in the application by adding
   Bootstrap CSS classes to components. You should become familiar
   with Bootstrap's CSS utilities. Many of the generic layout
   components in the `curb` library (e.g. `Card` or `Button`) are
   essentially wrappers that provide a nice props interface for using
   Bootstrap's CSS.
   
3. The official documentation for [React](https://reactjs.org/docs/getting-started.html)
   and [Redux](https://redux.js.org/api/api-reference) should be the
   first place you look for any information about their APIs. 

There is also a lot of other advice scattered across the web, from
StackOverflow to random blog posts. It's fine to look at these things
to get ideas, but they shouldn't be your primary resource as a
beginner &mdash; there's a lot of bad advice out there, and in the
Javascript world, even advice that was once good quickly goes out of
date.
