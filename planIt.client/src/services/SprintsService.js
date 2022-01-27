import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async getSprintsByProject(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    logger.log('Grabbing Sprint Data', res.data)
    AppState.sprints = res.data
  }

  async createSprint(newSprint, projectId) {
    const res = await api.post('api/projects/' + projectId + '/sprints', newSprint)
    logger.log('Creating a sprint', res.data)
    AppState.sprints.unshift(res.data)
  }

  async deleteSprint(sprintId, projectId) {
    const res = await api.delete('api/projects/' + projectId + '/sprints/' + sprintId)
    logger.log('deleted sprint', res.data)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
  }

}

export const sprintsService = new SprintsService()