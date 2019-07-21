const next = require('next')
const Hapi = require('@hapi/hapi')
const HapiBasicAuth = require('@hapi/basic')
const HapiRequireHttps = require('hapi-require-https')
const mongoose = require('mongoose')
const {nextHandlerWrapper} = require('./next-wrapper')

const settings = require('./data/settings')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
require('dotenv').config()

const app = next({dev})
const server = new Hapi.Server({
  port
})

if (settings.saveResponses !== false) {
  mongoose.connect(process.env.MONGODB_URI)
}

const responseHandler = require('./api/response')
const exportResponses = require('./api/export')

const validate = (request, username, password) => {
  const credentials = {id: 'blinktag', name: 'blinktag'}
  const isValid = username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD
  return {isValid, credentials}
}

app.prepare()
.then(async () => {
  await server.register(HapiBasicAuth)

  server.auth.strategy('simple', 'basic', {validate})

  // Uncomment to force SSL
  // if (process.env.NODE_ENV === 'production') {
  //   await server.register({
  //     plugin: HapiRequireHttps,
  //     options: {}
  //   })
  // }

  server.route({
    method: 'POST',
    path: '/api/response',
    handler: responseHandler
  })

  server.route({
    method: 'GET',
    path: '/export',
    config: {auth: 'simple'},
    handler: exportResponses
  })

  server.route({
    method: 'GET',
    path: '/{p*}', /* Catch all route */
    handler: nextHandlerWrapper(app)
  })

  try {
    await server.start()
    console.log(`> Ready on http://localhost:${port}`)
  } catch (err) {
    console.log('Error starting server')
    console.log(err)
  }
})
