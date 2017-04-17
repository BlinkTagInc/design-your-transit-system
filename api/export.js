const json2csv = require('json2csv')

const Response = require('../models/response')
const strategies = require('../data/strategies')

module.exports = (request, reply) => {
  Response.find((err, responses) => {
    if (err) {
      return reply(err)
    }

    const fieldNames = [
      'id',
      'timestamp',
      'ip',
      'userAgent',
      'language'
    ].concat(strategies.map(strategy => strategy.key))

    return json2csv({
      data: responses,
      fields: fieldNames
    }, (err, csv) => {
      if (err) {
        return reply(err)
      }

      return reply(csv).header('content-type', 'text/csv').header('content-disposition', 'attachment; filename=responses.csv')
    });
  });
}
