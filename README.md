# Ebai (It's like Ebay but with an "I")

[![Build Status](https://travis-ci.org/seoulection/ebai.svg?branch=master)](https://travis-ci.org/seoulection/ebai)

## Setup
### Prerequisites
* PostgreSQL 12.1 (with server running)
* Ruby 2.6.3
* Global installation of vue-cli 4.1.2
* Global installation of npm 6.13.6

### App
After cloning the repository, go inside of the directory by running `cd ebai`:
1. From the root directory, install the front-end dependencies:
```
cd ebai-front/ && npm install
```
2. From the root directory, install the back-end dependencies:
```
cd ebai-back/ && bundle install
```
Afterwards, setup the database:
```
cd ebai-back/ && rake db:create && rake db:setup
```

## How to Run
This app is decoupled into front-end and back-end. You will need 2 separate windows to run each.
Once the dependencies are installed, start the Rails server by running (in a separate terminal):
```
cd ebai-back/ && rails s
```
Start the front-end server by running:
```
cd ebai-front/ && npm run serve
```

NOTE: the back-end server will be running on `localhost:3000` and the front-end server will be running on `localhost:8080`

## Testing
To run the tests, start at the root directory and run the following:
For the front-end:
```
cd ebai-front/ && npm run test:unit
```
For the back-end:
```
cd ebai-back/ && rspec
```
