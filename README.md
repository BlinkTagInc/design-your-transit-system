# Design Your Transit System

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


## Description
This is a web-based survey system for collecting user preferences about improvements. It can be used to survey about any set of options, but has been tailored to be used for surveying about transportation investments and improvements.

Users are given a "budget" and asked to spend it on a set of investments and improvements. The budget provided isn't enough to cover all of the options, so users have to make choices. Users are shown the costs and benefits they have accrued as they add and remove options. In this way, the survey serves two purposes: collecting data on user preferences while at the same time educating users about the costs and benefits of investments and improvements in transit systems.

The results of the survey can be exported by an admin as a CSV file for use in comparing how different groups of transit users prioritize various improvements and investments.

An exmple

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

## Current Use
A version of this survey system has been used by over 20 transportation agencies, including Long Beach Transit, Boulder Transit, BART, Santa Monica Big Blue Bus, Lincoln Transit, Chapel Hill Transit, Foothill Transit, Ohio DOT, Salt Lake City and Fort Worth Transportation Authority and The Kauaʻi Bus.

## License
This project is licensed under GNU General Public License v3.0.
