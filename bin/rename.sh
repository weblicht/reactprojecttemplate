#!/bin/bash

NEWNAME=$1 # TODO: use $PWD by default?
OLDNAME="reactprojecttemplate"

# TODO: safety check: this script should ONLY be used to rename files
# from the top of a directory tree based on the reactprojecttemplate

# TODO: check quoting conventions. God help you if you try to run this
# script from a tree that has spaces in filenames.

if [[ -z $NEWNAME ]]
then
    echo "Usage: $0 newname"
    echo "This script replaces all instances of ${OLDNAME} in the project files with the new name"
    exit 1
fi


# replace the old project name inside project files
echo "Replacing all instances of $OLDNAME with $NEWNAME inside project files..."
for F in $(grep --exclude 'Makefile' --exclude '.git/*' --exclude "$0" -ir "$OLDNAME" --files-with-matches .)
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

# remove the template's git directory:
echo "Removing old .git directory"
rm -rf .git 

# create a new git directory and history:
echo "Initializing a new git repository"
git init . 


