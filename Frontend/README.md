# Frontend Setup
This setup assumes you have the project downloaded, and have Python and Node installed on your machine. Before beginning the Frontend Setup, make sure you have the backend running by following the steps in “Backend Setup” in Backend/README.md. The frontend will need the development server running to function properly. To make things easier, you can have one terminal running the backend, and another running the frontend.

First, change your directory to the Fronted/svarh directory in the project you cloned earlier, and install the node modules.

```
$ cd /home/user/Documents/sdmay23-34/Frontend/svarh
$ npm install
```

With the node modules installed, we can now start up the frontend. Running the following command will open a browser window with our project. 

```
$ npm run start
```

If everything is running correctly, you should be able to interact with our application and see the recommended hotels, based on generated routes, that bring the user to the requested points of interest!

# Testing the Frontend
To run the frontend test cases, you will need to change your directory to the svarh folder within the Frontend directory. After changing your directory to svarh, simply run npm test to run the Frontend tests.

```
$ cd /home/user/Documents/sdmay23-34/Frontend/svarh
$ npm test
```