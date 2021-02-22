import mongoose from 'mongoose'

const attendeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

export default attendeeSchema