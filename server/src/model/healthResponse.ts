import { HEALTHY } from "../constants/constants"

export type Dependencies = {
  database?: string
}

export default class HealthResponse {
  dependencies: Dependencies
  app: string

  constructor () {
    this.app = HEALTHY
    this.dependencies = {}
  }
}
