import User from '../../models/user.js'
import Location from '../../models/location.js'
import Event from '../../models/event.js'

export default async function tearDown(done) {
  await User.deleteMany()
  await Location.deleteMany()
  await Event.deleteMany()
  done()
}