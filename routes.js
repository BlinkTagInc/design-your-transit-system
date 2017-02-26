const _ = require('lodash');
const auth = require('http-auth');
const json2csv = require('json2csv');
const router = require('express').Router();
const utils = require('./libs/utils');
const strategies = require('./libs/strategies');
const settings = require('./libs/settings');

const Response = require('./models/response');

const formattedStrategies = strategies.map(utils.formatStrategy);

router.get('/', (req, res) => {
  res.render('index', {
    strategies: formattedStrategies,
    language: 'en',
    settings
  });
});

router.get('/es', (req, res) => {
  res.render('index', {
    strategies: formattedStrategies,
    language: 'es',
    settings
  });
});

router.post('/api/response', (req, res, next) => {
  const date = new Date();
  const id = `${req.connection.remoteAddress}-${Date.now()}`;

  const responseData = {
    id,
    timestamp: date.toISOString(),
    ip: req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    language: req.body.language
  };

  strategies.forEach(strategy => {
    responseData[strategy.key] = req.body[strategy.key];
  });

  console.log(responseData);

  const response = new Response(responseData);

  response.save(err => {
    if (err) {
      return next(err);
    }

    return res.json({status: 'success', id});
  });
});

const basic = auth.basic({realm: 'Admin'}, (username, password, cb) => {
  cb(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD);
});

router.get('/responses.csv', auth.connect(basic), (req, res, next) => {
  Response.find((err, responses) => {
    if (err) {
      return next(err);
    }

    const fieldNames = [
      'id',
      'timestamp',
      'ip',
      'userAgent',
      'language'
    ].concat(_.map(strategies, 'key'));

    return json2csv({
      data: responses,
      fields: fieldNames
    }, (err, csv) => {
      if (err) {
        return next(err);
      }

      res.header('content-type', 'text/csv');
      res.header('content-disposition', 'attachment; filename=responses.csv');
      res.write(csv);
      return res.end();
    });
  });
});

module.exports = router;
