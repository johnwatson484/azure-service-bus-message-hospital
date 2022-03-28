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
