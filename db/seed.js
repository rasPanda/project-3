import mongoose from 'mongoose'
import connectToDb from '../lib/connectToDb.js'
import User from '../models/user.js'
import Location from '../models/location.js'
import Event from '../models/event.js'
import getUserData from './data/userData.js'
import getLocationData from './data/locationData.js'
import getEventData from './data/EventData.js'


//* A function to seed our database

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('Database Connected')
    await mongoose.connection.db.dropDatabase()
    console.log('Database was dropped')
    const users = await User.create(getUserData())
    console.log(`${users.length} users created!`)
    const locationData = await getLocationData(users)
    const locations = await Location.create(locationData)
    console.log(`${locations.length} locations created!`)
    const eventData = await getEventData(users, locations)
    const events = await Event.create(eventData)
    console.log(`${events.length} events created!`)
    await mongoose.connection.close()
    console.log('Goodbye!')
  } catch (err) {
    console.log('Something went wrong with seeding!')
    console.log(err)
    await mongoose.connection.close()
    console.log('Goodbye!')
  }
}

seedDatabase()