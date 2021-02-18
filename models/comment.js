import mongoose from 'mongoose'

//* This is the mongoose schema for comments, which is exported and 
//* used by all other schemas. 
//? It includes the user who created the comment and the timestamp 
//? for when the comment was made/updated

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

export default commentSchema
