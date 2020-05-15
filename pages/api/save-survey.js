const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const Survey = require('../../models/survey')
const settings = require('../../data/settings')
const strategies = require('../../data/strategies')

export default async (request, response) => {
  if (request.method === 'POST') {
    const date = new Date()
    const ip = request.headers['x-forwarded-for']
    const id = `${ip}-${Date.now()}`

    const survey = {
      id,
      timestamp: date.toISOString(),
      ip,
      userAgent: request.headers['user-agent'],
      language: request.body.language
    }

    strategies.forEach(strategy => {
      survey[strategy.key] = Boolean(request.body[strategy.key])
    })

    console.log(request.body)

    if (settings.saveResponses !== false) {
      const result = new Survey(survey)
      await result.save()

      console.log(result)
    }

    response.status(200).json({ status: 'success', id })
  } else {
    response.status(404).end()
  }
}
