const settings = require('./settings');

module.exports = app => {
  // Catch 404 errors
  app.use((req, res) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.status(404);
    if (req.xhr) {
      res.send({
        message: err.message,
        error: {}
      });
    } else {
      res.render('error', {
        message: err.message,
        description: 'Page not found',
        error: {},
        language: 'en',
        settings
      });
    }
  });

  // Catch 401 Unauthorized errors
  app.use((err, req, res, next) => {
    if (err.status !== 401) {
      return next(err);
    }

    res.status(401);
    if (req.xhr) {
      res.send({
        message: err.message,
        error: err
      });
    } else {
      res.render('error', {
        message: err.message,
        description: 'You need to log in to see this page.',
        error: err,
        language: 'en',
        settings
      });
    }
  });

  // Log all other errors
  app.use((err, req, res, next) => {
    console.error(err.stack || err);
    next(err);
  });

  // Development 500 error handler
  // Will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(500);
      if (req.xhr) {
        res.send({
          message: err.message,
          error: err
        });
      } else {
        res.render('error', {
          message: err.message,
          error: err,
          language: 'en',
          settings
        });
      }
    });
  }

  // Production error handler
  // No stacktraces leaked to user
  app.use((err, req, res) => {
    res.status(500);
    if (req.xhr) {
      res.send({
        message: err.message,
        error: {}
      });
    } else {
      res.render('error', {
        message: err.message,
        description: 'Server error',
        error: {},
        language: 'en',
        settings
      });
    }
  });
};
