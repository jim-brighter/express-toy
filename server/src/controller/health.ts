import express, { Request, Response } from 'express'
import { HEALTHY } from '../constants/constants'
import healthCheckService from '../service/healthcheckService'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const healthStatus = await healthCheckService.checkAllDependencies()
  if (healthStatus.app === HEALTHY) {
    res.status(200).send(healthStatus)
  } else {
    res.status(503).send(healthStatus)
  }
})

export default router
