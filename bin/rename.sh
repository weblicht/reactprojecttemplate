#!/bin/bash

NEWNAME=$1 # TODO: use $PWD by default?
OLDNAME="reactprojecttemplate"

# TODO: check quoting conventions. God help you if you try to run this
# script from a tree that has spaces in filenames.

if [[ -z $NEWNAME ]]
then
    echo "Usage: $0 newname"
    echo "This script replaces all instances of ${OLDNAME} in the project files with the new name"
    exit 1
fi

# safety check
read -p "WARNING: this will erase the git history and change files in ${PWD}. Are you sure? " -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# replace the old project name inside project files
echo "Replacing all instances of $OLDNAME with $NEWNAME inside project files..."
for F in $(grep --exclude 'Makefile' --exclude '.git*' --exclude "$0" -ir "$OLDNAME" --files-with-matches .)
do         
    echo "in: $F"
    sed -e "s/$OLDNAME/$NEWNAME/g" -i'~~' "$F" 
done && find . -name '*~~' -delete # delete sed's backup files if loop completes successfully
echo "Replacements inside project files completed"

# rename the files themselves
echo "Renaming project files..."
for F in $(find . -iname "*$OLDNAME*")
do
    NEWF=$(echo $F | sed -e "s/$OLDNAME/$NEWNAME/") 
    echo "Moving $F to $NEWF"
    mv "$F" "$NEWF"
done
echo "Renaming project files completed"

# replace the template's git directory:
if [[ "${NEWNAME}" == "${OLDNAME}" ]]
then
    echo "Project name has not changed; will not modify .git directory"
else
    echo "Removing old .git directory"
    rm -rf .git 

    echo "Initializing a new git repository"
    git init .
fi


