const Joi = require('joi')
const envs = ['development', 'test', 'production']

// Define config schema
const schema = Joi.object().keys({
  port: Joi.number().default(4011),
  env: Joi.string().valid(...envs).default(envs[0]),
  appName: Joi.string(),
  connectionString: Joi.string().required()
})

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  appName: 'Azure Service Bus Message Hospital',
  connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING
}

// Validate config
const { error, value } = schema.validate(config)

// Throw if config is invalid
if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.isDev = value.env === 'development'

module.exports = value
