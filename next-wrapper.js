const nextHandlerWrapper = app => {
  const handler = app.getRequestHandler()
  return async ({raw, url}, h) => {
    await handler(raw.req, raw.res, url)
    return h.close
  }
}

module.exports = {nextHandlerWrapper}
