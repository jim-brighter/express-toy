import AppEnv from './enum/appEnv'
import app from './app'
import logger from './log/logger'

const SHUTDOWN_SIGS = ['SIGINT', 'SIGTERM']

SHUTDOWN_SIGS.forEach(sig => process.on(sig, () => {
  console.log(sig)
  process.exit(0)
}))

const port: number = Number.parseInt(process.env.PORT || '3000')
const env: string = process.env.APP_ENV || 'dev'

if (!Object.values<string>(AppEnv).includes(env)) {
  throw new Error('Invalid environment provided')
}

/**
 * Launch App
 */
app.listen(port, () => {
  logger.info(`${env} server running at http://localhost:${port}`)
})
