import mongoose from 'mongoose'
import commentSchema from './comment.js'

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (name) => typeof name === 'string' && name.length > 0
  },
  location: {
    type: String,
    required: true,
    validate: (name) => typeof name === 'string' && name.length > 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
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
  attendees: {
    type: [Object],
    required: false,
    validate: (types) => Array.isArray(types) && types.length > 0 && types.every(e => typeof e === 'object')
  },
  results: {
    type: [Object],
    required: false,
    validate: (types) => Array.isArray(types) && types.length > 0 && types.every(e => typeof e === 'object')
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

export default mongoose.model('Event', eventSchema)