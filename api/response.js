const Response = require('../models/response')
const settings = require('../data/settings')
const strategies = require('../data/strategies')

function extractClientIp(request) {
  const xFF = request.headers['x-forwarded-for']
  const ip = xFF ? xFF.split(',').slice(-1)[0] : request.info.remoteAddress
  return ip
}

module.exports = (request, reply) => {
  const date = new Date()
  const ip = extractClientIp(request)
  const id = `${ip}-${Date.now()}`
  const body = JSON.parse(request.payload)
  const responseData = {
    id,
    timestamp: date.toISOString(),
    ip,
    userAgent: request.headers['user-agent'],
    language: body.language
  }

  strategies.forEach(strategy => {
    responseData[strategy.key] = Boolean(body[strategy.key])
  })

  console.log(responseData)

  if (settings.saveResponses === false) {
    return reply({status: 'success', id})
  }

  const response = new Response(responseData)

  response.save(err => {
    if (err) {
      return reply(err)
    }

    return reply({status: 'success', id})
  })
}
