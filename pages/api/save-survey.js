import mongoose from 'mongoose'
import Survey from '../../models/survey.js'
import strategies from '../../data/strategies.js'

const saveSurvey = async (request, response) => {
  if (request.method === 'POST') {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      const date = new Date()
      const ip = request.headers['x-forwarded-for']
      const id = `${ip}-${Date.now()}`

      const survey = {
        id,
        timestamp: date.toISOString(),
        ip,
        userAgent: request.headers['user-agent'],
        language: request.body.language,
        ...Object.fromEntries(strategies.map(strategy => [strategy.key, Boolean(request.body[strategy.key])]))
      }

      const result = new Survey(survey)
      await result.save()

      response.status(200).json({ status: 'success', id })
    } catch (error) {
      console.error(error)
      response.status(500).json({ error: 'Unable to save response' })
    }
  } else {
    response.status(404).end()
  }
}

export default saveSurvey
