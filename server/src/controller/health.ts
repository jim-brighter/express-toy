import express, { Request, Response } from 'express'
import { HEALTHY } from '../constants/constants'
import healthCheckService from '../service/healthcheckService'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const healthStatus = await healthCheckService.checkAllDependencies()
  const statusCode = healthStatus.app === HEALTHY ? 200 : 503

  res.status(statusCode).send(healthStatus)
})

export default router
