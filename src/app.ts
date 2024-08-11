import express, { Express } from 'express'
import hello from './controller/hello'

const app: Express = express()

/**
 * Routes
 */
app.use('/hello', hello)

export default app
