[![Build Status](https://dev.azure.com/johnwatson484/John%20D%20Watson/_apis/build/status/johnwatson484.azure-service-bus-message-hospital?branchName=main)](https://dev.azure.com/johnwatson484/John%20D%20Watson/_build/latest?definitionId=62&branchName=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=johnwatson484_azure-service-bus-message-hospital&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=johnwatson484_azure-service-bus-message-hospital)
[![Known Vulnerabilities](https://snyk.io/test/github/johnwatson484/azure-service-bus-message-hospital/badge.svg)](https://snyk.io/test/github/johnwatson484/azure-service-bus-message-hospital)

# azure-service-bus-message-hospital
Message hospital for dead letter messages

## Prerequisites
Node v16+

Or:  

Docker

## Running the client
### From source
- Clone the repo and run `npm install` to install required npm packages
- Update the preferred port in the `config.js` file.  By default this is set to **4011**.
- Run `npm start` to start the application.

The application can be run in a container if preferred by running the `scripts/start` script.

### Docker
`docker run -p 4011:4011 johnwatson484/azure-service-bus-message-hospital`
