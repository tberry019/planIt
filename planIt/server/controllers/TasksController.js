import BaseController from "../utils/BaseController"
import { Auth0Provider } from "@bcwdev/auth0provider"
import { tasksService } from "../services/TasksService"

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getById)
      .put('/:taskId', this.edit)
      .delete('/:taskId', this.remove)
  }
  async create(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {

      const task = await tasksService.getById(req.params.projectId)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.taskId = req.params.taskId
      const updated = await tasksService.edit(req.body, req.params.taskId)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await tasksService.remove(req.params.taskId, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }

}