import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const ProjectSchema = new Schema({
  Name: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: ObjectId, ref: 'Profile', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }

)

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
