import mongoose from "mongoose"

const Schema = mongoose.Schema

const tacoSchema = new Schema (
  {
    name: String,
    tasty: Boolean,
    owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
  }
)

const Taco = mongoose.model("Taco", tacoSchema)

export {
  Taco
}