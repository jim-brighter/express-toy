import express, { Express } from 'express'
import PinoHttp from 'pino-http'
import logger from './log/logger'
import hello from './controller/hello'

const app: Express = express()

/**
 * Logger Setup
 */
app.use(PinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400) {
      return 'error'
    }
    return 'info'
  }
}))

/**
 * Routes Setup
 */
app.use('/hello', hello)

export default app
