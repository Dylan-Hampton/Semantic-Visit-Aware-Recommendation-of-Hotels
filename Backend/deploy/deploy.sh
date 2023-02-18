#!/bin/bash

DEPLOY_SERVER=sdmay23-34.ece.iastate.edu

echo "Deploying to ${DEPLOY_SERVER}"
cp -r * /var/www/flask-app/
echo "Finished copying the backend files"

echo "Restarting apache"
sudo systemctl reload apache2
echo "Finished restarting apache"
