import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class NotesService {

  async create(newNote) {
    const note = await dbContext.Notes.create(newNote)
    await note.populate('creator', 'name picture')
    return note
  }

  async getById(projectId) {
    const note = await dbContext.Notes.find({ projectId: projectId }).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Note ID')
    }

    return note
  }

  async remove(notesId, userId) {
    const original = await dbContext.Notes.findById(notesId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove note.')
    }
    await original.remove()
    return original
  }
}

export const notesService = new NotesService()