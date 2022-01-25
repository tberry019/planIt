import { Auth0Provider } from "@bcwdev/auth0provider"
import { notesService } from "../services/NotesService"
import BaseController from "../utils/BaseController"

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('/:id', this.getById)
      .delete('/:id', this.remove)
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await notesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}