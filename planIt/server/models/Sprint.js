import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: String, required: true },
  creatorId: { type: ObjectId, ref: 'Profile', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }

)

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
