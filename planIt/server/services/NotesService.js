import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class NotesService {

  async create(newNote) {
    const note = await dbContext.Notes.create(newNote)
    await note.populate('creator', 'name description')
    return note
  }

  async getById(noteId) {
    const note = await dbContext.Notes.findById(noteId).populate('creator', 'name description')
    if (!note) {
      throw new BadRequest('Invalid Note ID')
    }

    return note
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Could not remove note.')
    }
    await original.remove()
    return original
  }
}

export const notesService = new NotesService()