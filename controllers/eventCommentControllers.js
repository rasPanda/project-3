import Event from '../models/event.js'

function unauthorised(res) {
  return res.status(401).send({ message: 'Unauthorised' })
}

function notFound(res) {
  return res.status(404).send({ message: 'Event not found' })
}

async function createEventComment(req, res, next) {
  const commentData = req.body
  commentData.user = req.currentUser
  const eventId = req.params.eventId
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      notFound(res)
    }
    event.comments.push(commentData)
    const updatedEvent = await event.save()
    res.status(201).send(updatedEvent)
  } catch (err) {
    next(err)
  }
}

async function updateEventComment(req, res, next) {
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId, eventId } = req.params
  try {
    const event = await Event.findById(eventId).populate('user').populate('comments.user')
    if (!event) {
      notFound(res)
    }
    const comment = event.comments.id(commentId)
    if (!currentUser.isAdmin && !comment.user.equals(currentUser._id)) {
      unauthorised(res)
    }
    comment.set(commentData)
    const updatedEvent = await event.save()
    res.status(200).send(updatedEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteEventComment(req, res, next) {
  const currentUser = req.currentUser
  const { commentId, eventId } = req.params
  try {
    const event = await Event.findById(eventId).populate('user').populate('comments.user')
    if (!event) {
      notFound(res)
    }
    const comment = event.comments.id(commentId)
    if (!currentUser.isAdmin && !comment.user.equals(currentUser._id)) {
      unauthorised(res)
    }
    await comment.remove()
    const updatedEvent = await event.save()
    res.status(202).send(updatedEvent)
  } catch (err) {
    next(err)
  }
}

export default {
  createEventComment,
  updateEventComment,
  deleteEventComment
}