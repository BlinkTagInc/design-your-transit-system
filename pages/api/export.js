import mongoose from 'mongoose'
import auth from 'basic-auth'
import compare from 'tsscmp'
import { parse } from 'json2csv'

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

import Survey from '../../models/survey'
import strategies from '../../data/strategies'

function check(name, pass) {
  let valid = true

  // Check to make sure a username and password is set
  valid = process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && valid

  // Simple method to prevent short-circuit and use timing-safe compare
  valid = compare(name, process.env.ADMIN_USERNAME) && valid
  valid = compare(pass, process.env.ADMIN_PASSWORD) && valid

  return valid
}

const exportResponses = async (request, response) => {
  // Check for auth
  const credentials = auth(request)

  if (!credentials || !check(credentials.name, credentials.pass)) {
    response.statusCode = 401
    response.setHeader('WWW-Authenticate', 'Basic realm="dyts"')
    return response.end('Access denied')
  }

  const surveys = await Survey.find()

  const fieldNames = [
    'id',
    'timestamp',
    'ip',
    'userAgent',
    'language'
  ].concat(strategies.map(strategy => strategy.key))

  const csv = parse(surveys, { fields: fieldNames })

  response.statusCode = 200
  response.setHeader('Content-Type', 'text/csv')
  response.setHeader('content-disposition', 'attachment; filename=responses.csv')
  response.end(csv)
}

export default exportResponses
