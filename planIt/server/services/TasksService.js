import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TasksService {

  async create(newTask) {
    const task = await dbContext.Tasks.create(newTask)
    await task.populate('creator', 'name description')
    return task
  }

  async getById(projectId) {
    const task = await dbContext.Tasks.find({ projectId: projectId }).populate('creator', 'name description')
    if (!task) {
      throw new BadRequest('Invalid Task ID')
    }

    return task
  }

  async edit(edited, taskId) {
    const original = await dbContext.Tasks.findById(taskId)
    if (original.creatorId.toString() !== edited.creatorId) {
      throw new BadRequest('Cannot edit this post')
    }
    original.name = edited.name || original.name
    original.weight = edited.weight || original.weight
    original.sprintId = edited.sprintId || original.sprintId
    original.isComplete = edited.isComplete || original.isComplete

    await original.save()
    return original
  }


  async remove(taskId, userId) {
    const original = await dbContext.Tasks.findById(taskId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove tasks.')
    }
    await original.remove()
    return original
  }
}


export const tasksService = new TasksService()