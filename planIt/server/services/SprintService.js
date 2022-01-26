import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class SprintsService {

  async create(newSprint) {
    const sprint = await dbContext.Sprints.create(newSprint)
    await sprint.populate('creator', 'name description')
    return sprint
  }

  async getByProjectId(projectId) {
    const sprint = await dbContext.Sprints.find({ projectId: projectId }).populate('creator', 'name description')
    if (!sprint) {
      throw new BadRequest('Invalid Sprint ID')
    }

    return sprint
  }

  async remove(userId, sprintId) {
    const original = await dbContext.Sprints.findById(sprintId)

    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove sprint.')
    }
    await original.remove()
    return original
  }
}

export const sprintsService = new SprintsService()