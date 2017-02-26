# Design Your Transit System

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


## Local setup

### Install node.js and mongodb

On OS X, if you have brew installed:

    brew install node
    brew install mongodb

### Install dependencies

    npm install

### Create a .env file

Create a file in the project root called `.env`. Setup values for `MONGODB_URI`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`.

MONGODB_URI=mongodb://127.0.0.1:27017/yoursurveydatabase
ADMIN_USERNAME=username
ADMIN_PASSWORD=securepassword

The `ADMIN_USERNAME` and `ADMIN_PASSWORD` are used for bulk .csv export of survey responses.

### Start mongodb

    mongod

### In a new tab, run the app

    gulp develop

### Open your browser and visit:

    http://localhost:3000

## Exporting responses

While running the app, visit:

    http://localhost:3000/responses.csv

The username and password are defined in the `.env` file.
