import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class ProjectsService {

  async create(newProject) {
    const project = await dbContext.Projects.create(newProject)
    await project.populate('creator', 'name description')
    return project
  }
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name description')

    return projects
  }
  async getById(projectId) {
    const project = await dbContext.Projects.findById(projectId).populate('creator', 'name description')
    if (!project) {
      throw new BadRequest('Invalid Project ID')
    }

    return project
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove project.')
    }
    await original.remove()
    return original
  }
}

export const projectsService = new ProjectsService()