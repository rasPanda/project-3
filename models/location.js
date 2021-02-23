import mongoose from 'mongoose'
import commentSchema from './comment.js'

const locationSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    validate: (name) => typeof name === 'string' && name.length > 0
  },
  image: { 
    type: String, 
    required: true,
    validate: (image) => typeof image === 'string' && image.length > 0 && image.includes('https:' || 'http:')
  },
  location: {
    lat: { 
      type: Number,
      required: true,
      validate: (lat) => typeof lat === 'number' && (lat >= -90) && (lat <= 90)
    },
    long: {
      type: Number,
      required: true,
      validate: (long) => typeof long === 'number' && (long >= -180) && (long <= 180)
    }
  },
  address: { 
    type: String,
    required: false,
    validate: (name) => typeof name === 'string' && name.length > 0 
  },
  facilities: {
    numberOfTables: { 
      type: Number,
      required: true,
      validate: (numberOfTables) => typeof numberOfTables === 'number' && numberOfTables > 0 
    },
    description: { 
      type: String, 
      required: false,
      validate: (name) => typeof name === 'string' && name.length > 0 
    }
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: false }]
})

export default mongoose.model('Location', locationSchema)


