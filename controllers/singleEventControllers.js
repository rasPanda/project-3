import Event from '../models/event.js'

async function getSingleEvent(req, res, next) {
  const id = req.params.id
  try {
    const event = await Event.findById(id).populate('user').populate('comments.user')
    res.send(event)
  } catch (err) {
    next(err)
  }
}

async function updateSingleEvent(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser
  const body = req.body
  try {
    const eventToUpdate = await Event.findById(id)
    if (!eventToUpdate) {
      return res.send({ message: 'No event found' })
    }
    if (!currentUser.isAdmin && !eventToUpdate.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    eventToUpdate.set(body)
    eventToUpdate.save()
    res.send(eventToUpdate)
  } catch (err) {
    next()
  }
}

async function deleteSingleEvent(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser
  try {
    const eventToDelete = await Event.findById(id).populate('user').populate('comments.user')
    if (!currentUser.isAdmin && !currentUser._id.equals(eventToDelete.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await eventToDelete.deleteOne()
    res.send(eventToDelete)
  } catch (err) {
    next(err)
  }
}

export default {
  getSingleEvent,
  updateSingleEvent,
  deleteSingleEvent
}