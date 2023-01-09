# Design Your Transit System

## Description

This is a web-based survey system for collecting user preferences about improvements. It can be used to survey about any set of options, but has been tailored to be used for surveying about transportation investments and improvements.

Users are given a "budget" and asked to spend it on a set of investments and improvements. The budget provided isn't enough to cover all of the options, so users have to make choices. Users are shown the costs and benefits they have accrued as they add and remove options. In this way, the survey serves two purposes: collecting data on user preferences while at the same time educating users about the costs and benefits of investments and improvements in transit systems.

The results of the survey can be exported by an admin as a CSV file for use in comparing how different groups of transit users prioritize various improvements and investments.

The system supports multiple languages, see the `data/settings.js` and `data/strategies.js` for an example of how to set up more than one language.

An example can be seen at https://design-your-transit-system.blinktag.com/

## Local setup

### Install node.js and mongodb

On OS X, if you have [brew](https://brew.sh/) installed:

    brew install node
    brew install yarn
    brew install mongodb

### Install dependencies

    yarn

### Create a .env file

Create a file in the project root called `.env`. Setup values for `MONGODB_URI` and `BASIC_AUTH_CREDENTIALS`.

    MONGODB_URI=mongodb://127.0.0.1:27017/yoursurveydatabase
    BASIC_AUTH_CREDENTIALS=username:password

The `BASIC_AUTH_CREDENTIALS` are used for bulk .csv export of survey responses.

### Start mongodb

    mongod

### In a new tab, run the app

    yarn dev

### Open your browser and visit:

    http://localhost:3000

## Exporting responses

While running the app, visit:

    http://localhost:3000/api/export

The username and password are defined in the `.env` file in the root of the project.

## Current Use

A version of this survey system has been used by over 30 transportation agencies, including Long Beach Transit, Boulder Transit, BART, Santa Monica Big Blue Bus, Lincoln Transit, Chapel Hill Transit, Foothill Transit, Ohio DOT, Salt Lake City and Fort Worth Transportation Authority and The Kauaʻi Bus.

## Lints

    npx next lint

## License

This project is licensed under GNU General Public License v3.0.
