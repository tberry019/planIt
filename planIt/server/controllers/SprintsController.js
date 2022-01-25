import { Auth0Provider } from "@bcwdev/auth0provider"
import { sprintsService } from "../services/SprintService"
import BaseController from "../utils/BaseController"

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)

  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.create(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const sprint = await sprintsService.getById(req.params.id)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await sprintsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }


}