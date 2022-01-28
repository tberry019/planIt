import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getAll(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks/')
    logger.log('getting tasks', res.data)
    AppState.tasks = res.data
  }

  async createTask(newTask, projectId) {
    const res = await api.post('api/projects/' + projectId + '/tasks/', newTask)
    logger.log('creating task', res.data)
    AppState.tasks.push(res.data)

  }

  async deleteTask(projectId, taskId) {
    await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }

  async editTask(task) {
    // FIXME write put request
    // no need to update appstate 
  }

  async moveTask(task, newSprintId) {
    // FIXME send put to server with {sprintId: newSprintId}
    // AppState.tasks.filter(t=> t.id !== task.id)
    // AppState.tasks.push(res.data)
  }
}

export const tasksService = new TasksService()