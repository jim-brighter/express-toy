import express, { Express } from 'express'
import PinoHttp from 'pino-http'
import logger from './log/logger'
import todoController from './controller/todoController'
import health from './controller/health'

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
app.use('/items', todoController)
app.use('/health', health)

export default app
