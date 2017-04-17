const Response = require('../models/response')
const strategies = require('../data/strategies')

module.exports = (request, reply) => {
  const date = new Date()
  const id = `${request.info.remoteAddress}-${Date.now()}`
  const body = JSON.parse(request.payload)
  const responseData = {
    id,
    timestamp: date.toISOString(),
    ip: request.info.remoteAddress,
    userAgent: request.headers['user-agent'],
    language: body.language
  }

  strategies.forEach(strategy => {
    responseData[strategy.key] = Boolean(body[strategy.key])
  })

  console.log(responseData)

  const response = new Response(responseData)

  response.save(err => {
    if (err) {
      return reply(err)
    }

    return reply({status: 'success', id})
  })
}
