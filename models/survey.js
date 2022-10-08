import mongoose from 'mongoose'
import strategies from '../data/strategies.js'

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
  ...strategyModels,
})

export default mongoose.models.survey || mongoose.model('survey', surveySchema)
