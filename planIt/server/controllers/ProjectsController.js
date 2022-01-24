
import { Auth0Provider } from "@bcwdev/auth0provider"
import { Error } from "mongoose"
import { projectService } from "../services/ProjectService"
import BaseController from "../utils/BaseController"

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotesByProjectId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectService.getAll(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  NOTE write notes service
  async getNotesByProjectId(req, res, next) {
    try {
      const notes = await notesService.getNotesByProjectId(req.params.id)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectService.getById(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
}