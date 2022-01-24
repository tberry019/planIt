import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const TasksSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  projectId: { type: ObjectId, required: true },
  sprintId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true },
  isComplete: { type: Boolean, required: true }
},
  {
    timestamps: true, toJSON: { virtuals: true }
  }

)

TasksSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})