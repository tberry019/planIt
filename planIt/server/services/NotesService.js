import { dbContext } from "../db/DbContext";


class NotesService {

  async getById(taskId) {
    const notes = await dbContext.Notes.find(query).populate('creator',)
  }
}