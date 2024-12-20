import express, { Request, Response } from 'express'
import { HEALTHY, UNHEALTHY } from '../constants/constants'
import { isDBHealthy } from '../service/healthcheckService'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const response: any = {
    dependencies: {}
  }

  const dependencies = await Promise.all([
    isDBHealthy(response.dependencies)
  ])

  const downDependencies = dependencies.filter(up => !up)

  if (downDependencies.length > 0) {
    response.app = UNHEALTHY
    res.status(500).send(response)
  } else {
    response.app = HEALTHY
    res.status(200).send(response)
  }

})

export default router
