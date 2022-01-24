import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { NotesSchema } from "../models/Note";
import { ProjectSchema } from "../models/Project";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Projects = mongoose.model('Project', ProjectSchema);

  Notes = mongoose.model('Notes', NotesSchema)
}

export const dbContext = new DbContext()
