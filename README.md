React Project Template
======================

## Installation

To start a custom project based on this template:

1. clone this repository and change its name to match your project's name

2. remove the .git folder inside it and run `git init` to declare a new git project

3. find all file/folders named reactprojecttemplate and rename them accordingly:
   $ find . -inanme '*reactprojecttemplate*'

4. find all strings in the project containing reactprojecttemplate and rename them accordingly:
   $ grep -ir 'reactprojecttemplate' .

5. install web UI dependencies:
   $ make dependencies


## Development

To build and start developing the application:

1. start webpack in development watch mode, which will rebuild the UI every time a file is saved on the disk. This command have to run in a separate terminal, as it will never return by itself (needs to be interrupted manually):
   $ make webui
If you want to build the UI for production (without watch mode), run:
   $ make webui-production

2. start the backend java application, either from your favourite IDE or from the command line:
   $ make run

3. go to http://localhost:8080/ where you should see the application's page. The port number can be changed, if necessary, from the reactprojecttemplate.yaml file
