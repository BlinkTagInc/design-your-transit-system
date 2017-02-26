const mongoose = require('mongoose');
const _ = require('lodash');
const strategies = require('../libs/strategies');

const strategyModels = strategies.reduce((memo, strategy) => {
  memo[strategy.key] = Boolean;
  return memo;
}, {});

const Response = mongoose.model('response', new mongoose.Schema(_.extend({
  id: String,
  timestamp: String,
  ip: String,
  userAgent: String,
  language: String
}, strategyModels)));

module.exports = Response;
