import { health } from '../db/db'
import { HEALTHY, UNHEALTHY } from '../constants/constants'
import logger from '../log/logger'

export const isDBHealthy = async (dependencies: any): Promise<boolean> => {
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
