import Event from '../models/event.js'

function notFound(res) {
  return res.status(404).send({ message: 'Event not found' })
}

async function addAttendee(req, res, next) {
  const eventId = req.params.id
  const data = req.body
  data.user = req.currentUser
  try {
    if (!req.currentUser) {
      return res.status(401).send({ message: 'Not logged in' })
    }
    const event = await Event.findById(eventId)
    if (!event) {
      notFound(res)
    }
    for (let i = 0; i < event.attendees.length; i++) {
      if (String((event.attendees)[i].user) === String(req.currentUser._id)) {
        return res.status(403).send({ message: 'Duplicate record' })
      }
    }
    event.attendees.push(data)
    const updatedEvent = await event.save()
    res.status(201).send(updatedEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteAttendee(req, res, next) {
  const attendeeId = req.currentUser._id
  const eventId = req.params.id

  try {
    const event = await Event.findById(eventId).populate('attendee.user')

    if (!event) {
      notFound(res)
    }
    const attendee = event.attendees.find(attendee => String(attendee.user) === String(attendeeId))
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