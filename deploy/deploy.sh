#!/bin/bash

DEPLOY_SERVER=http://sdmay23-34.ece.iastate.edu/
SERVER_FOLDER="sdmay23-34"

# Building React output
cd Frontend/svarh/
npm install
npm run build

echo "Deploying to ${DEPLOY_SERVER}"
scp -r build/ root@${DEPLOY_SERVER}:/var/www/html/${SERVER_FOLDER}/

echo "Finished copying the build files"