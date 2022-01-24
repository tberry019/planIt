import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TasksService {

  async create(newTask) {
    const task = await dbContext.Tasks.create(newTask)
    await task.populate('creator', 'name description')
    return task
  }

  async getById(taskId) {
    const task = await dbContext.Tasks.findById(taskId).populate('creator', 'name description')
    if (!task) {
      throw new BadRequest('Invalid Task ID')
    }

    return task
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove sprint.')
    }
    await original.remove()
    return original
  }

  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creator.id.toString() !== update.creatorId)
      throw new BadRequest('Can not edit this post')
    original.task = update.task || original.task
    await original.save()
    return original


  }
}


export const tasksService = new TasksService()