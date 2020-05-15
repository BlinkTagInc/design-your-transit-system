const mongoose = require('mongoose')
const strategies = require('../data/strategies')

const strategyModels = strategies.reduce((memo, strategy) => {
  memo[strategy.key] = Boolean
  return memo
}, {})

const surveySchema = new mongoose.Schema({
  id: String,
  timestamp: String,
  ip: String,
  userAgent: String,
  language: String,
  ...strategyModels
})

module.exports = mongoose.models.survey || mongoose.model('survey', surveySchema)
