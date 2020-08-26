const mongoose = require('mongoose')
const Survey = require('../../models/survey')
const strategies = require('../../data/strategies')

export default async (request, response) => {
  if (request.method === 'POST') {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

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

      const result = new Survey(survey)
      await result.save()

      console.log(result)

      response.status(200).json({ status: 'success', id })
    } catch(error) {
      console.error(error);
      response.status(500).json({ error: 'Unable to save response' })
    }
  } else {
    response.status(404).end()
  }
}
