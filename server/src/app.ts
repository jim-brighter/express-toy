import express, { Express } from 'express'
import PinoHttp from 'pino-http'
import logger from './log/logger'
import hello from './controller/hello'
import todoController from './controller/todoController'

const app: Express = express()

/**
 * Middleware Setup
 */
app.use(express.json())

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
app.use('/items', todoController)

export default app
