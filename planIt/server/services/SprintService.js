import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class SprintsService {

  async create(newSprint) {
    const sprint = await dbContext.Sprints.create(newSprint)
    await sprint.populate('creator', 'name description')
    return sprint
  }

  async getById(sprintId) {
    const sprint = await dbContext.Sprints.findById(sprintId).populate('creator', 'name description')
    if (!sprint) {
      throw new BadRequest('Invalid Sprint ID')
    }

    return sprint
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove sprint.')
    }
    await original.remove()
    return original
  }
}

export const sprintsService = new SprintsService()