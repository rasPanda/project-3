import Event from '../models/event.js'

async function getEvents(_req, res, next) {
  try {
    const eventsList = await Event.find().populate('user').populate('comments.user').populate('location').populate('attendees.user')
    res.status(200).send(eventsList)
  } catch (err) {
    next(err)
  }
}

async function postEvent(req, res, next) {
  const body = req.body
  body.user = req.currentUser
  console.log(req.currentUser)
  try {
    if (!req.currentUser) {
      return res.status(401).send({ message: 'Unauthorised' })
    }
    const newEvent = await Event.create(body)
    res.status(201).send(newEvent)
  } catch (err) {
    next(err)
  }
}

export default {
  getEvents,
  postEvent
}