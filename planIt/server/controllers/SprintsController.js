import { Auth0Provider } from "@bcwdev/auth0provider"
import { sprintsService } from "../services/SprintService"
import BaseController from "../utils/BaseController"

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('', this.getAll)    
      .get('', this.getByProjectId)
      .post('', this.create)
      .delete('/:id', this.remove)

  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.create(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
  async getByProjectId(req, res, next) {
    try {
      const sprint = await sprintsService.getByProjectId(req.params.projectId)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await sprintsService.remove(req.userInfo.id, req.params.projectId)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }


}