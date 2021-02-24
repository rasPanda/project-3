import mongoose from 'mongoose'
import commentSchema from './comment.js'
import attendeeSchema from './attendee.js'

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (name) => typeof name === 'string' && name.length > 0
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Location',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false
  },
  image: {
    type: String,
    required: true,
    validate: (image) => typeof image === 'string' && image.length > 0 && image.includes('https:' || 'http:')
  },
  time: {
    type: String,
    required: true,
    validate: (name) => typeof name === 'string' && name.length > 0
  },
  details: {
    type: String,
    required: false,
    validate: (name) => typeof name === 'string' && name.length > 0
  },
  results: {
    type: [Object],
    required: false,
    validate: (types) => Array.isArray(types) && types.every(e => typeof e === 'object')
  },
  attendees: [attendeeSchema],
  comments: [commentSchema]
}, {
  timestamps: true
})

export default mongoose.model('Event', eventSchema)