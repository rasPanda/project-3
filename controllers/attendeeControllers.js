import Event from '../models/event.js'

function notFound(res) {
  return res.status(404).send({ message: 'Event not found' })
}

async function addAttendee(req, res, next) {
  const attendee = req.currentUser
  const eventId = req.params.id
  try {
    if (!req.currentUser) {
      return res.status(401).send({ message: 'Unauthorised' })
    }
    const event = await Event.findById(eventId)
    if (!event) {
      notFound(res)
    }
    event.attendees.push(attendee)
    const updatedEvent = await event.save()
    res.status(201).send(updatedEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteAttendee(req, res, next) {
  const attendeeId = req.currentUser.id
  const eventId = req.params.id
  try {
    const event = await Event.findById(eventId).populate('user')
    console.log(event)
    if (!event) {
      notFound(res)
    }
    const attendee = event.attendees.id(attendeeId)
    await attendee.remove()
    const updatedEvent = await event.save()
    res.status(202).send(updatedEvent)
  } catch (err) {
    next(err)
  }
}

export default {
  addAttendee,
  deleteAttendee
}