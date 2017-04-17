const mongoose = require('mongoose')
const strategies = require('../data/strategies')

const strategyModels = strategies.reduce((memo, strategy) => {
  memo[strategy.key] = Boolean
  return memo
}, {})

const Response = mongoose.model('response', new mongoose.Schema(Object.assign({
  id: String,
  timestamp: String,
  ip: String,
  userAgent: String,
  language: String
}, strategyModels)))

module.exports = Response
