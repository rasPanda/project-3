import Event from '../models/event.js'

async function getEvents(_req, res, next) {
  try {
    const eventsList = await Event.find().populate('user').populate('comments.user')
    res.status(200).send(eventsList)
  } catch (err) {
    next(err)
  }
}

async function postEvent(req, res, next) {
  const body = req.body
  body.user = req.currentUser
  try {
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