#!/bin/bash

DEPLOY_SERVER=sdmay23-34.ece.iastate.edu
SERVER_FOLDER="sdmay23-34"

# Building React output
npm install
npm run build

echo "Deploying to ${DEPLOY_SERVER}"
cp -r build/ /var/www/html/${SERVER_FOLDER}/

echo "Finished copying the build files"