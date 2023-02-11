#!/bin/bash

DEPLOY_SERVER=sdmay23-34.ece.iastate.edu

echo "Deploying to ${DEPLOY_SERVER}"
cp -r * /home/vm-user/sd/sdmay23-34/Backend

echo "Finished copying the backend files"
