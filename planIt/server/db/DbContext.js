import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { NotesSchema } from "../models/Note";
import { ProjectSchema } from "../models/Project";
import { SprintSchema } from "../models/Sprint";
import { TasksSchema } from "../models/Task";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Projects = mongoose.model('Project', ProjectSchema);

  Notes = mongoose.model('Notes', NotesSchema);

  Sprints = mongoose.model('Sprint', SprintSchema);

  Tasks = mongoose.model('Task', TasksSchema)
}

export const dbContext = new DbContext()
