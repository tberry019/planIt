import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class ProjectService {
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name description')

    return projects
  }

  async getById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name description')
    if (!project) {
      throw new BadRequest('Invalid Project ID')
    }

    return project
  }


}

export const projectService = new ProjectService()