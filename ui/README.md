# iHeartMedia MusicDay UI

## Build Status

#### Dev

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiV3lGRmFWU0ZOSisvLzlmcTNSWGJJeXFCRm9VdEJJZFhVKzVLTXFOaXJNWFFiUWVBU1hxME5EQVJJZ3pCVFpSK0ZVcTZUS3I0TlNhUE9EUi8vTVUxNUhjPSIsIml2UGFyYW1ldGVyU3BlYyI6ImMyY2ttRW1nVjBmZUpiTk8iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=develop)

## Before you start

Setup Dev environment (for Mac)

1. Brew - Use homebrew to manage packages for things that are not provided by the Self Service application.
    To install homebrew, use `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Git - We use Bit Bucket to house our repositories.

    You should have been given access by your manager, if not please reach out to them. You're going to want a recent version of git, at least 2.x. Mac Osx comes with a version of git already, however getting the one from homebrew is preferred
      Use `brew update && brew install git`

    You'll also need to use the `osx-keychain` to cache your password to avoid having to type it all over and over again.
    Check to see if you have it, if not accept the Xcode licenses (use `sudo xcodebuild -license accept`) and install xcode and configure it.

    If you face an issue with the xcode installation like "Xcode can�t be installed on �Macintosh HD� because macOS version 10.12.6 or later is required." you may need to update the macOS. You are open to use your existing apple id if not create a new apple id to get xcode app from the apple store.

    * Confirm you have it or install it
    use `git credential-osxkeychain`

    * Configure it
    use `git config --global credential.helper osxkeychain`

    Finish configuring git with your username and email to keep our logs nice:
    use `git config --global user.name "Your Name"`
    use `git config --global user.email "YourName@iheartmedia.com"`

3. Install Node.js.
    The Cloud Functions and some App Engine applications are built with JavaScript however as of this writing a very old runtime is being targeted. This being the case, you should install `nvm` in order to easily manage multiple versions of Node.js. Instructions are available here:
    https://github.com/creationix/nvm

    Once you are done with nvm use `nvm install node` to install node

4. Install Yarn
    use `brew install yarn`
    use `yarn` to pull node modules based off of `package.json`.

    Yarn uses `package.json` to lock down versions more consistently
    you can explore more on this https://yarnpkg.com/en/



## Setup your local version of Music Lab

1. Open up a terminal window.
2. Clone repo from bit bucket.
3. Once you have access to the code in your local environment, go to ui and copy `.env.example` to `.env` and fill in any relevant values.
    1. Setup your local environment using `export AWS_PROFILE=ihm`
    2. Or update the `.env` file and include `AWS_PROFILE=ihm`
4. In your terminal, cd to the `/ui` directory and run `yarn install` to install front-end package dependencies.
    Optionally `npm install` to get `yarn` if you don't have it yet.
5. To run the local web application choose one of these bellow:
    1. Run `yarn start` to build and launch the web application
    2. Run `npm run server`
6. If you happen to change the environment from one to another make sure to restart your IDE restarting the server won't help.
7. If the application never runs, your `.env` file probably still needs some work. Grab a coworker and compare their setup to yours.

Note that local use of cloudsearch requires valid login to `vpn.iheartmedia.com`, then run python script at `/scripts/awslogin.py` before step 5. To have more detail about open the README file into `../scripts/`.
 * After the login you can choose the DEV project to work locally.

### Printing

Printing to PDF involves extra configuration. In particular, you must install [Docker](https://www.docker.com/get-docker) (not Docker Toolbox) and pull down the [Athena PDF](http://www.athenapdf.com/) image:

``` bash
docker pull arachnysdocker/athenapdf
```

You must also find your IP address using Windows user: `ipconfig` and Mac users: `ifconfig -a`. In the `WEB_APP_URL` key of `.env`, replace `localhost` with this address.

**For Windows,** you should also replace `CURRENT_DIRECTORY_PREFIX` with `%cd%`.

## UI Technology Stack

* Back-end
    * Node.js - build and server language
    * npm - dependency manager
    * Babel - ES6/7 compilation
    * Webpack - module builder
    * Standard - JavaScript linting
    * Mocha/Enzyme/Chai - unit testing
    * Docker - used for Athena PDF
    * Athena PDF - HTML to PDF converter
* Front-end
    * Bootstrap - mobile-first styles
    * Sass - CSS preprocessor
    * React - library for building UI
    * D3 - some SVG visualizations
    * ChartJS - main charting library
    * Jest - JavaScript testing framework
    * Yarn - dependency manager
    * ESLint - JavaScript linting


## Before you commit
