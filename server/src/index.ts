import AppEnv from './enum/appEnv'
import app from './app'

const port: number = Number.parseInt(process.env.PORT || '3000')
const env: string = process.env.APP_ENV || 'dev'

if (!Object.values<string>(AppEnv).includes(env)) {
  throw new Error('Invalid environment provided')
}

process.on('SIGINT', () => {
  process.exit(0)
})

process.on('SIGTERM', () => {
  process.exit(0)
})

/**
 * Launch App
 */
app.listen(port, () => {
  console.log(`[${new Date().toISOString()}][server] ${env} server running at http://localhost:${port}`)
})
