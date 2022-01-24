import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const NotesSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: ObjectId, required: true },
  projectId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true }
},
  {
    timestamps: true, toJSON: { virtuals: true }
  }

)

NotesSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})