# Backend Setup
This setup assumes you have the project downloaded already. Setting up the backend will include installing Python 3.7 and creating a virtual environment that will contain all the needed dependencies.

First, change to the directory where you want your virtual environment to be stored. In my case, it will be in the Documents/environments directory for my user.

```console
$ cd /home/user/Documents/environments
```

Next, install virtualenv which is used to create a virtual environment.

```console
$ pip3 install virtualenv
```

Then you will install Python 3.7. You will need to enter ‘y’ and hit Enter at times to continue the installation. (Note: the project does seem to work fine with newer Python versions, but to create the environment we are running on our VM, do the following)

```console
$ sudo apt update
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt install python3.7
```

With Python 3.7 and virtualenv installed, we can create a virtual environment that will be using Python 3.7. The following will create a virtual environment called python37.

```console
$ python3 -m virtualenv --python=”/usr/bin/python3.7” python37
```

Now we can activate the virtual environment to use it, and verify that the Python version is 3.7.x. 

```console
$ source python37/bin/activate
(python37) $ python3 --version
```

Once completed, you will see the virtual environment name in your console. This virtual environment will allow us to install all the needed packages for the project in an isolated manner, which we will do now.

Change your directory to the Backend folder of the project you cloned earlier.

```console
(python37) $ cd /home/user/Documents/sdmay23-34/Backend
```

Install all the needed requirements with pip3.

```console
(python37) $ pip3 install -r requirements.txt
```

If you run into errors with the gdal, rtree, or another package, try the following commands and then rerun the previous command.

```console
(python37) $ sudo apt install libspatialindex-dev
(python37) $ sudo apt install libpython3.7-dev
```

Once all the packages have been installed correctly, you are ready to start up the backend! The following command will start a development server that can be accessed at http://localhost:5000 and will be used later when running the frontend.

```console
(python37) $ python3 app.py
```

You should see text like * Running on http://127.0.0.1:5000 in your console if things are working correctly. You may see warnings, but those can be ignored as they are telling you that what is being run is a development server, which is fine for demos. Congratulations, you have the backend running!

If you want to deactivate your virtual environment, you can run the following command.

```console
(python37) $ deactivate
```

# Testing the Project
To run the backend test cases, you will need to change your directory to the Backend folder of the cloned project, activate your virtual environment, and then run a command to start the tests.

```console
$ cd /home/user/Documents/sdmay23-34/Backend
$ source /home/user/Documents/environments/python37/bin/activate
(python37) $ python3 -m pytest -W ignore::DeprecationWarning
```

You should see that 22 test cases passed.