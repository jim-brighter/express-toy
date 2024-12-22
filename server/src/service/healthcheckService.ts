import { health } from '../db/db'
import { HEALTHY, UNHEALTHY } from '../constants/constants'
import logger from '../log/logger'
import HealthResponse, { Dependencies } from '../model/healthResponse'

export const isDBHealthy = async (dependencies: Dependencies): Promise<boolean> => {
  try {
    await health()
    dependencies.database = HEALTHY
    return true
  } catch (error) {
    logger.error(error, 'Database unhealthy')
    dependencies.database = UNHEALTHY
    return false
  }
}

const checkAllDependencies = async (): Promise<HealthResponse> => {
  const response: HealthResponse = new HealthResponse()

  const downDependencies = (await Promise.all([
    isDBHealthy(response.dependencies)
  ])).filter(up => !up)

  response.app = downDependencies.length > 0 ? UNHEALTHY : HEALTHY

  return response
}

export default {
  checkAllDependencies
}
