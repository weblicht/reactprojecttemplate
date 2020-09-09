# The Main feature

This directory is the entry point for the web application. It performs
the global configuration of the application, and hosts components and
other code used across the entire application. This global setup
includes:

1. Creating and configuring the Redux store with middleware and the
   application's root reducer
2. Setting up routing, which maps URLs in the application to the
   top-level components rendered at those URLs
3. High-level page layout: the header, footer, and content area
4. Fetching metadata about the application's version from the backend

## Components defined here

- `App`: the global entry point for the application. Renders the
  container for the page and sets up the application's routing and the
  Redux store. The application is started by rendering this component
  in `../index.jsx`.
- `NavBar`: the navigation menu displayed as the header on every page
- `NavBarItem`: displays and styles a single menu item in the NavBar 
- `Footer`: the footer displayed on every page
- `Home`: the component displayed at the root URL
- `NotFound`: displays a default page at URLs not used in the
  application

 
