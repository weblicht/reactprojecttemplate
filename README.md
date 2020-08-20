# React Project Template

This repository contains a sample web application that can be used as
a template for new web applications developed at the SfS.

## Pre-requisites

To run the application, you must have the following locally installed:

1. npm (for frontend compilation and dependency management)
2. Java 1.8 and Maven (for backend compilation and dependency management)

You can most likely install these via a package manager for your OS,
such as [Homebrew for macOS](https://brew.sh/).

## Installation

To start a custom project based on this template:

1. Clone this repository and change its name to match your project's name

2. Open the Makefile and set the `PROJECTNAME` variable to your
   project's name

3. Run `make init` from the project's root to initialize the project
   files with your project's name

   **Warning**: the script to initialize the project directory with a
   new project name is **very destructive** (it renames files,
   modifies file contents, and deletes the .git directory, which means
   you will not be able to recover your previous state).  Do *not* run
   `make init` or `bin/rename.sh` unless you are sure you have no
   local git history that you wish to save.

4. Run `make dependencies` to install web UI dependences; a local
   `Node.js` installation is expected


## Running the application

1. Start webpack in development watch "hot" mode, which will rebuild
   the UI every time a file is saved on the disk and refresh the
   browser (if connected to the right port). This command has to run
   in a separate terminal, as it will never return by itself (needs to
   be interrupted manually): `$ make webui`. If you want to build the
   UI for production (without watch mode), run: `$ make
   webui-production`

2. Start the backend Java application, either from your favourite IDE
   or from the command line: $ make run

3. Go to http://localhost:8080/ where you should see the application's
   page. The port 8080 is the webpack "hot" mode server, which
   automatically refreshes the browser when the UI is updated on the
   disk. This server proxies the backend calls to the real backend,
   which is available at port 8088 (and can be configured in the
   reactprojecttemplate.yaml file)
