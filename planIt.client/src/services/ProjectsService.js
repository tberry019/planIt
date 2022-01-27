import { AppState }  from "../AppState";
import { logger }  from "../utils/Logger";
import { api }  from "./AxiosService";



class ProjectsService {
  async getAllProjects(query = '') {
    const res = await api.get('api/projects' + query)
      logger.log('Grabbing Project Data', res.data)
      AppState.projects = res.data
  }

  async createProject(newProject){
    const res =  await api.post('api/projects', newProject)
    logger.log('Creating a project', res.data)
    AppState.projects.unshift(res.data)
    // TODO send to server
    // push to projects collection in appstate
    // router.push( to projects page with param of res.data.id )
  }

  async deleteProject(projectId){
    const res = await api.delete('api/projects/' + projectId)
    logger.log('deleting project by id', res.data)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
    
    // TODO send to server
    // filter from AppState.projects
    // router push to projects page
  }

  async getByProjectId (projectId) {
    const res = await api.get('api/projects/' + projectId)
    logger.log('grabbing project by id', res.data)
    AppState.activeProject = (res.data) 
  }

}

export const projectsService = new ProjectsService