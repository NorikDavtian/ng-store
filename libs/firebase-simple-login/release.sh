#!/bin/bash

STANDALONE_DEST="../firebase-clients/js/simple-login"
STANDALONE_STUB="firebase-simple-login"


#########################################
#  VALIDATE firebase-simple-login REPO  #
#########################################
# Ensure the checked out firebase-simple-login branch is master
CHECKED_OUT_BRANCH="$(git branch | grep "*" | awk -F ' ' '{print $2}')"
if [[ $CHECKED_OUT_BRANCH != "master" ]]; then
  echo "Error: Your firebase-simple-login repo is not on the master branch."
  exit 1
fi

# Make sure the firebase-simple-login branch does not have existing changes
if ! git --git-dir=".git" diff --quiet; then
  echo "Error: Your firebase-simple-login repo has existing changes on the master branch. Make sure you commit and push the new version before running this release script."
  exit 1
fi

####################################
#  VALIDATE firebase-clients REPO  #
####################################
# Ensure the firebase-clients repo is at the correct relative path
if [[ ! -d $STANDALONE_DEST ]]; then
  echo "Error: The firebase-clients repo needs to be a sibling of this repo."
  exit 1
fi

# Go to the firebase-clients repo
cd ../firebase-clients

# Make sure the checked-out firebase-clients branch is master
FIREBASE_CLIENTS_BRANCH="$(git branch | grep "*" | awk -F ' ' '{print $2}')"
if [[ $FIREBASE_CLIENTS_BRANCH != "master" ]]; then
  echo "Error: Your firebase-clients repo is not on the master branch."
  exit 1
fi

# Make sure the firebase-clients branch does not have existing changes
if ! git --git-dir=".git" diff --quiet; then
  echo "Error: Your firebase-clients repo has existing changes on the master branch."
  exit 1
fi

# Go back to starting directory
cd -

##############################
#  VALIDATE CLIENT VERSIONS  #
##############################
# Get the version we are releasing
PARSED_CLIENT_VERSION=$(grep "CLIENT_VERSION" firebase-simple-login-debug.js | head -1 | awk -F '"' '{print $2}')

# Ensure this is the correct version number
read -p "What version are we releasing? ($PARSED_CLIENT_VERSION) " VERSION
if [[ -z $VERSION ]]; then
  VERSION=$PARSED_CLIENT_VERSION
fi
echo

# Ensure the changelog has been updated for the newest version
CHANGELOG_VERSION="$(head -1 CHANGELOG.md | awk -F 'v' '{print $2}')"
if [[ $VERSION != $CHANGELOG_VERSION ]]; then
  echo "Error: Most recent version in changelog (${CHANGELOG_VERSION}) does not match version you are releasing (${VERSION})."
  exit 1
fi

# Ensure the version number in the package.json is correct
NPM_VERSION=$(grep "version" package.json | head -1 | awk -F '"' '{print $4}')
if [[ $VERSION != $NPM_VERSION ]]; then
  echo "Error: npm version specified in package.json (${NPM_VERSION}) does not match version you are releasing (${VERSION})."
  exit 1
fi

# Ensure the version number in the bower.json is correct
BOWER_VERSION=$(grep "version" bower.json | head -1 | awk -F '"' '{print $4}')
if [[ $VERSION != $BOWER_VERSION ]]; then
  echo "Error: Bower version specified in bower.json (${BOWER_VERSION}) does not match version you are releasing (${VERSION})."
  exit 1
fi

# Ensure there is not an existing git tag for the new version
LAST_GIT_TAG="$(git tag --list | tail -1 | awk -F 'v' '{print $2}')"
if [[ $VERSION == $LAST_GIT_TAG ]]; then
  echo "Error: git tag v${VERSION} already exists. Make sure you are not releasing an already-released version."
  exit 1
fi

# Ensure that we don't already have this as a standalone
STANDALONE_TARGET_DIR="${STANDALONE_DEST}/${VERSION}/"
if [[ -e ${STANDALONE_TARGET_DIR} ]]; then
  echo "Error: The target directory already exists: ${STANDALONE_TARGET_DIR}."
  exit 1
fi


######################
#  PUBLISH TO Bower  #
######################
# Pull any changes to the firebase-simple-login repo
git pull origin master
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git pull' from firebase-simple-login repo."
  exit 1
fi

# Create a git tag for the new version
git tag v$VERSION
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git tag' from firebase-simple-login repo."
  exit 1
fi

# Push the new git tag
git push --tags
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git push --tags' from firebase-simple-login repo."
  exit 1
fi

echo "*** Last commit tagged as v${VERSION} ***"
echo

# Changing the git tag publishes the new version to Bower automatically
echo "*** v${VERSION} published to Bower ***"
echo


#############################
#  UPDATE firebase-clients  #
#############################
# Make the target directory
mkdir $STANDALONE_TARGET_DIR
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to create standalone target directory in firebase-clients repo."
  exit 1
fi

# Copy the files to the target directory
cp $STANDALONE_STUB.js $STANDALONE_TARGET_DIR
cp $STANDALONE_STUB-debug.js $STANDALONE_TARGET_DIR

echo "*** Client (debug and non-debug) files copied ***"
echo

# Overwrite the existing changelog
cp CHANGELOG.md $STANDALONE_DEST/changelog.txt

echo "*** Changelog copied ***"
echo

# Go to the firebase-clients repo
cd ${STANDALONE_DEST}/

# Pull any changes to the firebase-clients repo
git pull origin master
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git pull' from firebase-clients repo."
  exit 1
fi

# Add the new files to the firebase-clients repo
git add .
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git add' from firebase-clients repo."
  exit 1
fi

# Commit to the firebase-clients repo
git commit -am "[firebase-release] Updated Simple Login JavaScript client to $VERSION"
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git commit' from firebase-clients repo."
  exit 1
fi

# Push the new files to the firebase-clients repo
git push origin master
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to do 'git push' to firebase-clients repo."
  exit 1
fi
echo

echo "*** Changes pushed to firebase-clients repo ***"
echo

# Go back to starting directory
cd -


##################
#  MANUAL TASKS  #
##################
echo
echo "Manual steps remaining:"
echo "  1) Deploy firebase-clients to CDN via Jenkins"
echo "  2) Update the release notes for version ${VERSION} on GitHub"
echo "  3) Update all Simple Login web client version numbers specified in firebase-website to ${VERSION}"
echo "  4) Tweet @FirebaseRelease: 'v${VERSION} of @Firebase Simple Login web client is available https://cdn.firebase.com/js/simple-login/$VERSION/firebase-simple-login.js Changelog: https://cdn.firebase.com/js/simple-login/changelog.txt'"
echo
echo "Done! Woo!"
echo