#!/bin/bash


echo "Installing dependencies"
pip install flask gunicorn

# echo "Deploying to ${DEPLOY_SERVER}"
# # Copy the backend files to the Backend/ directory on the server
# cp -r * /home/vm-user/sd/sdmay23-34/Backend

# echo "Finished copying the backend files"

echo "Starting flask app"
export FLASK_APP=app.py
gunicorn -b 127.0.0.1:80 myproject:app
