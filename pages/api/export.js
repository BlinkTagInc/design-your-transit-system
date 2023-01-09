import mongoose from 'mongoose'
import { parse } from 'json2csv'

import Survey from '../../models/survey.js'
import strategies from '../../data/strategies.js'

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const exportResponses = async (request, response) => {
  const surveys = await Survey.find()

  const fieldNames = [
    'id',
    'timestamp',
    'ip',
    'userAgent',
    'language',
    ...strategies.map((strategy) => strategy.key),
  ]

  const csv = parse(surveys, { fields: fieldNames })

  response.statusCode = 200
  response.setHeader('Content-Type', 'text/csv')
  response.setHeader(
    'content-disposition',
    'attachment; filename=responses.csv'
  )
  response.end(csv)
}

export default exportResponses
