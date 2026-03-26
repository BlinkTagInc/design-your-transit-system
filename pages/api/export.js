import mongoose from 'mongoose'
import { stringify } from 'csv-stringify/sync'

import Survey from '../../models/survey.js'
import strategies from '../../data/strategies.js'

mongoose.connect(process.env.MONGODB_URI)

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

  const csvRows = surveys.map((survey) =>
    fieldNames.reduce((row, fieldName) => {
      row[fieldName] = survey[fieldName]
      return row
    }, {}),
  )

  const csv = stringify(csvRows, {
    columns: fieldNames,
    header: true,
  })

  response.statusCode = 200
  response.setHeader('Content-Type', 'text/csv')
  response.setHeader(
    'content-disposition',
    'attachment; filename=responses.csv',
  )
  response.end(csv)
}

export default exportResponses
