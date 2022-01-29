import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class NotesService {
  async getNotesByProject(projectId) {
    const res = await api.get('/api/projects/' + projectId + '/notes')
    logger.log('grabbing notes', res.data)
    AppState.notes = res.data
  }

  async createNote(newNote, projectId) {
    const res = await api.post('api/projects/' + projectId + '/notes', newNote)
    logger.log('creating a note bih', res.data)
    AppState.notes.unshift(res.data)
  }

  async deleteNote(note) {
    const res = await api.delete(`api/projects/${note.projectId}/notes/${note.id}`)
    logger.log('deleting note', res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== note.id)
  }
}

export const notesService = new NotesService()