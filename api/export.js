const json2csv = require('json2csv')

const Response = require('../models/response')
const strategies = require('../data/strategies')

module.exports = async (request, h) => {
  const responses = await Response.find()

  const fieldNames = [
    'id',
    'timestamp',
    'ip',
    'userAgent',
    'language'
  ].concat(strategies.map(strategy => strategy.key))

  const csv = await json2csv({
    data: responses,
    fields: fieldNames
  })

  const response = h.response(csv)

  response.header('content-type', 'text/csv')
  response.header('content-disposition', 'attachment; filename=responses.csv')

  return response
}
