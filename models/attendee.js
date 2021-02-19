import mongoose from 'mongoose'

const attendeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

export default attendeeSchema